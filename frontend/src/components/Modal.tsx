"use client";

import React from "react";
import Button from "./Button";
import { useDiariesStore } from "../stores/diaryStore";
import { useCommentsStore } from "../stores/commentStore";
import styles from "./Modal.module.scss";
import { useRouter } from "next/navigation";

type NotificationProps = {
  diary: DiaryType;
  isOpenModal: boolean;
  closeModal: () => void;
};
function Modal({ diary, isOpenModal, closeModal }: NotificationProps) {
  const deleteDiary = useDiariesStore((state) => state.deleteDiary);
  const fetchDiaries = useDiariesStore((state) => state.fetchDiaries);
  const clearDiary = useDiariesStore((state) => state.clearDiary);
  const clearComments = useCommentsStore((state) => state.clearComments);
  const router = useRouter();

  const deleteDiaryHandler = async () => {
    try {
      await deleteDiary(diary.id);
      await fetchDiaries();
      clearDiary();
      clearComments();
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={isOpenModal ? `${styles.display}` : `${styles.nonDisplay}`}>
      <div className={styles.modalContainer}>
        <div>Are you sure? Do you want to delete this diary?</div>
        <div className={styles.buttonWrapper}>
          <Button text={"Cancel"} className={"cancel"} onClick={closeModal} />
          <Button
            text={"Delete"}
            className={"delete"}
            onClick={deleteDiaryHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default Modal;
