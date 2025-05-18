"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Yellowtail } from "next/font/google";
import Button from "./Button";
import Link from "next/link";
import { createClient } from "../utils/supabase/client";

const yellowtail = Yellowtail({
  subsets: ["latin"],
  weight: "400",
});

function Header() {
  const [isUser, setIsUser] = useState<boolean>(false);

  useEffect(() => {
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

  const logoutHandler = async () => {
    const supabase = await createClient();
    supabase.auth.signOut();
    location.reload();
  };

  return (
    <div className={styles.header}>
      <Image
        className={styles.img}
        src={"/img-header.png"}
        alt="Header image"
        height={100}
        width={2500}
      />
      <h1 className={`${styles.title} ${yellowtail.className}`}>
        No Name Diary
      </h1>
      {isUser ? (
        <button onClick={logoutHandler}>Logout</button>
      ) : (
        <Link href="/login">
          <button>Login</button>
        </Link>
      )}
    </div>
  );
}

export default Header;
