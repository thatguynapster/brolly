import React, { useContext, useEffect, FC } from "react";
import AuthContext from "../../context/auth-context";

const DocumentPreview: FC<{ documents: string[] }> = ({ documents }) => {
  return (
    <>
      {documents.length > 0 ? (
        documents.map((_doc, i) => {
          return (
            <div className="w-full flex flex-col items-center" key={i}>
              <img src="/img/document.svg" alt="Document Preview" className="w-1/3" />
              <p className="font-semibold text-sm">{_doc}</p>
            </div>
          );
        })
      ) : (
        <div className="w-full flex flex-col items-center">
          <img src="/img/forbidden.svg" alt="Document Preview" className="w-1/3" />
          <p className="font-semibold text-sm">No documents to show</p>
        </div>
      )}
    </>
  );
};

export default DocumentPreview;
