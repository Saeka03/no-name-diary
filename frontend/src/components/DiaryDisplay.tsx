"use client";

import React, { MouseEvent, useState } from "react";
import styles from "./DiaryDisplay.module.scss";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegFaceLaughSquint } from "react-icons/fa6";
import { FaRegFaceSadCry } from "react-icons/fa6";
import Button from "./Button";
import { useModalStore } from "../stores/modalStore";
import { useDiariesStore } from "../stores/diaryStore";
import { useRouter } from "next/navigation";
import { useCommentsStore } from "../stores/commentStore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type DiaryDisplayProps = {
  diary: DiaryType;
  adminId: string;
  onEdit: boolean;
};

function DiaryDisplay({ diary, adminId, onEdit }: DiaryDisplayProps) {
  const [title, setTitle] = useState<string>(diary?.title);
  const [diaryContent, setDiaryContent] = useState<string>(diary?.content);
  const openModal = useModalStore((state) => state.openModal);
  const editDiary = useDiariesStore((state) => state.editDiary);
  const fetchDiaries = useDiariesStore((state) => state.fetchDiaries);
  const clearDiary = useDiariesStore((state) => state.clearDiary);
  const clearComments = useCommentsStore((state) => state.clearComments);
  const incrementReaction = useDiariesStore((state) => state.incrementReaction);
  const fetchDiary = useDiariesStore((state) => state.fetchDiary);
  const router = useRouter();

  const editDiaryHandler = async () => {
    if (title === "" && diaryContent === "") {
      alert("Please write the title and the diary entries.");
      return;
    } else if (title === "") {
      alert("Please write the title.");
      return;
    } else if (diaryContent === "") {
      alert("Please write the diary entries.");
      return;
    }

    try {
      if (title === undefined) {
        await editDiary(diary.id, diary.title, diaryContent);
      } else if (diaryContent === undefined) {
        await editDiary(diary.id, title, diary.content);
      } else {
        await editDiary(diary.id, title, diaryContent);
      }
      router.back();
      clearDiary();
      clearComments();
    } catch (error) {
      if (error instanceof Error) {
        alert(`${error.message}`);
      } else {
        alert("Failed to edit the diary entry.");
      }
    }
  };

  const reactionHandler = async (
    e: MouseEvent<HTMLButtonElement>,
    type: string
  ) => {
    e.preventDefault();
    try {
      await incrementReaction(diary.id, type);
      await fetchDiary(diary.id);
    } catch (error) {
      if (error instanceof Error) {
        alert(`${error.message}`);
      } else {
        alert("Failed to increment the reaction.");
      }
    }
  };

  return (
    <>
      {diary?.adminId === adminId && onEdit ? (
        <input
          className={styles.title}
          type="text"
          placeholder="Title"
          defaultValue={diary.title}
          onChange={(e) => setTitle(e.target.value)}
        >
          {}
        </input>
      ) : (
        <h2>{(diary && diary.title) || <Skeleton />}</h2>
      )}
      <div className={styles.line}></div>
      {diary?.adminId === adminId && onEdit ? (
        <textarea
          className={styles.inputContents}
          defaultValue={diary.content}
          placeholder="Write your diary..."
          onChange={(e) => setDiaryContent(e.target.value)}
        ></textarea>
      ) : (
        <div className={styles.contents}>
          {(diary && diary.content) || <Skeleton count={4} />}
        </div>
      )}
      <div className={styles.reactions}>
        <div className={styles.reactionItems}>
          <button
            className={styles.reaction}
            onClick={(e) => reactionHandler(e, "like")}
          >
            <AiOutlineLike />
          </button>
          <p>{(diary && diary.like) || 0}</p>
        </div>
        <div className={styles.reactionItems}>
          <button
            className={styles.reaction}
            onClick={(e) => reactionHandler(e, "laugh")}
          >
            <FaRegFaceLaughSquint />
          </button>
          <p>{(diary && diary.laugh) || 0}</p>
        </div>
        <div className={styles.reactionItems}>
          <button
            className={styles.reaction}
            onClick={(e) => reactionHandler(e, "cry")}
          >
            <FaRegFaceSadCry />
          </button>
          <p>{(diary && diary.cry) || 0}</p>
        </div>
      </div>
      {diary?.adminId === adminId ? (
        <div className={styles.edit}>
          <Button text={"Delete"} className={"delete"} onClick={openModal} />
          <Button
            text={"Save"}
            className={"action"}
            onClick={editDiaryHandler}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default DiaryDisplay;
