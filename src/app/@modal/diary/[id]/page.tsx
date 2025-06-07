"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import Button from "../../../../components/Button";
import DiaryDisplay from "../../../../components/DiaryDisplay";
import CommentDisplay from "../../../../components/CommentDisplay";
import { useParams, useRouter } from "next/navigation";
import { useDiariesStore } from "../../../../stores/diaryStore";
import { formatDate } from "../../../../utils/dateUtils";
import { useCommentsStore } from "../../../../stores/commentStore";
import { createClient } from "../../../../utils/supabase/client";

function Diary() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const clearDiary = useDiariesStore((state) => state.clearDiary);
  const fetchDiary = useDiariesStore((state) => state.fetchDiary);
  const diary = useDiariesStore((state) => state.diary);
  const clearComments = useCommentsStore((state) => state.clearComments);
  const [adminId, setAdminId] = useState(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [onEdit, setOnEdit] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);

    const fetchSupabase = async () => {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        setAdminId(null);
      } else {
        setAdminId(data?.user.id);
      }
    };

    fetchSupabase();
    fetchDiary(params.id);
  }, []);

  const handleClose = () => {
    router.back();
    clearDiary();
    clearComments();
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className={styles.wrapper} onClick={handleClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <p>{diary && formatDate(new Date(diary.date))}</p>
            <div className={styles.buttons}>
              {!adminId ? (
                <></>
              ) : onEdit ? (
                <Button
                  text={"No Edit"}
                  className={"cancel"}
                  onClick={() => setOnEdit(!onEdit)}
                />
              ) : (
                <Button
                  text={"Edit"}
                  className={"action"}
                  onClick={() => setOnEdit(!onEdit)}
                />
              )}
              <button className={styles.closeButton} onClick={handleClose}>
                ×
              </button>
            </div>
          </div>
          <div className={styles.line}></div>
          <DiaryDisplay diary={diary} adminId={adminId} onEdit={onEdit} />
          <CommentDisplay diaryId={Number(params.id)} adminId={adminId} />
        </div>
      </div>
    </div>
  );
}

export default Diary;
