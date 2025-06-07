"use client";

import React, { Suspense, useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import DiaryInput from "../../../../components/DiaryInput";
import { formatDate } from "../../../../utils/dateUtils";
import { createClient } from "../../../../utils/supabase/client";

function NewDiary() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const date = searchParams.get("query");
  const [adminId, setAdminId] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const fetchSupabase = async () => {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        setAdminId(null);
      } else {
        setAdminId(data?.user.id);
      }
    };

    fetchSupabase();
  }, []);

  const handleClose = () => {
    router.back();
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className={styles.modalWrapper} onClick={handleClose}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modal}>
          <div className={styles.header}>
            <p>{formatDate(new Date(date))}</p>
            <div className={styles.buttons}>
              <button className={styles.closeButton} onClick={handleClose}>
                ×
              </button>
            </div>
          </div>
          <div className={styles.line}></div>
          <DiaryInput
            date={new Date(date)}
            handleClose={handleClose}
            adminId={adminId}
          />
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>loadConfig...</div>}>
      <NewDiary />
    </Suspense>
  );
}
