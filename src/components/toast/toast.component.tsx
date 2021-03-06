import { Fragment } from "react";
import { createPortal } from "react-dom";

import "./toast.styles.scss";

interface IModal {
  isShowing: boolean;
  message: string;
  severity: number;
  hide: () => void;
}

export const Toast = ({ isShowing, message, severity, hide }: IModal) =>
  isShowing
    ? createPortal(
        <Fragment>
          <div
            className={`toast-content ${isShowing ? "show" : "hide"}`}
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
            onClick={hide}
          >
            <div className="toast-body">{message}</div>
            <div className="toast-flag--and-action">
              <div data-dismiss="toast" aria-label="Close" className="action">
                <span aria-hidden="true">&times; </span>
              </div>
              <div
                className={`toast-flag 
              ${severity === 0 ? "success" : ""} 
              ${severity === 1 ? "fail" : ""}`}
              ></div>
            </div>
          </div>
        </Fragment>,
        document.body
      )
    : null;
