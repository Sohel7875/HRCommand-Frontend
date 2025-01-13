import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./LeaveCalendar.module.css";
import axios from "../../api/axios";

const localizer = momentLocalizer(moment);

const LeaveCalendar = ({ selectedDate, setSelectedDate }) => {
  const [events, setEvents] = useState([
    {
      title: "1",
      start: new Date(2025, 0, 1),
      end: new Date(2025, 0, 1),
    },
    {
      title: "2",
      start: new Date(2025, 0, 5),
      end: new Date(2025, 0, 5),
    },
  ]);

  const CustomToolbar = ({ label, onNavigate }) => {
    return (
      <div className={styles.toolbar}>
        <button onClick={() => onNavigate("PREV")} className={styles.navButton}>
          Prev
        </button>
        <span className={styles.label}>{label}</span>
        <button onClick={() => onNavigate("NEXT")} className={styles.navButton}>
          Next
        </button>
      </div>
    );
  };

  const customDayPropGetter = (date) => {
    const isSelected =
      selectedDate &&
      moment(date).isSame(moment(selectedDate), "day");

    return {
      style: {
        backgroundColor: isSelected ? "#E5E5E5" : undefined,
        color: isSelected ? "#fff" : undefined,
        border: isSelected ? "2px solid #442487" : undefined,
        borderRadius: isSelected ? "0.2rem" : undefined,

      },
    };
  };

  const EventWrapper = ({ event }) => {
    return (
      <div
        style={{
          marginLeft: 'auto',
          backgroundColor: "#fff",
          color: "#4D007D",
          borderRadius: "50%",
          width: "24px",
          height: "24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "0.8rem",
          fontWeight: 900
        }}
      >
        {event.title}
      </div>
    );
  };

  const handleSelect = (slotInfo) => {
    setSelectedDate(slotInfo.start);
  };



  const getCalendarEvents = async () => {
    try {

      const res = await axios.get('/leave/getCalender')

      if(res?.status===200){
        setEvents(res?.data?.data)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCalendarEvents()
  }, [])


  return (
    <div className={styles.calendarWrapper}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month"]}
        components={{
          toolbar: CustomToolbar,
          event: EventWrapper,
        }}
        selectable
        onSelectSlot={handleSelect}
        onSelectEvent={handleSelect}
        dayPropGetter={customDayPropGetter}
        className={styles.calendar}
        popup={false}
        showAllEvents={false}
      />
    </div>
  );
};

export default LeaveCalendar;
