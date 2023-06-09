import { ReactNode, ReactPortal } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  children: ReactNode;
  locked?: boolean;
}

const Modal = ({
  children,
  open,
  setOpen,
  locked,
}: ModalProps): ReactPortal => {
  return createPortal(
    <div
      className={` fixed top-0 z-20 flex h-screen w-screen items-center justify-center bg-black bg-opacity-60 font-rubik backdrop-blur-sm backdrop-filter transition-all ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
      onClick={locked ? undefined : () => setOpen(false)}
    >
      <div
        className=" rounded-xl bg-gray-200 bg-opacity-80 p-4 shadow backdrop-blur"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
