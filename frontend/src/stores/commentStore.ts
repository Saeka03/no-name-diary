import { create } from "zustand";
import { getComments } from "../app/api/commentApi";

interface CommentState {
  comments: CommentType[];
  fetchComments: (diaryId: number) => void;
}

export const useCommentsStore = create<CommentState>()((set) => ({
  comments: [],
  fetchComments: async (diaryId) => {
    try {
      const data = await getComments(diaryId);
      set({
        comments: data.comments.map((comment) => ({
          id: comment.id.toString(),
          date: comment.dateTime,
          content: comment.content,
        })),
      });
    } catch (error) {
      console.error(error);
    }
  },
}));
