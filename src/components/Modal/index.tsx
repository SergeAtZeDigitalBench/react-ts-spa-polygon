import { createPortal } from "react-dom";
import { motion } from "framer-motion";

import { IParent } from "@/types";
import classes from "./Modal.module.css";

interface IProps extends IParent {
  title: string;
  onClose: (...args: any[]) => void;
}

export default function Modal({ title, children, onClose }: IProps) {
  return createPortal(
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }} transition={{ duration: .2 }} className={classes.backdrop} onClick={onClose} />
      <motion.dialog
        open
        className={classes.modal}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: .3 }}
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,

    document.getElementById("modal") as Element
  );
}
