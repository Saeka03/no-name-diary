"use client";

import React, { useEffect } from "react";
import styles from "./page.module.scss";
import Button from "../../../../components/Button";
import DiaryDisplay from "../../../../components/DiaryDisplay";
import CommentDisplay from "../../../../components/CommentDisplay";
import { useParams, useRouter } from "next/navigation";
import { useDiariesStore } from "../../../../stores/diaryStore";
import { formatDate } from "../../../../utils/dateUtils";
import { useCommentsStore } from "../../../../stores/commentStore";

function Diary() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const clearDiary = useDiariesStore((state) => state.clearDiary);
  const fetchDiary = useDiariesStore((state) => state.fetchDiary);
  const diary = useDiariesStore((state) => state.diary);
  const clearComments = useCommentsStore((state) => state.clearComments);

  useEffect(() => {
    fetchDiary(params.id);
  }, []);

  const handleClose = () => {
    router.back();
    clearDiary();
    clearComments();
  };

  return (
    <div className={styles.wrapper} onClick={handleClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <p>{diary && formatDate(new Date(diary.date))}</p>
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
          <DiaryDisplay diary={diary} />
          <CommentDisplay diaryId={Number(params.id)} />
        </div>
      </div>
    </div>
  );
}

export default Diary;
