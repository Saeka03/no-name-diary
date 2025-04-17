import React from "react";
import styles from "./DiaryDisplay.module.scss";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegFaceLaughSquint } from "react-icons/fa6";
import { FaRegFaceSadCry } from "react-icons/fa6";
import Button from "./Button";
import { deleteDiary } from "../app/api/diaryApi";
import { useModalContext } from "../contexts/ModalContext";

type DiaryDisplayProps = {
  diary: DiaryType;
};

function DiaryDisplay({ diary }: DiaryDisplayProps) {
  const { closeModalHandler, setDiaryState } = useModalContext();

  const deleteDiaryHandler = async () => {
    try {
      await deleteDiary(diary.id);
      setDiaryState(null);
      closeModalHandler();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>{diary.title}</h1>
      <div className={styles.line}></div>
      <div className={styles.contents}>{diary.content}</div>
      <div className={styles.reactions}>
        <div className={styles.reactionItems}>
          <button className={styles.reaction}>
            <AiOutlineLike />
          </button>
          <p>{diary.like}</p>
        </div>
        <div className={styles.reactionItems}>
          <button className={styles.reaction}>
            <FaRegFaceLaughSquint />
          </button>
          <p>{diary.laugh}</p>
        </div>
        <div className={styles.reactionItems}>
          <button className={styles.reaction}>
            <FaRegFaceSadCry />
          </button>
          <p>{diary.cry}</p>
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
