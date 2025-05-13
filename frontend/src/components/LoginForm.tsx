"use client";

import React, { FormEvent, useState } from "react";
import AuthButton from "./AuthButton";
import { useRouter } from "next/navigation";
import { signIn } from "../actions/auth";

function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(error);

    const formData = new FormData(event.currentTarget);
    const result = await signIn(formData);

    if (result.status === "success") {
      router.push("/");
    } else {
      setError(result.status);
    }

    setLoading(false);
  };

  return (
    <form onClick={handleSubmit}>
      <label htmlFor="email">
        Email
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Your Email"
          required
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Your Password"
          required
        />
      </label>
      <AuthButton type="login" loading={loading} />
      {error && <p>{error}</p>}
    </form>
  );
}

export default LoginForm;
