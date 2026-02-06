import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import ModalOverlay from '@components/modal-overlay/modal-overlay';

import styles from './modal.module.css';
const modalRoot = document.getElementById('react-modals');

function Modal({ children, header, onClose }) {
  useEffect(() => {
    function handleEscape(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <ModalOverlay />
        {header ? (
          <div className={`${styles.header} mt-10 mr-10 ml-10`}>
            <div className="text text_type_main-large">{header}</div>
            <CloseIcon
              type="primary"
              onClick={() => {
                onClose();
              }}
            />
          </div>
        ) : (
          <CloseIcon
            type="primary"
            className={`${styles.icon} mr-10 mt-15`}
            onClick={() => {
              onClose();
            }}
          />
        )}
        <div className={styles.modal_info}>{children}</div>
      </div>
    </>,
    modalRoot
  );
}

export default Modal;
