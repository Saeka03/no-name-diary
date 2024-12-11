"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Calendar.module.scss";

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
        events={[
          { title: "Event 1", date: "2024-12-01" },
          { title: "Event 2", date: "2024-12-05" },
        ]}
      />
    </div>
  );
}

export default Calendar;
