"use client";

import React from "react";
import styles from "./DiaryDisplay.module.scss";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegFaceLaughSquint } from "react-icons/fa6";
import { FaRegFaceSadCry } from "react-icons/fa6";
import Button from "./Button";
import { useModalStore } from "../stores/modalStore";

type DiaryDisplayProps = {
  diary: DiaryType;
  adminId: string;
};

function DiaryDisplay({ diary, adminId }: DiaryDisplayProps) {
  const openModal = useModalStore((state) => state.openModal);

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
      {diary?.adminId === adminId ? (
        <div className={styles.edit}>
          <Button text={"Delete"} className={"delete"} onClick={openModal} />
          <Button text={"Save"} className={"action"} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default DiaryDisplay;
