import React, { useContext, useEffect, FC } from "react";
import AuthContext from "../../context/auth-context";

const DocumentPreview: FC<{ documents: string[] | null }> = ({ documents }) => {
  return (
    <>
      {documents ? (
        documents.map((_doc, i) => {
          console.log(_doc);
          return (
            <a
              className="w-full flex flex-col items-center"
              key={i}
              href={`${process.env.NEXT_PUBLIC_INSURANCE_DOCS_STORAGE_LINK}${_doc}`}
              download={true}
            >
              <img src="/img/document.svg" alt="Document Preview" className="w-1/3" />
              <p className="w-full font-semibold text-sm truncate">{_doc}</p>
            </a>
          );
        })
      ) : (
        <div className="w-full flex flex-col items-center">
          <img src="/img/forbidden.svg" alt="Document Preview" className="w-1/3" />
          <p className="font-semibold text-base">No documents to show</p>
        </div>
      )}
    </>
  );
};

export default DocumentPreview;
