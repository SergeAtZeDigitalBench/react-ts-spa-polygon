import { createPortal } from "react-dom";

import { IParent } from "@/types";
import classes from "./Modal.module.css";

interface IProps extends IParent {
  title: string;
  onClose: (...args: any[]) => void;
}

export default function Modal({ title, children, onClose }: IProps) {
  return createPortal(
    <>
      <div className={classes.backdrop} onClick={onClose} />
      <dialog open className={classes.modal}>
        <h2>{title}</h2>
        {children}
      </dialog>
    </>,

    document.getElementById("modal") as Element
  );
}
