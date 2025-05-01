"use client";

import React from "react";
import styles from "./page.module.scss";
import Button from "../../../../components/Button";
import DiaryDisplay from "../../../../components/DiaryDisplay";
import CommentDisplay from "../../../../components/CommentDisplay";
import { useParams, useRouter } from "next/navigation";
import { useDiariesStore } from "../../../../stores/diaryStore";

function Diary() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const clearDiary = useDiariesStore((state) => state.clearDiary);

  const handleClose = () => {
    router.back();
    clearDiary();
  };

  return (
    <div className={styles.wrapper} onClick={handleClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <p>Date</p>
            <div className={styles.buttons}>
              <Button
                text={"See translation"}
                className={"cancel"}
                disabled={true}
              />
              <button className={styles.closeButton} onClick={handleClose}>
                ×
              </button>
            </div>
          </div>
          <div className={styles.line}></div>
          <DiaryDisplay id={params.id} />
          <CommentDisplay diaryId={Number(params.id)} />
        </div>
      </div>
    </div>
  );
}

export default Diary;
