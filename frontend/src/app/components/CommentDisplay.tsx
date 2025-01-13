import React from "react";
import styles from "./CommentDisplay.module.scss";
import { formatDate, formatTime } from "../utils/dateUtils";
import { IoTrashOutline } from "react-icons/io5";
import { deleteComment } from "../api/commentApi";

type CommentDisplayProps = {
  comment: CommentType;
};

function CommentDisplay({ comment }: CommentDisplayProps) {
  const commentDateTime =
    formatDate(new Date(comment.dateTime)) +
    " " +
    formatTime(new Date(comment.dateTime));

  const commentDeleteHandler = async () => {
    try {
      await deleteComment(comment.id);
    } catch (error) {
      console.error(error);
    }
  };

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
          <button className={styles.bin} onClick={commentDeleteHandler}>
            <IoTrashOutline />
          </button>
        </div>
      </div>
    </>
  );
}

export default CommentDisplay;
