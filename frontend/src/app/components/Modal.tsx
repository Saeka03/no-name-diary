"use client";

import React from "react";
import styles from "./Modal.module.scss";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegFaceLaughSquint } from "react-icons/fa6";
import { FaRegFaceSadCry } from "react-icons/fa6";
import { useModalContext } from "../contexts/ModalContexts";
import { formatDate } from "../utils/dateUtils";
import Button from "./Button";
import DiaryInput from "./DiaryInput";
import CommentInput from "./CommentInput";
import CommentDisplay from "./CommentDisplay";

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
          {diaryState ? (
            <>
              <h1>{diaryState.title}</h1>
              <div className={styles.line}></div>
              <div className={styles.contents}>{diaryState.content}</div>
            </>
          ) : (
            <DiaryInput />
          )}
          {diaryState ? (
            <div className={styles.reactions}>
              <div className={styles.reactionItems}>
                <button className={styles.reaction}>
                  <AiOutlineLike />
                </button>
                <p>{diaryState.like}</p>
              </div>
              <div className={styles.reactionItems}>
                <button className={styles.reaction}>
                  <FaRegFaceLaughSquint />
                </button>
                <p>{diaryState.laugh}</p>
              </div>
              <div className={styles.reactionItems}>
                <button className={styles.reaction}>
                  <FaRegFaceSadCry />
                </button>
                <p>{diaryState.cry}</p>
              </div>
            </div>
          ) : (
            <></>
          )}
          {diaryState ? (
            <div className={styles.edit}>
              <Button text={"Delete"} className={"delete"} />
              <Button text={"Save"} className={"action"} />
            </div>
          ) : (
            <></>
          )}
          {diaryState &&
            diaryState.comment.map((comment) => (
              <CommentDisplay key={comment.id} comment={comment} />
            ))}
          {diaryState ? <CommentInput /> : <></>}
        </div>
      </div>
    </div>
  );
}

export default Modal;
