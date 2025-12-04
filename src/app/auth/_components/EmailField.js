"use client";

import { useState } from "react";
import style from "./EmailField.module.css";

export default function EmailField({ setEmail }) {
  const [isEmailValid, setIsEmailValid] = useState(true);

  // Regular expression for email validation
  const validateEmail = (email) => {
    const regex = /^[a-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  // Validate Email
  const handleChange = (e) => {
    const value = e.target.value;

    setEmail(value);
    if (value === "") {
      setIsEmailValid(true);
    } else if (value.length >= 6) {
      setIsEmailValid(validateEmail(value) || value === "");
    } else {
      setIsEmailValid(false);
    }
  };

  return (
    <div className={style.email_comp}>
      <input
        placeholder="Enter Email *"
        type="email"
        onChange={handleChange}
        className={`
          ${
            !isEmailValid
              ? "focus:border-red-400 caret-red-600"
              : "focus:border-white caret-white"
          }`}
      />

      {!isEmailValid && <p>Enter a valid Email!</p>}
    </div>
  );
}
