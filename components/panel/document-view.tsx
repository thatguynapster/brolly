import React, { useContext, useEffect, FC } from "react";
import AuthContext from "../../context/auth-context";
import { Modal } from "../modal";

const DocumentView: FC<{
  document: string | undefined;
  show: boolean;
  type: "image" | "document" | undefined;
  onClose: () => void;
}> = ({ document, type, show, onClose }) => {
  console.log(document, type);
  return (
    <Modal
      show={show}
      widthClass={`${type === "image" ? "max-w-xl" : "max-w-4xl"}`}
      onClose={() => {
        onClose();
      }}
    >
      <style global jsx>
        {`
          /* iframe itself */
          .iframe-container > .iframe {
            display: block;
            width: 100%;
            height: 90vh;
            border: none;
            justify-content: center;
            align-items: center;
          }
          .iframe-container {
            width: "100% !important";
          }
        `}
      </style>

      <div className="iframe-container">
        {type === "image" && <img src={document} className="w-full" />}
        {type === "document" && (
          <iframe
            // rel="prefetch"
            id="iF"
            title="Main"
            src={`${document}#view=fitH`}
            className="iframe"
            onLoad={() => {}}
            height="100%"
            width="100%"
            // async
          ></iframe>
        )}
      </div>
    </Modal>
  );
};

export default DocumentView;
