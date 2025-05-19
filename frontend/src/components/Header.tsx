"use client";

import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Yellowtail } from "next/font/google";
import { createClient } from "../utils/supabase/client";
import Button from "./Button";
import { useRouter } from "next/navigation";

const yellowtail = Yellowtail({
  subsets: ["latin"],
  weight: "400",
});

function Header() {
  const [isUser, setIsUser] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);

    const fetchSupabase = async () => {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        setIsUser(false);
      } else {
        setIsUser(true);
      }
    };
    fetchSupabase();
  }, []);

  if (!isMounted) {
    return null;
  }

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
