"use client";

import React from "react";
import styles from "./Modal.module.scss";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegFaceLaughSquint } from "react-icons/fa6";
import { FaRegFaceSadCry } from "react-icons/fa6";
import { IoTrashOutline } from "react-icons/io5";
import { useModalContext } from "../contexts/ModalContexts";
import { formatDate, formatTime } from "../utils/dateUtils";
import Button from "./Button";

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
            <h1>{diaryState.title}</h1>
          ) : (
            <input
              className={styles.title}
              type="text"
              placeholder="Title"
            ></input>
          )}
          <div className={styles.line}></div>
          {diaryState ? (
            <div className={styles.contents}>{diaryState.content}</div>
          ) : (
            <textarea
              className={styles.inputContents}
              placeholder="Write your diary..."
            ></textarea>
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
          <div className={styles.edit}>
            {diaryState ? (
              <Button text={"Delete"} className={"delete"} disabled={true} />
            ) : (
              <Button text={"Cancel"} className={"cancel"} disabled={true} />
            )}
            <Button text={"Save"} className={"action"} disabled={true} />
          </div>
          {diaryState &&
            diaryState.comment.map((comment) => {
              const commentDateTime =
                formatDate(new Date(comment.dateTime)) +
                " " +
                formatTime(new Date(comment.dateTime));
              return (
                <>
                  <div className={styles.line}></div>
                  <div className={styles.comments} key={comment.id}>
                    <div className={styles.commentsHeader}>
                      <h4>No Name</h4>
                      <p>{commentDateTime}</p>
                    </div>
                    <div className={styles.commentsContents}>
                      <p>{comment.content}</p>
                      <button className={styles.bin}>
                        <IoTrashOutline />
                      </button>
                    </div>
                    <div className={styles.line}></div>
                  </div>
                </>
              );
            })}
          {diaryState ? (
            <div className={styles.leaveCommentsWrapper}>
              <div className={styles.leaveComments}>
                <textarea
                  name="comments"
                  id=""
                  placeholder="Leave Your comments..."
                ></textarea>
                <div className={styles.submit}>
                  <Button
                    text={"Submit"}
                    className={"action"}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
