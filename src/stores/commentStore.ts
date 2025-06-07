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
