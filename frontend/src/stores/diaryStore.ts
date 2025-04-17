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
  fetchDiaries: () => void;
}

export const useDiariesStore = create<DiariesState>()((set) => ({
  diaries: [],
  fetchDiaries: async () => {
    try {
      const data = await getDiaries();
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
}));
