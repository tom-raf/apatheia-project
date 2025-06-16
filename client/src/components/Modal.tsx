import '../styles/Modal.css';

type ModalProps = {
  message: string,
  confirmText: string,
  onConfirm: () => void,
  cancelText?: string,
  onCancel?: () => void
}

function Modal({ message, confirmText, onConfirm, cancelText, onCancel }: ModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        <div className="modal-buttons">
          {cancelText && onCancel && (
            <button className="cancel-button" onClick={onCancel}>
              {cancelText}
            </button>
          )}
          <button className="confirm-button" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;