import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalBox } from './Modal.styled';


const modalRoot = document.querySelector('#modal-root');

export const Modal = (onClose, children) => {

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
     onClose();
    }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [onClose])
  

  const onBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  
    return createPortal(
      <Overlay onClick={onBackdropClick}>
            <ModalBox>
                {children}
            </ModalBox>
      </Overlay>,
      modalRoot
    );
  
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};