"use client";

import React, { FormEvent, useState } from "react";
import AuthButton from "./AuthButton";
import { forgotPassword } from "../actions/auth";

function ForgotPassword() {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const result = await forgotPassword(formData);

    if (result.status === "success") {
      setMessage("Password reset link sent to your email");
    } else {
      setError(result.status);
    }

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email..."
            required
          />
        </label>
        <AuthButton type="forgot password" loading={loading} />
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default ForgotPassword;
