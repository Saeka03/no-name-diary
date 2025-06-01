import { create } from "zustand";
import { supabase } from "../lib/supabase";

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
    adminId: string;
  }[];
  diary: {
    id: string;
    date: Date;
    title: string;
    content: string;
    like: number;
    laugh: number;
    cry: number;
    comment: CommentType[];
    adminId: string;
  } | null;
  fetchDiaries: () => Promise<void>;
  fetchDiary: (id: string) => Promise<void>;
  postDiary: (
    dateTime: Date,
    title: string,
    content: string,
    adminId: string
  ) => Promise<void>;
  deleteDiary: (id: string) => Promise<void>;
  editDiary: (id, title, content) => Promise<void>;
  incrementReaction: (id, type) => Promise<void>;
  clearDiary: () => void;
}

export const useDiariesStore = create<DiariesState>()((set) => ({
  diaries: [],
  diary: null,
  fetchDiaries: async () => {
    try {
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_FRONTEND_ORIGIN}/api/diaries`
      // );
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      // const data = await response.json();

      const { data, error } = await supabase.from("Diary").select("*");
      if (error) console.log(error.message);

      set({
        diaries: data.map((diary) => ({
          id: diary.id.toString(),
          title: diary.title,
          date: diary.dateTime,
          content: diary.content,
          like: diary.like,
          laugh: diary.laugh,
          cry: diary.cry,
          comment: diary.comment,
          adminId: diary.adminId,
        })),
      });
    } catch (error) {
      console.error(error);
    }
  },
  fetchDiary: async (id) => {
    try {
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_FRONTEND_ORIGIN}/api/diaries/${id}`
      // );
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      // const data = await response.json();

      const { data, error } = await supabase
        .from("Diary")
        .select()
        .eq("id", id)
        .single();
      if (error) console.log(error.message);

      set({
        diary: {
          id: data.id.toString(),
          title: data.title,
          date: data.dateTime,
          content: data.content,
          like: data.like,
          laugh: data.laugh,
          cry: data.cry,
          comment: data.comment,
          adminId: data.adminId,
        },
      });
    } catch (error) {
      console.error(error);
    }
  },
  postDiary: async (dateTime, title, content, adminId) => {
    try {
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_FRONTEND_ORIGIN}/api/diaries`,
      //   {
      //     method: "POST",
      //     body: JSON.stringify({ dateTime, title, content, adminId }),
      //   }
      // );
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      // const data = await response.json();
      // return data;

      const { error } = await supabase
        .from("Diary")
        .insert([
          { dateTime, title, content, adminId, like: 0, laugh: 0, cry: 0 },
        ])
        .select();
      if (error) console.log(error.message);
    } catch (error) {
      console.error(error);
    }
  },
  deleteDiary: async (id) => {
    try {
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_FRONTEND_ORIGIN}/api/diaries/${id}`,
      //   {
      //     method: "DELETE",
      //   }
      // );
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      // const data = await response.json();
      // return data;

      const { error } = await supabase.from("Diary").delete().eq("id", id);
      if (error) console.log(error.message);
    } catch (error) {
      console.error(error);
    }
  },
  editDiary: async (id, title, content) => {
    try {
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_FRONTEND_ORIGIN}/api/diaries/${id}`,
      //   {
      //     method: "PUT",
      //     body: JSON.stringify({ title, content }),
      //   }
      // );
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      // const data = await response.json();
      // return data;

      const { error } = await supabase
        .from("Diary")
        .update({ title, content })
        .eq("id", id)
        .select();
      if (error) console.log(error.message);
    } catch (error) {
      console.error(error);
    }
  },
  incrementReaction: async (id, type) => {
    try {
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_FRONTEND_ORIGIN}/api/diaries/${id}`,
      //   {
      //     method: "PATCH",
      //     body: JSON.stringify({ type }),
      //   }
      // );
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      // const data = await response.json();
      // return data;
      if (type === "like") {
        const { error } = await supabase.rpc("increment", {
          x: 1,
          row_id: id,
          column_name: "like",
        });
        if (error) console.log(error.message);
      } else if (type === "laugh") {
        const { error } = await supabase.rpc("increment", {
          x: 1,
          row_id: id,
          column_name: "laugh",
        });
        if (error) console.log(error.message);
      } else if (type === "cry") {
        const { error } = await supabase.rpc("increment", {
          x: 1,
          row_id: id,
          column_name: "cry",
        });
        if (error) console.log(error.message);
      }
    } catch (error) {
      console.error(error);
    }
  },
  clearDiary: () => {
    set({ diary: null });
  },
}));
