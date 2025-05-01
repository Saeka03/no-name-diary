"use client";

import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Calendar.module.scss";
import { useModalContext } from "../contexts/ModalContext";
import { useDiariesStore } from "../stores/diaryStore";
import { useRouter } from "next/navigation";

function Calendar() {
  const { openModalHandler, diaryState } = useModalContext();
  const diaries = useDiariesStore((state) => state.diaries);
  const fetchDiaries = useDiariesStore((state) => state.fetchDiaries);
  const router = useRouter();

  useEffect(() => {
    fetchDiaries();
  }, []);

  const clickEventHandler = (info) => {
    const eventId = info.event.id;
    router.push(`/diary/${eventId}`);
  };

  return (
    <div className={styles.calendar}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={false}
        selectable={false}
        dayMaxEvents={3}
        headerToolbar={{
          start: "title",
          end: "prev  today next",
        }}
        dayCellDidMount={(info) => {
          // Create the "+" button
          const plusButton = document.createElement("div");
          plusButton.className = styles.plus;
          plusButton.textContent = "+";

          // Add click event listener to the button
          plusButton.addEventListener("click", () => {
            openModalHandler(info.date);
          });

          // Append it to the day cell
          const dayGridFrame = info.el.querySelector(".fc-daygrid-day-frame");
          if (dayGridFrame) {
            dayGridFrame.appendChild(plusButton);
          }
        }}
        events={diaries}
        eventClick={(info) => clickEventHandler(info)}
        displayEventTime={false}
        eventDisplay="block"
      />
    </div>
  );
}

export default Calendar;
