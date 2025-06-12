import React, { useEffect } from "react";
import "../styles/toast.css";

const Toast = ({ message, type = "info", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`custom-toast ${type}`}>
      {message}
      <button className="close-btn" onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default Toast;
