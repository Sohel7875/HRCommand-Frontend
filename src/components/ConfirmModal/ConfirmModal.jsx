import React from 'react';
import styles from './ConfirmModal.module.css'; 

const ConfirmModal = ({ isOpen, onClose, onConfirm, message, title }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>{title || 'Confirm Action'}</h3>
        </div>
        <div className={styles.modalBody}>
          <p>{message || 'Are you sure you want to proceed with this action?'}</p>
        </div>
        <div className={styles.modalFooter}>
          <button onClick={onConfirm} className={styles.confirmButton}>
            Confirm
          </button>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
