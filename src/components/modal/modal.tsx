import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { type ReactNode, type ReactPortal, useRef } from 'react';
import ReactDOM from 'react-dom';

import { ModalOverlay } from '@components/modal-overlay/modal-overlay.tsx';
import { useModal } from '@hooks/use-modal.js';

import styles from './modal.module.css';
const modalRoot = document.getElementById('react-modals');

type ModalProps = {
  children: ReactNode;
  header?: string;
  prevLocation?: Location['pathname'];
};

export const Modal = ({ children, header, prevLocation }: ModalProps): ReactPortal => {
  const modalOverlayRef = useRef<HTMLDivElement | null>(null);

  const { handleClose } = useModal({ prevLocation, modalOverlayRef });

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
    modalRoot!
  );
};
