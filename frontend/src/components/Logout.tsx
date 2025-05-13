"use client";

import React, { FormEvent, useState } from "react";
import { signOut } from "../actions/auth";

function Logout() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await signOut();
    setLoading(false);
  };
  return (
    <div>
      <form onSubmit={handleLogout}>
        <button type="submit" disabled={loading}>
          {loading ? "Signing out..." : "Sign out"}
        </button>
      </form>
    </div>
  );
}

export default Logout;
