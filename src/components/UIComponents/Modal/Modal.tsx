import React, { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';
// import AddIcon from '../AddIcon/AddIcon';
import CrossIcon from '../CrossIcon/CrossIcon';

interface ModalProps {
  isOpen: Boolean;
  onClose: () => void;
  children: ReactNode;
  heading: string;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children, heading = "MOdal header Modal header" }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className='header_and_cosebtn_container'>
          <div className='modal_header'>
            <h3 className=''>{heading}</h3>
          </div>
          <div onClick={onClose} className='modal_close_btn'>
            <CrossIcon size={20} tooltipText='Close Modal' />
          </div>
        </div>
        <div className='modal_main_content_container'>{children}</div>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default Modal;
