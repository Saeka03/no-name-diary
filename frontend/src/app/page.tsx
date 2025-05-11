import React from "react";
import styles from "./page.module.scss";
import Header from "../components/Header";
import Calendar from "../components/Calendar";
import Modal from "../components/Modal";

function Page() {
  return (
    <div className={styles.page}>
      <Header />
      <Calendar />
      <Modal />
    </div>
  );
}

export default Page;
