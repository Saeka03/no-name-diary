"use client";

import React from "react";
import Button from "./Button";
import { useDiariesStore } from "../stores/diaryStore";
import { useCommentsStore } from "../stores/commentStore";
import styles from "./Modal.module.scss";
import { useRouter } from "next/navigation";
import { useModalStore } from "../stores/modalStore";

function Modal() {
  const deleteDiary = useDiariesStore((state) => state.deleteDiary);
  const fetchDiaries = useDiariesStore((state) => state.fetchDiaries);
  const clearDiary = useDiariesStore((state) => state.clearDiary);
  const clearComments = useCommentsStore((state) => state.clearComments);
  const diary = useDiariesStore((state) => state.diary);
  const isOpenModal = useModalStore((state) => state.isOpenModal);
  const closeModal = useModalStore((state) => state.closeModal);
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
    <div
      className={isOpenModal ? `${styles.display}` : `${styles.nonDisplay}`}
      onClick={closeModal}
    >
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={closeModal}>
          ×
        </button>
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
