"use client";
import { useState, useRef } from "react";
import styles from "./CopyButton.module.css";

function CopyButton({ textToCopy, initialText = "Copy" }) {
  const [buttonText, setButtonText] = useState(initialText);
  const timeoutRef = useRef(null);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setButtonText("Copied!");

      // Clear any existing timeout to prevent multiple timeouts interfering
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // timeout to revert the button text after a delay
      timeoutRef.current = setTimeout(() => {
        setButtonText(initialText);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button className={styles.copyBtn} onClick={handleCopyClick}>
      {buttonText}
    </button>
  );
}

export default CopyButton;
