import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import ModalOverlay from '@components/modal-overlay/modal-overlay';

import styles from './modal.module.css';
const modalRoot = document.getElementById('react-modals');

function Modal({ children, header, onClose }) {
  const modalOverlayRef = useRef(null);
  useEffect(() => {
    function handleEscape(e) {
      if (e.key === 'Escape') onClose();
    }

    function handleClick(e) {
      if (e.target === modalOverlayRef.current) onClose();
    }

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay ref={modalOverlayRef} />
      <div className={styles.modal}>
        {header ? (
          <div className={`${styles.header} mt-10 mr-10 ml-10`}>
            <div className="text text_type_main-large">{header}</div>
            <CloseIcon
              className={styles.icon}
              type="primary"
              onClick={() => {
                onClose();
              }}
            />
          </div>
        ) : (
          <CloseIcon
            type="primary"
            className={`${styles.icon} ${styles.icon_solo} mr-10 mt-15`}
            onClick={() => {
              onClose();
            }}
          />
        )}
        <div className={styles.modal_details}>{children}</div>
      </div>
    </>,
    modalRoot
  );
}

export default Modal;
