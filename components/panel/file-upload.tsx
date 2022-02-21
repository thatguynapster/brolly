import React, { useContext, useEffect, useState } from "react";
import { FC } from "react";
import { Transition } from "@headlessui/react";
import AuthContext from "../../context/auth-context";
import { toast } from "react-toastify";
import { PhotographIcon, TrashIcon } from "@heroicons/react/outline";

const FileUpload: FC<{
  allowSelect: boolean;
  multiple: boolean;
  onFileLoad: (images: string | ArrayBuffer | null) => void;
  defaultImage?: any;
  type?: string;
}> = ({ allowSelect, multiple, onFileLoad, defaultImage, type }) => {
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [imagePreviews, setImagePreviews] = useState<
    { file: any; name: string; size: string }[]
  >([]);

  let imageInput: HTMLInputElement | null = null;
  const fileSize = 10485760;

  useEffect(() => {
    if (defaultImage) {
      setImagePreviews([
        {
          file: null,
          name: defaultImage["docURL"],
          size: "",
        },
      ]);
    }
  }, [defaultImage]);

  function onImageUpload(e: any) {
    const files: any = Array.from(e.target.files);
    // console.log(files);
    if (files.length === 0) {
      return;
    }

    if (files[0].size <= fileSize) {
      let reader = new FileReader();
      reader.onloadend = () => {
        // console.log("image laoded");
        // console.log(reader.result);
        setImageUrl(reader.result);
        let temp_previews: any = [];

        let file_size =
          files[0].size > 1024
            ? files[0].size > 1048576
              ? `${Math.round(files[0].size / 1048576)}mb`
              : `${Math.round(files[0].size / 1024)}kb`
            : `${files[0].size}b`;

        if (multiple) {
          temp_previews = [...imagePreviews];
          temp_previews.push({
            file: reader.result,
            name: files[0].name,
            size: file_size,
          });
          setImagePreviews(temp_previews.reverse());
        } else {
          temp_previews.push({
            file: reader.result,
            name: files[0].name,
            size: file_size,
          });
          setImagePreviews(temp_previews.reverse());
        }
        onFileLoad(temp_previews);
      };

      reader.readAsDataURL(files[0]);
    } else {
      toast.error("File size must not exceed 10mb");
    }
  }

  // TODO: complete this
  let fileType = "";
  switch (type) {
    case "image":
      fileType = "image/x-png,image/jpeg";
      break;
    case "document":
      fileType = "";
      break;
  }

  return (
    <div className=" w-full">
      {/* <!-- file upload --> */}
      <article
        aria-label="File Upload"
        className="relative h-full flex flex-col"
      >
        {/* <!-- scroll area --> */}
        <section className="overflow-auto w-full flex flex-col space-y-8">
          {allowSelect && (
            <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
              {/* <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
              <span>Select a </span>&nbsp;<span>file anywhere or</span>
            </p> */}
              {/* <input id="hidden-input" type="file" multiple className="hidden" /> */}
              <input
                type="file"
                id="agentImageFile"
                style={{ display: "none" }}
                accept={fileType}
                ref={(input) => {
                  imageInput = input;
                }}
                onChange={onImageUpload}
                className="hidden"
              />
              <button
                id="button"
                className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                onClick={(e) => {
                  e.preventDefault();
                  imageInput && (imageInput.value = ""); //reset so same image can be picked - no valid justification for this, but it seems useful
                  imageInput?.click();
                }}
              >
                Select a file
              </button>
            </header>
          )}

          <ul id="gallery" className="flex flex-1 flex-wrap">
            {imagePreviews.length > 0 ? (
              imagePreviews.map((_img, i, imagePreviews) => {
                return (
                  <li
                    className={`block p-1 ${
                      multiple ? "w-1/2" : "w-full"
                    } group`}
                    key={i}
                  >
                    <article
                      tabIndex={0}
                      className="hasImage w-full h-full rounded-md focus:outline-none focus:shadow-outline cursor-pointer relative text-transparent hover:text-white"
                    >
                      <a
                        key={i}
                        className="p-2 flex flex-col"
                        onClick={() => {
                          // onView &&
                          //   onView(
                          //     `${process.env.NEXT_PUBLIC_INSURANCE_DOCS_STORAGE_LINK}${_doc.name}`,
                          //     doc_type
                          //   );
                        }}
                      >
                        <img
                          src="/img/document.svg"
                          alt="Document Preview"
                          className="w-1/3"
                        />
                        <div className="flex flex-row items-center space-x-4">
                          <p className="text-dark font-semibold text-sm">
                            {_img.name}
                          </p>
                          <button
                            className="delete focus:outline-none text-danger-main hover:bg-gray-200 p-1 rounded-md"
                            onClick={(ev) => {
                              ev.preventDefault();
                              // remove this image
                              let temp_previews = [...imagePreviews];
                              temp_previews.splice(i, 1);
                              setImagePreviews(temp_previews);
                              onFileLoad(null);
                            }}
                          >
                            <TrashIcon className="w-5 h-5 " />
                          </button>
                        </div>
                      </a>
                    </article>
                  </li>
                );
              })
            ) : (
              <li
                id="empty"
                className="h-full w-full text-center flex flex-col items-center justify-center"
              >
                <img
                  className="mx-auto w-32"
                  src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                  alt="no data"
                />
                <span className="text-small text-gray-500">
                  No files selected
                </span>
              </li>
            )}
          </ul>
        </section>
      </article>
    </div>
  );
};

export default FileUpload;
