import { useEffect } from "react";
import "./Popup.css";

function Popup(props) {
  const { onClose, children } = props;

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div className="popup" onClick={handleOutsideClick}>
      <div className="popup__content">
        {children}
        <button
          aria-label="Close popup"
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default Popup;
