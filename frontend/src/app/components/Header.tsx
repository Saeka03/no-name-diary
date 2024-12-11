import Image from "next/image";
import React from "react";
import styles from "./Header.module.scss";
import { Yellowtail } from "next/font/google";

const yellowtail = Yellowtail({
  subsets: ["latin"],
  weight: "400",
});

function Header() {
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
    </div>
  );
}

export default Header;
