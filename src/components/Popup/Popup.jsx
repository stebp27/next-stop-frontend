import { useEffect } from "react";
import "./Popup.css";

function Popup(props) {
  const { onClose, children } = props;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="popup">
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
