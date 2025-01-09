import React from "react";
import styles from "./CommentDisplay.module.scss";
import { formatDate, formatTime } from "../utils/dateUtils";
import { IoTrashOutline } from "react-icons/io5";

type CommentDisplayProps = {
  comment: CommentType;
};

function CommentDisplay({ comment }: CommentDisplayProps) {
  const commentDateTime =
    formatDate(new Date(comment.dateTime)) +
    " " +
    formatTime(new Date(comment.dateTime));
  return (
    <>
      <div className={styles.line}></div>
      <div className={styles.comments}>
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
      </div>
    </>
  );
}

export default CommentDisplay;
