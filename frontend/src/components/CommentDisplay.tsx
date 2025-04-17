"use client";

import React, { useEffect, useState } from "react";
import styles from "./CommentDisplay.module.scss";
import { formatDate, formatTime } from "../utils/dateUtils";
import { IoTrashOutline } from "react-icons/io5";
import { deleteComment, addComment } from "../app/api/commentApi";
import Button from "./Button";
import { useModalContext } from "../contexts/ModalContext";
import { useCommentsStore } from "../stores/commentStore";

type CommentDisplayProps = {
  diaryId: number;
};

function CommentDisplay({ diaryId }: CommentDisplayProps) {
  const { diaryState } = useModalContext();
  const [content, setContent] = useState<string>("");
  const comments = useCommentsStore((state) => state.comments);
  const fetchComments = useCommentsStore((state) => state.fetchComments);

  useEffect(() => {
    fetchComments(diaryId);
  }, []);

  const addCommentHandler = async () => {
    if (content === "") {
      alert("Please write your comment.");
      return;
    }

    try {
      await addComment(new Date(), content, Number(diaryState.id));
      fetchComments(diaryId);
      setContent("");
    } catch (error) {
      if (error instanceof Error) {
        alert(`${error.message}`);
      } else {
        alert("Failed to post the comment.");
      }
    }
  };

  const commentDeleteHandler = async (id: number) => {
    try {
      await deleteComment(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {comments &&
        comments.map((comment) => {
          const commentDateTime =
            formatDate(new Date(comment.date)) +
            " " +
            formatTime(new Date(comment.date));

          return (
            <div key={comment.id}>
              <div className={styles.line}></div>
              <div className={styles.comments}>
                <div className={styles.commentsHeader}>
                  <h4>No Name</h4>
                  <p>{commentDateTime}</p>
                </div>
                <div className={styles.commentsContents}>
                  <p>{comment.content}</p>
                  <button
                    className={styles.bin}
                    onClick={() => commentDeleteHandler(comment.id)}
                  >
                    <IoTrashOutline />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      <div className={styles.leaveCommentsWrapper}>
        <div className={styles.leaveComments}>
          <textarea
            name="comments"
            placeholder="Leave Your comments..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div className={styles.submit}>
            <Button
              text={"Submit"}
              className={"action"}
              disabled={content.trim() === ""}
              onClick={addCommentHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentDisplay;
