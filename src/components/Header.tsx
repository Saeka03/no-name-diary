"use client";

import React from "react";
import styles from "./Header.module.scss";
import { Yellowtail } from "next/font/google";
import { createClient } from "../utils/supabase/client";
import Button from "./Button";
import { useRouter } from "next/navigation";

const yellowtail = Yellowtail({
  subsets: ["latin"],
  weight: "400",
});

function Header({ isUser }: { isUser: boolean }) {
  const router = useRouter();

  const logoutHandler = async () => {
    const supabase = await createClient();
    supabase.auth.signOut();
    location.reload();
  };

  const loginHandler = () => {
    router.push("/login");
  };

  return (
    <div className={styles.header}>
      <h1 className={`${styles.title} ${yellowtail.className}`}>
        No Name Diary
      </h1>
      {isUser ? (
        <Button className="cancel" text="Logout" onClick={logoutHandler} />
      ) : (
        <Button className="action" text="Login" onClick={loginHandler} />
      )}
    </div>
  );
}

export default Header;
