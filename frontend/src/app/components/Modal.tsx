"use client";

import React from "react";
import styles from "./Modal.module.scss";
import { useModalContext } from "../contexts/ModalContext";
import { formatDate } from "../utils/dateUtils";
import Button from "./Button";
import DiaryInput from "./DiaryInput";
import CommentDisplay from "./CommentDisplay";
import DiaryDisplay from "./DiaryDisplay";

function Modal() {
  const { isModalOpen, selectedDate, diaryState, closeModalHandler } =
    useModalContext();

  if (!isModalOpen) return null;

  const diaryDate = diaryState
    ? formatDate(new Date(diaryState.dateTime))
    : formatDate(new Date(selectedDate));

  return (
    <div className={styles.modalWrapper} onClick={closeModalHandler}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modal}>
          <div className={styles.header}>
            <p>{diaryDate}</p>
            <div className={styles.buttons}>
              {diaryState ? (
                <Button
                  text={"See translation"}
                  className={"cancel"}
                  disabled={true}
                />
              ) : (
                <></>
              )}
              <button
                className={styles.closeButton}
                onClick={closeModalHandler}
              >
                ×
              </button>
            </div>
          </div>
          <div className={styles.line}></div>
          {diaryState ? <DiaryDisplay diary={diaryState} /> : <DiaryInput />}
          <CommentDisplay diaryId={diaryState.id} />
        </div>
      </div>
    </div>
  );
}

export default Modal;
