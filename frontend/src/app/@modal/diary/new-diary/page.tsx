"use client";

import React from "react";
import styles from "./page.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import DiaryInput from "../../../../components/DiaryInput";
import { formatDate } from "../../../../utils/dateUtils";

function NewDiary() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const date = searchParams.get("query");

  const handleClose = () => {
    router.back();
  };

  return (
    <div className={styles.modalWrapper} onClick={handleClose}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modal}>
          <div className={styles.header}>
            <p>{formatDate(new Date(date))}</p>
            <div className={styles.buttons}>
              <button className={styles.closeButton} onClick={handleClose}>
                ×
              </button>
            </div>
          </div>
          <div className={styles.line}></div>
          <DiaryInput date={new Date(date)} handleClose={handleClose} />
        </div>
      </div>
    </div>
  );
}

export default NewDiary;
