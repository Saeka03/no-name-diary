import React from "react";
import styles from "./page.module.scss";
import Header from "./components/Header";

function Page() {
  return (
    <div>
      <Header />
      <div className={styles.title}>no name diary</div>
    </div>
  );
}

export default Page;
