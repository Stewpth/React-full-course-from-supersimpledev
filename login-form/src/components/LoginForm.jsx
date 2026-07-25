import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";

import "./LoginForm.css";

export default function LoginForm() {
  return (
    <>
      <EmailInput />
      <PasswordInput />
      <button className="action-button">Login</button>
      <button className="action-button">Sign up</button>
    </>
  );
}
