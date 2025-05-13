"use client";

import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { signUp } from "../actions/auth";
import AuthButton from "./AuthButton";

function SignUpForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await signUp(formData);

    if (result.status === "success") {
      router.push("/login");
    } else {
      setError(result.status);
    }

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">
          User Name
          <input
            type="text"
            id="userName"
            name="userName"
            placeholder="Your User Name"
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Your Password"
          />
        </label>
        <AuthButton type="sign up" loading={loading} />
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default SignUpForm;
