import React, { useContext, useEffect, FC } from "react";
import AuthContext from "../../context/auth-context";

const DocumentPreview: FC<{ document: string | null }> = ({ document }) => {
  return (
    <>
      {document? (
            <a
              className="w-full px-2 flex flex-col items-center justify-center"
              href={`${process.env.NEXT_PUBLIC_INSURANCE_DOCS_STORAGE_LINK}${document}`}
              download={true}
            >
              <img src="/img/document.svg" alt="Document Preview" className="w-1/2" />
              <p className="w-full font-semibold text-sm line-clamp-2">{document}</p>
            </a>
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
