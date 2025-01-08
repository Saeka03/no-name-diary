"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Calendar.module.scss";
import { useModalContext } from "../contexts/ModalContexts";
import { getDiaries } from "../api/diaryApi";
import { formatISODate } from "../utils/dateUtils";

type EventType = {
  title: string;
  date: string;
};

function Calendar() {
  const { openModalHandler } = useModalContext();
  const [diaries, setDiaries] = useState<DiaryType[]>([]);
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const data = await getDiaries();
        setDiaries(data.diaries);

        const newEvents = data.diaries.map((diary) => ({
          id: diary.id,
          title: diary.title,
          date: formatISODate(diary.dateTime),
        }));
        setEvents((prevEvents) => [...prevEvents, ...newEvents]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDiary();
  }, []);

  const clickEventHandler = (info) => {
    const eventId = info.event.id;
    const diaryState = diaries.find((diary) => diary.id == eventId);
    openModalHandler(new Date(), diaryState);
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
            // openModalHandler(info.date);
          });

          // Append it to the day cell
          const dayGridFrame = info.el.querySelector(".fc-daygrid-day-frame");
          if (dayGridFrame) {
            dayGridFrame.appendChild(plusButton);
          }
        }}
        events={events}
        eventClick={(info) => clickEventHandler(info)}
      />
    </div>
  );
}

export default Calendar;
