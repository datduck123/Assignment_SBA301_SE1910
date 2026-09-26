import React, { useState } from "react";
import { authService } from "./authService";
import { validateAuth } from "../../utils/validation";
import InputField from "../../components/common/InputField";

export default function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateAuth(username, password);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const result = authService.login(username, password);
    if (result.success) {
      setServerError("");
      onLoginSuccess(result.data);
    } else {
      setServerError(result.message);
    }
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <h2 className="login-title">Sign In to FUNews</h2>
        {serverError && <div className="error-box">{serverError}</div>}
        <form onSubmit={handleSubmit}>
          <InputField
            label="Username"
            type="text"
            placeholder="e.g. Admin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={errors.username}
            required
          />
          <InputField
            label="Password"
            type="password"
            placeholder="e.g. Admin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            required
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "10px" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
