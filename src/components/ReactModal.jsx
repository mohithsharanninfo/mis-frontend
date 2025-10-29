// Modal.js (with Portal)
import React from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineCloseCircle } from "react-icons/ai";

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content w-full max-w-xl " onClick={(e) => e.stopPropagation()}>
        {children}
        <button className=' cursor-pointer bg-red-600 px-1 text-white rounded-bl-sm rounded-tr-sm ' onClick={onClose}> Close Modal</button>
      </div>
    </div>,
    document.body // Render the modal directly into the document body
  );
};

export default Modal;