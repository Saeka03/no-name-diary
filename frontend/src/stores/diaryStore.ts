import { create } from "zustand";
import { getDiaries } from "../app/api/diaryApi";

interface DiariesState {
  diaries: {
    id: string;
    date: Date;
    title: string;
    content: string;
    like: number;
    laugh: number;
    cry: number;
    comment: CommentType[];
  }[];
  fetchDiaries: () => Promise<void>;
  postDiary: (dateTime: Date, title: string, content: string) => Promise<void>;
}

export const useDiariesStore = create<DiariesState>()((set) => ({
  diaries: [],
  fetchDiaries: async () => {
    try {
      try {
        // const data = await getDiaries();
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FRONTEND_ORIGIN}/api/dairies`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        set({
          diaries: data.diaries.map((diary) => ({
            id: diary.id.toString(),
            title: diary.title,
            date: diary.dateTime,
            content: diary.content,
            like: diary.like,
            laugh: diary.laugh,
            cry: diary.cry,
            comment: diary.comment,
          })),
        });
      } catch (error) {
        console.error(error);
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_ORIGIN}/api/dairies`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      set({
        diaries: data.diaries.map((diary) => ({
          id: diary.id.toString(),
          title: diary.title,
          date: diary.dateTime,
          content: diary.content,
          like: diary.like,
          laugh: diary.laugh,
          cry: diary.cry,
          comment: diary.comment,
        })),
      });
    } catch (error) {
      console.error(error);
    }
  },
  postDiary: async (dateTime, title, content) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_ORIGIN}/api/dairies`,
        {
          method: "POST",
          body: JSON.stringify({ dateTime, title, content }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
}));
