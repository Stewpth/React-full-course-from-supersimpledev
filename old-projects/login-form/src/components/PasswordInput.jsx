import { useState } from "react";
import "./PasswordInput.css";

export default function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div>
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className="password-input"
      />
      <button onClick={toggleShowPassword}>show</button>
    </div>
  );
}
