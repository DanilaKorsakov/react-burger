import type { RefObject } from 'react';

import styles from './modal-overlay.module.css';

type ModalOverlayProps = {
  ref: RefObject<HTMLDivElement | null>;
};

export const ModalOverlay = ({ ref }: ModalOverlayProps): React.JSX.Element => {
  return <div data-testid="modal-overlay" ref={ref} className={styles.overlay}></div>;
};
