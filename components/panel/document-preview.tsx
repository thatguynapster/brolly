import React, { useContext, useEffect, FC } from "react";
import AuthContext from "../../context/auth-context";

const DocumentPreview: FC<{
  documents: { name?: string; type?: string }[] | null;
  onView?: (doc: string, type: "image" | "document" | undefined) => void;
}> = ({ documents, onView }) => {
  let grid_length: number | undefined = 0;
  if (documents && documents.length <= 4) {
    grid_length = documents?.length;
  }

  if (documents && documents.length > 4) {
    grid_length = 4;
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-${grid_length} gap-4`}>
      {documents ? (
        documents.map((_doc, i) => {
          console.log(_doc);
          let doc_type: "image" | "document" = "image";
          if (_doc?.name?.split(".")[1] == "pdf") {
            doc_type = "document";
          }
          return (
            <a
              key={i}
              // target="_blank"
              className="px-2 flex flex-col items-center"
              // href={`${process.env.NEXT_PUBLIC_INSURANCE_DOCS_STORAGE_LINK}${_doc.name}`}
              // download={true}
              onClick={() => {
                onView &&
                  onView(
                    `${process.env.NEXT_PUBLIC_INSURANCE_DOCS_STORAGE_LINK}${_doc.name}`,
                    doc_type
                  );
              }}
            >
              <img
                src="/img/document.svg"
                alt="Document Preview"
                className="w-1/2"
              />
              <p className="w-full text-center font-semibold text-sm">
                {_doc?.type?.replaceAll("_", " ")}
              </p>
            </a>
          );
        })
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
