"use client";
import style from "./PasswdIPField.module.css";

import { useState } from "react";

export default function PasswdIPField({ setPasswd }) {
  const [showPasswd, setShowPasswd] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPasswd(!showPasswd);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return regex.test(password);
  };

  function handlePasswdChange(e) {
    const passwd = e.target.value;

    setPasswd(passwd);
    setIsValid(validatePassword(passwd) || passwd == "");
  }

  return (
    <div className="w-full">
      <div className={style.wrapper}>
        <input
          placeholder="Enter a password *"
          type={showPasswd ? "text" : "password"}
          onChange={handlePasswdChange}
        />

        <button type="button" onClick={togglePasswordVisibility}>
          {showPasswd ? "Hide" : "Show"}
        </button>
      </div>

      {/* Error message */}
      <p
        className={`${style.error_msg} ${!isValid ? "text-red-500" : "hidden"}`}
      >
        A minimum of 8 characters and a maximum of 20 characters, including
        uppercase and lowercase letters and numbers
      </p>
    </div>
  );
}
