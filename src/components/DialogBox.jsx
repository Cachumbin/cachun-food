import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const DialogBox = ({ isOpen, onClose, title, children }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isVisible) return null;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="dialog-overlay" onClick={handleOverlayClick}>
      <div className="dialog-window">
        <div className="dialog-top-bar window-top-bar">
          <button className="dialog-button window-button" onClick={onClose}>
            <IoClose className="dialog-icon window-icon" />
          </button>
          <div className="dialog-text-container window-text-container">
            <p className="window-text">{title}</p>
          </div>
        </div>
        <div className="dialog-content window-content">{children}</div>
      </div>
    </div>
  );
};

DialogBox.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default DialogBox;
