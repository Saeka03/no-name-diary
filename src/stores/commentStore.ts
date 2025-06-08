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
  connectComment: () => void;
}

export const useCommentsStore = create<CommentState>()((set, get) => ({
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
  connectComment: () => {
    const channel = supabase
      .channel("comment-db-changes")
      .on<RealTimeCommentType>(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Comment",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const comments = get().comments;
            const newComment = payload.new as RealTimeCommentType;

            set({
              comments: [
                ...comments,
                {
                  id: newComment?.id.toString(),
                  date: newComment.dateTime,
                  content: newComment.content,
                },
              ],
            });
          } else if (payload.eventType === "DELETE") {
            const comments = get().comments;
            const deletedComment = payload.old.id;

            const filteredDiaries = comments.filter((comment) => {
              return comment.id !== deletedComment.toString();
            });

            set({
              comments: filteredDiaries.map((comment) => ({
                id: comment.id.toString(),
                date: comment.date,
                content: comment.content,
              })),
            });
          }
        }
      )
      .subscribe();
  },
}));
