import styles from './modal-overlay.module.css';

function ModalOverlay({ ref }) {
  return <div ref={ref} className={styles.overlay}></div>;
}

export default ModalOverlay;
