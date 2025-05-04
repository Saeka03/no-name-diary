import React from "react";
import styles from "./page.module.scss";
import Header from "../components/Header";
import Calendar from "../components/Calendar";

function Page() {
  return (
    <div className={styles.page}>
      <Header />
      <Calendar />
    </div>
  );
}

export default Page;
