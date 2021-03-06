import { Fragment } from "react";
import { createPortal } from "react-dom";

import "./modal.styles.scss";

interface IModal {
  isShowing: boolean;
  message: string;
  hide: () => void;
}

export const Modal = ({ isShowing, message, hide }: IModal) =>
  isShowing
    ? createPortal(
        <Fragment>
          <div
            className={`modal-content ${isShowing ? "show" : "hide"}`}
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
            onClick={hide}
          >
            <div className="modal-body">{message}</div>
          </div>
        </Fragment>,
        document.body
      )
    : null;
