"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import Header from "../components/Header";
import Calendar from "../components/Calendar";
import Modal from "../components/Modal";
import { createClient } from "../utils/supabase/client";
import { useDiariesStore } from "../stores/diaryStore";
import { useCommentsStore } from "../stores/commentStore";

function Page() {
  const [isUser, setIsUser] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);
  const connectDiary = useDiariesStore((state) => state.connectDiary);
  const connectComment = useCommentsStore((state) => state.connectComment);

  useEffect(() => {
    setIsMounted(true);

    const fetchSupabase = async () => {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        setIsUser(false);
      } else {
        setIsUser(true);
      }
    };
    fetchSupabase();
  }, []);

  useEffect(() => {
    connectDiary();
    connectComment();
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className={styles.page}>
      <Header isUser={isUser} />
      <Calendar isUser={isUser} />
      <Modal />
    </div>
  );
}

export default Page;
