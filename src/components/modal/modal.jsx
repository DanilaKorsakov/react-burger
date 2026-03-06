import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import ReactDOM from 'react-dom';

import { ModalOverlay } from '@components/modal-overlay/modal-overlay';
import { useModal } from '@hooks/use-modal.jsx';

import styles from './modal.module.css';
const modalRoot = document.getElementById('react-modals');

export const Modal = ({ children, header, prevLocation }) => {
  const modalOverlayRef = useRef(null);

  const { handleClose } = useModal(prevLocation, modalOverlayRef);

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
                handleClose();
              }}
            />
          </div>
        ) : (
          <CloseIcon
            type="primary"
            className={`${styles.icon} ${styles.icon_solo} mr-10 mt-15`}
            onClick={() => {
              handleClose();
            }}
          />
        )}
        <div className={styles.modal_details}>{children}</div>
      </div>
    </>,
    modalRoot
  );
};
