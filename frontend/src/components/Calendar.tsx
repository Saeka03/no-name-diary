"use client";

import React, { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Calendar.module.scss";
import { useDiariesStore } from "../stores/diaryStore";
import { useRouter } from "next/navigation";

function Calendar({ isUser }: { isUser: boolean }) {
  const diaries = useDiariesStore((state) => state.diaries);
  const fetchDiaries = useDiariesStore((state) => state.fetchDiaries);
  const router = useRouter();
  const calendarRef = useRef(null);

  useEffect(() => {
    fetchDiaries();
  }, []);

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) return;

    // Force re-rendering by changing view twice
    const currentView = calendarApi.view.type;
    calendarApi.changeView("timeGridWeek");
    calendarApi.changeView(currentView);
  }, [isUser]);

  const clickEventHandler = (info) => {
    const eventId = info.event.id;
    router.push(`/diary/${eventId}`);
  };

  return (
    <div className={styles.calendar}>
      <FullCalendar
        ref={calendarRef}
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
          if (isUser) {
            // Create the "+" button
            const plusButton = document.createElement("div");
            plusButton.className = styles.plus;
            plusButton.textContent = "+";

            // Add click event listener to the button
            plusButton.addEventListener("click", () => {
              router.push(`/diary/new-diary?query=${info.date}`);
            });

            // Append it to the day cell
            const dayGridFrame = info.el.querySelector(".fc-daygrid-day-frame");
            if (dayGridFrame) {
              dayGridFrame.appendChild(plusButton);
            }
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
