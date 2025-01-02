"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Calendar.module.scss";
import Modal from "./Modal";

function Calendar() {
  return (
    <div className={styles.calendar}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={false}
        selectable={false}
        dayMaxEvents={1}
        headerToolbar={{
          start: "title",
          end: "prev  today next",
        }}
        dayCellDidMount={(info) => {
          // Create the "+" button
          const plusButton = document.createElement("div");
          plusButton.className = styles.plus;
          plusButton.textContent = "+";

          // Append it to the day cell
          const dayGridFrame = info.el.querySelector(".fc-daygrid-day-frame");
          if (dayGridFrame) {
            dayGridFrame.appendChild(plusButton);
          }
        }}
        events={[
          { title: "Event 1", date: "2025-01-31" },
          { title: "Event 2", date: "2025-01-25" },
        ]}
      />
      <div className={styles.modal}>{/* <Modal /> */}</div>
    </div>
  );
}

export default Calendar;
