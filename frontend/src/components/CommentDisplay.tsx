"use client";

import React, { useEffect, useState } from "react";
import styles from "./CommentDisplay.module.scss";
import { formatDate, formatTime } from "../utils/dateUtils";
import { IoTrashOutline } from "react-icons/io5";
import Button from "./Button";
import { useCommentsStore } from "../stores/commentStore";
import CardSkeleton from "./CardSkeleton";

type CommentDisplayProps = {
  diaryId: number;
};

function CommentDisplay({ diaryId }: CommentDisplayProps) {
  const [content, setContent] = useState<string>("");
  const comments = useCommentsStore((state) => state.comments);
  const fetchComments = useCommentsStore((state) => state.fetchComments);
  const postComment = useCommentsStore((state) => state.postComment);
  const deleteComment = useCommentsStore((state) => state.deleteComment);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchComments(diaryId);
    setIsLoading(false);
  }, []);

  const addCommentHandler = async () => {
    if (content === "") {
      alert("Please write your comment.");
      return;
    }

    try {
      await postComment(new Date(), content, diaryId);
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

  const commentDeleteHandler = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      fetchComments(diaryId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.commentWrapper}>
      {isLoading && <CardSkeleton cards={2} />}
      {comments?.length > 0 ? (
        <div className={styles.commentDisplay}>
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
        </div>
      ) : (
        <></>
      )}
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
    </div>
  );
}

export default CommentDisplay;
