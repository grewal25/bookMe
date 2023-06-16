"use client";
import React, { useState } from "react";
interface ButtonStates {
  [key: number]: {
    booked: boolean;
    time: string;
  };
}
const Calendar = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [showTime, setShowTime] = useState(true);
  const [clickedDate, setClickedDate] = useState<string | null>(null);
  const [buttonStates, setButtonStates] = useState<ButtonStates>(() => {
    const initialState: ButtonStates = {};
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      initialState[day] = { booked: false, time: "8am - 8:30am" };
    }
    return initialState;
  });

  const addTime = (day: number) => {
    setShowTime(false);
    setClickedDate(`${day}/${currentMonth + 1}`);
  };

  const bookTime = () => {
    setButtonStates((prevButtonStates) => ({
      ...prevButtonStates,
      [parseInt(clickedDate || "")]: {
        ...prevButtonStates[parseInt(clickedDate || "")],
        booked: true,
      },
    }));
    alert("You are booked");
  };

  const reBookTime = () => {
    setButtonStates((prevButtonStates) => ({
      ...prevButtonStates,
      [parseInt(clickedDate || "")]: {
        ...prevButtonStates[parseInt(clickedDate || "")],
        booked: false,
      },
    }));
    alert("You are unbooked");
  };

  const resetEverything = () => {
    setButtonStates((prevButtonStates) => ({
      ...prevButtonStates,
      [parseInt(clickedDate || "")]: {
        ...prevButtonStates[parseInt(clickedDate || "")],
        booked: false,
      },
    }));
    alert("Resetting everything");
  };

  const renderDaysOfWeek = () => {
    return days.map((day) => (
      <div
        key={day}
        className="text-center text-gray-600 font-medium bg-red-200"
      >
        {day}
      </div>
    ));
  };

  const renderCalendarDays = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const calendarDays = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="text-center" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isBooked = buttonStates[day]?.booked || false;
      calendarDays.push(
        <button
          onClick={() => addTime(day)}
          key={day}
          className={`text-center border border-gray-200 p-2  ${
            isBooked ? "bg-pink-300" : "hover:bg-pink-300"
          }`}
          disabled={isBooked}
        >
          {day}
        </button>
      );
    }

    return calendarDays;
  };

  const goToPreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth === 0 ? 11 : prevMonth - 1;
      setCurrentYear((prevYear) => (prevMonth === 0 ? prevYear - 1 : prevYear));
      return newMonth;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth === 11 ? 0 : prevMonth + 1;
      setCurrentYear((prevYear) =>
        prevMonth === 11 ? prevYear + 1 : prevYear
      );
      return newMonth;
    });
  };

  const pickTime = (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl pt-10">
        <div className="card-body">
          <h2 className="card-title">Time: 8am - 8:30am</h2>
          <p>
            You want to book this time on {clickedDate} and month{" "}
            {currentMonth + 1}?
          </p>
          <div className="card-actions justify-end">
            <button
              onClick={bookTime}
              className="btn btn-primary"
              disabled={buttonStates[parseInt(clickedDate || "")]?.booked}
            >
              {buttonStates[parseInt(clickedDate || "")]?.booked
                ? "Booked"
                : "Book this time"}
            </button>
            <br />
            {buttonStates[parseInt(clickedDate || "")]?.booked && (
              <button
                onClick={reBookTime}
                className="btn btn-primary"
                disabled={!buttonStates[parseInt(clickedDate || "")]?.booked}
              >
                {buttonStates[parseInt(clickedDate || "")]?.booked
                  ? "Change to unbook?"
                  : "Book this time"}
              </button>
            )}
            {buttonStates[parseInt(clickedDate || "")]?.booked && (
              <button
                onClick={resetEverything}
                className="btn btn-primary"
                disabled={!buttonStates[parseInt(clickedDate || "")]?.booked}
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex justify-between mb-2">
        <button
          className="p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={goToPreviousMonth}
        >
          Previous
        </button>
        <div className="text-lg font-medium">{`${new Intl.DateTimeFormat(
          "en-US",
          {
            month: "long",
            year: "numeric",
          }
        ).format(new Date(currentYear, currentMonth))}`}</div>
        <button
          className="p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={goToNextMonth}
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {renderDaysOfWeek()}
        {renderCalendarDays()}
      </div>
      <div>{!showTime && <div>{pickTime}</div>}</div>
    </div>
  );
};

export default Calendar;
