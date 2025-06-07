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
  connectDiary: () => void;
}

export const useDiariesStore = create<DiariesState>()((set, get) => ({
  diaries: [],
  diary: null,
  fetchDiaries: async () => {
    try {
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
          adminId: diary.admin_id,
        })),
      });
    } catch (error) {
      console.error(error);
    }
  },
  fetchDiary: async (id) => {
    try {
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
          adminId: data.admin_id,
        },
      });
    } catch (error) {
      console.error(error);
    }
  },
  postDiary: async (dateTime, title, content, adminId) => {
    try {
      const { error } = await supabase
        .from("Diary")
        .insert([
          {
            dateTime,
            title,
            content,
            admin_id: adminId,
            like: 0,
            laugh: 0,
            cry: 0,
          },
        ])
        .select();
      if (error) console.log(error.message);
    } catch (error) {
      console.error(error);
    }
  },
  deleteDiary: async (id) => {
    try {
      const { error } = await supabase.from("Diary").delete().eq("id", id);
      if (error) console.log(error.message);
    } catch (error) {
      console.error(error);
    }
  },
  editDiary: async (id, title, content) => {
    try {
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
  connectDiary: () => {
    const channel = supabase
      .channel("table-db-changes")
      .on<RealTimeDiaryType>(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Diary",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const diaries = get().diaries;
            const newDiary = payload.new as RealTimeDiaryType;

            set({
              diaries: [
                ...diaries,
                {
                  id: newDiary?.id.toString(),
                  title: newDiary.title,
                  date: newDiary.dateTime,
                  content: newDiary.content,
                  like: newDiary.like,
                  laugh: newDiary.laugh,
                  cry: newDiary.cry,
                  comment: newDiary.comment,
                  adminId: newDiary.adminId,
                },
              ],
            });
          } else if (payload.eventType === "DELETE") {
            const diaries = get().diaries;
            const deletedDiary = payload.old.id;

            const filteredDiaries = diaries.filter((diary) => {
              return diary.id !== deletedDiary.toString();
            });

            set({
              diaries: filteredDiaries.map((diary) => ({
                id: diary.id.toString(),
                title: diary.title,
                date: diary.date,
                content: diary.content,
                like: diary.like,
                laugh: diary.laugh,
                cry: diary.cry,
                comment: diary.comment,
                adminId: diary.adminId,
              })),
            });
          } else if (payload.eventType === "UPDATE") {
            const diaries = get().diaries;
            const existingDiary = get().diary;
            const newDiary = payload.new as RealTimeDiaryType;

            const updatedDiaries = diaries.map((diary) => {
              if (diary.id === newDiary.id.toString()) {
                return {
                  id: diary.id.toString(),
                  title: newDiary.title,
                  date: diary.date,
                  content: newDiary.content,
                  like: newDiary.like,
                  laugh: newDiary.laugh,
                  cry: newDiary.cry,
                  comment: diary.comment,
                  adminId: diary.adminId,
                };
              } else {
                return diary;
              }
            });

            set({
              diaries: updatedDiaries,
            });

            const updatedDiary = {
              id: existingDiary?.id,
              title: newDiary.title,
              date: existingDiary?.date,
              content: newDiary.content,
              like: newDiary.like,
              laugh: newDiary.laugh,
              cry: newDiary.cry,
              comment: existingDiary?.comment,
              adminId: existingDiary?.adminId,
            };

            set({
              diary: updatedDiary,
            });
          }
        }
      )
      .subscribe();
  },
}));
