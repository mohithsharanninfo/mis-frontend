import React from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineCloseCircle } from "react-icons/ai";

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content w-fit mx-10 relative " onClick={(e) => e.stopPropagation()}>
        {children}
        <button className=' cursor-pointer px-1 text-white rounded-bl-sm rounded-tr-sm absolute -top-5 -right-6' onClick={onClose}> <AiOutlineCloseCircle size={25}/></button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;