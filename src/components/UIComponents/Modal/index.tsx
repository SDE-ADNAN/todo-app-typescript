import React, { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';
import { Button } from '@mui/material';

interface ModalProps {
  isOpen: Boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  console.log(children)
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <Button className="close-button" onClick={onClose}>
          X
        </Button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default Modal;
