import { create } from "zustand";

interface CommentState {
  comments: CommentType[];
  fetchComments: (diaryId: number) => void;
  postComment: (
    dateTime: Date,
    content: string,
    diaryId: number
  ) => Promise<void>;
  deleteComment: (diaryId: number, commentId: number) => Promise<void>;
  clearComments: () => void;
}

export const useCommentsStore = create<CommentState>()((set) => ({
  comments: [],
  fetchComments: async (diaryId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_ORIGIN}/api/diaries/${diaryId}/comments`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
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
  postComment: async (dateTime, content, diaryId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_ORIGIN}/api/diaries/${diaryId}/comments`,
        {
          method: "POST",
          body: JSON.stringify({ dateTime, content, diaryId }),
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
  deleteComment: async (diaryId, commentId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_ORIGIN}/api/diaries/${diaryId}/comments/${commentId}`,
        {
          method: "DELETE",
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
  clearComments: () => {
    set({ comments: null });
  },
}));
