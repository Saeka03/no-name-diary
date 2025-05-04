"use client";

import React, { useState } from "react";
import styles from "./DiaryInput.module.scss";
import Button from "./Button";
import { useDiariesStore } from "../stores/diaryStore";
import { useRouter } from "next/navigation";

type DiaryInputProps = {
  date: Date;
  handleClose: () => void;
};

function DiaryInput({ date, handleClose }: DiaryInputProps) {
  const [title, setTitle] = useState<string>("");
  const [diaryContent, setDiaryContent] = useState<string>("");
  const fetchDiaries = useDiariesStore((state) => state.fetchDiaries);
  const postDiary = useDiariesStore((state) => state.postDiary);
  const router = useRouter();

  const addDiaryHandler = async () => {
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
      await postDiary(date, title, diaryContent);
      router.back();
      await fetchDiaries();
    } catch (error) {
      if (error instanceof Error) {
        alert(`${error.message}`);
      } else {
        alert("Failed to post the diary entry.");
      }
    }
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
        <Button text={"Cancel"} className={"cancel"} onClick={handleClose} />
        <Button text={"Save"} className={"action"} onClick={addDiaryHandler} />
      </div>
    </>
  );
}

export default DiaryInput;
