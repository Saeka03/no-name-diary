"use client";

import React, { useState } from "react";
import styles from "./DiaryInput.module.scss";
import Button from "./Button";
import { useModalContext } from "../contexts/ModalContexts";
import { addDiary } from "../api/diaryApi";

function DiaryInput() {
  const { selectedDate, closeModalHandler } = useModalContext();
  const [title, setTitle] = useState<string>("");
  const [diaryContent, setDiaryContent] = useState<string>("");

  const addDiaryHandler = async () => {
    try {
      await addDiary(new Date(selectedDate), title, diaryContent);
    } catch (error) {
      if (error instanceof Error) {
        alert(`${error.message}`);
      } else {
        alert("Failed to post the diary entry.");
      }
    }
    closeModalHandler();
  };

  return (
    <>
      <input
        className={styles.title}
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <div className={styles.line}></div>
      <textarea
        className={styles.inputContents}
        placeholder="Write your diary..."
        onChange={(e) => setDiaryContent(e.target.value)}
      ></textarea>
      <div className={styles.line}></div>
      <div className={styles.edit}>
        <Button
          text={"Cancel"}
          className={"cancel"}
          onClick={closeModalHandler}
        />
        <Button text={"Save"} className={"action"} onClick={addDiaryHandler} />
      </div>
    </>
  );
}

export default DiaryInput;
