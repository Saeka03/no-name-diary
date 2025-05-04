"use client";

import React from "react";
import styles from "./DiaryDisplay.module.scss";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegFaceLaughSquint } from "react-icons/fa6";
import { FaRegFaceSadCry } from "react-icons/fa6";
import Button from "./Button";
import { useDiariesStore } from "../stores/diaryStore";

type DiaryDisplayProps = {
  diary: DiaryType;
};

function DiaryDisplay({ diary }: DiaryDisplayProps) {
  const deleteDiary = useDiariesStore((state) => state.deleteDiary);
  const fetchDiaries = useDiariesStore((state) => state.fetchDiaries);

  const deleteDiaryHandler = async () => {
    try {
      await deleteDiary(diary.id);
      await fetchDiaries();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>{diary && diary.title}</h1>
      <div className={styles.line}></div>
      <div className={styles.contents}>{diary && diary.content}</div>
      <div className={styles.reactions}>
        <div className={styles.reactionItems}>
          <button className={styles.reaction}>
            <AiOutlineLike />
          </button>
          <p>{diary && diary.like}</p>
        </div>
        <div className={styles.reactionItems}>
          <button className={styles.reaction}>
            <FaRegFaceLaughSquint />
          </button>
          <p>{diary && diary.laugh}</p>
        </div>
        <div className={styles.reactionItems}>
          <button className={styles.reaction}>
            <FaRegFaceSadCry />
          </button>
          <p>{diary && diary.cry}</p>
        </div>
      </div>
      <div className={styles.edit}>
        <Button
          text={"Delete"}
          className={"delete"}
          onClick={deleteDiaryHandler}
        />
        <Button text={"Save"} className={"action"} />
      </div>
    </>
  );
}

export default DiaryDisplay;
