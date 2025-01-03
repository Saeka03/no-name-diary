import React from "react";
import styles from "./page.module.scss";
import Header from "./components/Header";
import Calendar from "./components/Calendar";
import Modal from "./components/Modal";
import { ModalProvider } from "./contexts/ModalContexts";

function Page() {
  return (
    <ModalProvider>
      <div className={styles.page}>
        <Header />
        <Calendar />
        <Modal />
      </div>
    </ModalProvider>
  );
}

export default Page;
