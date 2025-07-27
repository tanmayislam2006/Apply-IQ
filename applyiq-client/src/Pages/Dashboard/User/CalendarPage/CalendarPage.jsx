import React from "react";
import useAxios from './../../../../Hooks/useAxios';


const CalendarPage = () => {

  const axiosInstance=useAxios()
  const connectGoogleCalendar = async () => {
    const res = await axiosInstance.get("/api/google-calendar/auth");
    window.location.href = res.data.url;
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-primary">
        Google Calendar Integration
      </h2>
      <button
        className="btn btn-primary w-full"
        onClick={connectGoogleCalendar}
      >
        Connect Google Calendar
      </button>
    </div>
  );
};

export default CalendarPage;
