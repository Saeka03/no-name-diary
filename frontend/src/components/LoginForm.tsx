"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import AuthButton from "./AuthButton";

function LoginForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const priceId = searchParams.get("priceId");

  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <AuthButton type="login" loading={true} />
    </form>
  );
}

export default LoginForm;
