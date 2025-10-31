import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { cn } from '../../lib/utils';
import { format, addMonths, subMonths, isSameDay } from 'date-fns';

const Calendar = ({ initialDate = new Date(), onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(prevDate => subMonths(prevDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => addMonths(prevDate, 1));
  };

  const handleDateClick = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
    if (onDateSelect) {
      onDateSelect(newDate);
    }
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const prevMonthDays = month === 0 ? getDaysInMonth(year - 1, 11) : getDaysInMonth(year, month - 1);

    const days = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      days.push(
        <div
          key={`prev-${day}`}
          className="w-7 h-7 text-xs flex items-center justify-center text-muted-foreground opacity-50 rounded-full"
        >
          {day}
        </div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = isSameDay(selectedDate, date);
      const isToday = isSameDay(new Date(), date);

      days.push(
        <button
          key={`current-${day}`}
          className={cn(
            "w-7 h-7 text-xs rounded-full flex items-center justify-center transition-colors duration-200",
            isSelected
              ? "bg-black text-white"
              : isToday
              ? "bg-gray-300 text-black"
              : "bg-white text-black hover:bg-gray-100 focus:bg-gray-200"
          )}
          onClick={() => handleDateClick(day)}
          aria-selected={isSelected}
        >
          {day}
        </button>
      );
    }

    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    for (let day = 1; days.length < totalCells; day++) {
      days.push(
        <div
          key={`next-${day}`}
          className="w-7 h-7 text-xs flex items-center justify-center opacity-50 rounded-full"
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="w-full max-w-md p-1 bg-white rounded-lg shadow-sm">
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {format(selectedDate, 'PPP')}
          </span>
        </div>
      </header>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-md bg-white text-black hover:bg-gray-100"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="font-medium">
            {format(currentDate, 'MMMM yyyy')}
          </div>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-md bg-white text-black hover:bg-gray-100"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center">
          {daysOfWeek.map(day => (
            <div
              key={day}
              className="w-7 h-7 flex items-center justify-center text-gray-500 text-xs font-normal"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {renderCalendarDays()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
