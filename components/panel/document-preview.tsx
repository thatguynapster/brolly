import { TrashIcon } from "@heroicons/react/outline";
import React, { FC } from "react";

const DocumentPreview: FC<{
  document: string | null;
  onDelete: () => void;
  onView: (doc: string, type: "image" | "document") => void;
}> = ({ document, onView, onDelete }) => {
  let img_types = ["jpg", "jpeg", "png", "gif", "webp"];
  let doc_type: "image" | "document" = "image";
  if (!img_types.includes(String(document?.split(".")[1]))) {
    doc_type = "document";
  }

  return (
    <div className={`w-full`}>
      {document ? (
        <a className="flex flex-col w-full">
          <img
            src="/img/document.svg"
            alt="Document Preview"
            className="w-1/3"
            onClick={() => {
              onView(document, doc_type);
            }}
          />
          <div className="flex flex-row items-center space-x-4">
            <p className="text-dark font-semibold truncate text-sm">
              {document}
            </p>
            <button
              className="delete focus:outline-none text-danger-main hover:bg-gray-200 p-1 rounded-md"
              onClick={(ev) => {
                ev.preventDefault();
                // remove this image
                onDelete();
              }}
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </a>
      ) : (
        <div className="w-full flex flex-col items-center">
          <img
            src="/img/forbidden.svg"
            alt="Document Preview"
            className="w-1/3"
          />
          <p className="font-semibold text-base">No documents to show</p>
        </div>
      )}
    </div>
  );
};

export default DocumentPreview;
