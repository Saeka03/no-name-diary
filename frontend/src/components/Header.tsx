import Image from "next/image";
import React from "react";
import styles from "./Header.module.scss";
import { Yellowtail } from "next/font/google";
import { createClient } from "../utils/supabase/server";
import Button from "./Button";
import Logout from "./Logout";
import Link from "next/link";

const yellowtail = Yellowtail({
  subsets: ["latin"],
  weight: "400",
});

async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
      {!user ? (
        <Link href={"/login"}>
          <Button className="action" text="Login" />
        </Link>
      ) : (
        <div>
          <div>{`Hi! ${user.email}`}</div>
          <Logout />
          {/* <Button className="action" text="Logout" onClick={logoutHandler} /> */}
        </div>
      )}
    </div>
  );
}

export default Header;
