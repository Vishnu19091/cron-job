import styles from "./ModalWindow.module.css";

const ModalWindow = ({ isOpen, setIsModalOpen, children, className }) => {
  if (!isOpen) return null; // Don't render if not open

  // Handle clicks on the backdrop to close the modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    // Backdrop div covers the entire screen
    <div className={styles.modal_backdrop} onClick={handleBackdropClick}>
      {/* Modal content div, centered on the screen */}
      <div className={`${styles.modal_content} ${className}`}>
        <button
          className={styles.close_btn}
          onClick={() => setIsModalOpen(false)}
        >
          &times; {/* Simple 'X' character for close button */}
        </button>
        {children} {/* Renders the content passed from the parent component */}
      </div>
    </div>
  );
};

export default ModalWindow;
