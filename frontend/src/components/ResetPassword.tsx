"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { resetPassword } from "../actions/auth";
import AuthButton from "./AuthButton";

function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await resetPassword(
      formData,
      searchParams.get("code") as string
    );

    if (result.status === "success") {
      router.push("/");
    } else {
      setError(result.status);
    }

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">
          New Password
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your new password..."
            required
          />
        </label>
        <AuthButton type="reset password" loading={loading} />
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default ResetPassword;
