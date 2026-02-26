import styles from './modal-overlay.module.css';

export const ModalOverlay = ({ ref }) => {
  return <div ref={ref} className={styles.overlay}></div>;
};
