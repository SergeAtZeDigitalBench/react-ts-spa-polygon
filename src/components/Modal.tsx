import { createPortal } from 'react-dom';
import { IParent } from "../types";

interface IProps extends IParent { title: string, onClose: (...args: any[]) => void }

export default function Modal({ title, children, onClose }: IProps) {
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <dialog open className="modal">
        <h2>{title}</h2>
        {children}
      </dialog>
    </>,

    document.getElementById('modal') as Element
  );
}
