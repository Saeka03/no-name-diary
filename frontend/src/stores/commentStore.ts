import { create } from "zustand";
import { supabase } from "../lib/supabase";

interface CommentState {
  comments: CommentType[];
  fetchComments: (diaryId: number) => void;
  postComment: (
    dateTime: Date,
    content: string,
    diaryId: number
  ) => Promise<void>;
  deleteComment: (commentId: number) => Promise<void>;
  clearComments: () => void;
}

export const useCommentsStore = create<CommentState>()((set) => ({
  comments: [],
  fetchComments: async (diaryId) => {
    try {
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_FRONTEND_ORIGIN}/api/diaries/${diaryId}/comments`
      // );
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      // const data = await response.json();

      const { data, error } = await supabase
        .from("Comment")
        .select()
        .eq("diaryId", diaryId);
      if (error) console.log(error.message);

      set({
        comments: data.map((comment) => ({
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
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_FRONTEND_ORIGIN}/api/diaries/${diaryId}/comments`,
      //   {
      //     method: "POST",
      //     body: JSON.stringify({ dateTime, content, diaryId }),
      //   }
      // );
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      // const data = await response.json();
      // return data;

      const { error } = await supabase
        .from("Comment")
        .insert([{ dateTime, content, diaryId }])
        .select();
      if (error) console.log(error.message);
    } catch (error) {
      console.error(error);
    }
  },
  deleteComment: async (commentId) => {
    try {
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_FRONTEND_ORIGIN}/api/diaries/${diaryId}/comments/${commentId}`,
      //   {
      //     method: "DELETE",
      //   }
      // );
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      // const data = await response.json();
      // return data;

      const { error } = await supabase
        .from("Comment")
        .delete()
        .eq("id", commentId);
      if (error) console.log(error.message);
    } catch (error) {
      console.error(error);
    }
  },
  clearComments: () => {
    set({ comments: null });
  },
}));
