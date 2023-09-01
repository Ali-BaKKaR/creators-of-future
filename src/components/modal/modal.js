import React from "react";
import ReactDom from "react-dom";
import "./modal.css";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#F7F9FA",
  width: "90%",
  height: "90%",
  zIndex: 1000,
  overflow: "scroll",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

export default function Modal({ open, children, onClose }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={onClose} />
      <div style={MODAL_STYLES}>
        <span class="close" onClick={onClose}>
          &times;
        </span>

        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
}
