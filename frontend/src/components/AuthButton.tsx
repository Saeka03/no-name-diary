import React from "react";

type AuthButtonProps = {
  type: "login" | "sign up" | "reset password" | "forgot password";
  loading: boolean;
};

function AuthButton({ type, loading }: AuthButtonProps) {
  return (
    <button disabled={loading} type="submit">
      {loading ? "Loading..." : type}
    </button>
  );
}

export default AuthButton;
