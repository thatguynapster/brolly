import React, { useContext, useEffect, FC } from "react";
import AuthContext from "../../context/auth-context";

const DocumentPreview: FC<{
  documents: { name: string; type: string }[] | null;
}> = ({ documents }) => {
  let grid_length: number | undefined = 4;
  if (documents && documents.length < 4) {
    grid_length = documents?.length;
  }

  return (
    <div className={`grid grid-cols-${grid_length} gap-2`}>
      {documents ? (
        documents.map((_doc, i) => {
          return (
            <a
              key={i}
              className="px-2 flex flex-col items-center justify-center"
              href={`${process.env.NEXT_PUBLIC_INSURANCE_DOCS_STORAGE_LINK}${_doc.name}`}
              download={true}
            >
              <img
                src="/img/document.svg"
                alt="Document Preview"
                className="w-1/2"
              />
              <p className="w-full text-center font-semibold text-sm line-clamp-2">
                {_doc.type.replaceAll("_", " ")}
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
