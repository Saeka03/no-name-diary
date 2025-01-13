"use client";

import React, { useState } from "react";
import styles from "./CommentInput.module.scss";
import Button from "./Button";
import { useModalContext } from "../contexts/ModalContext";
import { addComment } from "../api/commentApi";

function CommentInput() {
  const { diaryState } = useModalContext();
  const [content, setContent] = useState<string>("");

  const addCommentHandler = async () => {
    try {
      await addComment(new Date(), content, diaryState.id);
    } catch (error) {
      if (error instanceof Error) {
        alert(`${error.message}`);
      } else {
        alert("Failed to post the comment.");
      }
    }
    setContent("");
  };

  return (
    <div className={styles.leaveCommentsWrapper}>
      <div className={styles.leaveComments}>
        <textarea
          name="comments"
          placeholder="Leave Your comments..."
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className={styles.submit}>
          <Button
            text={"Submit"}
            className={"action"}
            disabled={true}
            onClick={addCommentHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default CommentInput;
