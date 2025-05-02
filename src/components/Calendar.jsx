import { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, setYear, setMonth, isBefore, startOfDay } from 'date-fns';
import { generateArray } from '../helper/generateArr';
import EventModal from './EventModal';
import DayEventsShow from './DayEventShow';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent, selectAllEvents } from '../store/eventsSlice';
import { v4 as uuidv4 } from 'uuid';

const Calendar = () => {
  const dispatch = useDispatch();
  const events = useSelector(selectAllEvents);
  const [today, setToday] = useState(new Date());
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isDayEventsModalOpen, setIsDayEventsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const monthStartday = startOfMonth(today);
  const monthEndday = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStartday, end: monthEndday });

  const firstDayOfMonth = monthStartday.getDay();
  const paddingDays = Array(firstDayOfMonth).fill(null);

  const currentYear = new Date().getFullYear();
  const years = generateArray(currentYear);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const nextMonth = () => {
    setToday(addMonths(today, 1));
  };

  const prevMonth = () => {
    setToday(subMonths(today, 1));
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    setToday(setYear(today, newYear));
  };

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value);
    setToday(setMonth(today, newMonth));
  };

  const getEventsForDate = (date) => {
    return events.filter(event => isSameDay(new Date(event.date), date));
  };

  const handleDayClick = (day) => {
    setSelectedDate(day);
    setIsDayEventsModalOpen(true);
  };

  const handleAddEvent = (day) => {
    setSelectedDate(day);
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: uuidv4(),
      date: selectedDate.toISOString()
    };
    dispatch(addEvent(newEvent));
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-white rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-center py-2 sm:p-4 border-b">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button 
            onClick={prevMonth}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
          >
          &lt;
          </button>
          <div className="flex items-center gap-2 flex-1 sm:flex-none">
            <select 
              value={today.getFullYear()} 
              onChange={handleYearChange}
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <select 
              value={today.getMonth()} 
              onChange={handleMonthChange}
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
            >
              {months.map((month, index) => (
                <option key={month} value={index}>{month}</option>
              ))}
            </select>
          </div>
          <button 
            onClick={nextMonth}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Calendar Grid - Scrollable */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Day Headers - Fixed */}
        <div className="grid grid-cols-7 gap-1 px-2 py-1 bg-white">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-xs sm:text-sm font-semibold text-gray-600">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-7 gap-1 p-2">
            {paddingDays.map((_, index) => (
              <div
                key={`padding-${index}`}
                className="min-h-[60px] sm:min-h-[80px] p-1 sm:p-2 border border-gray-200 rounded bg-gray-50"
              />
            ))}
            {days.map((day, index) => {
              const dayEvents = getEventsForDate(day);
              return (
                <div
                  key={index}
                  onClick={() => handleDayClick(day)}
                  className={`min-h-[60px] sm:min-h-[80px] p-1 sm:p-2 border border-gray-200 rounded relative cursor-pointer hover:bg-gray-50 transition-colors ${
                    !isSameMonth(day, today) ? 'opacity-50' : ''
                  }`}
                  style={{borderTop: `${isToday(day) ? "4px solid blue" : ""}`}}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs sm:text-sm font-semibold">
                      {format(day, 'd')}
                    </span>
                    {!isBefore(startOfDay(day), startOfDay(new Date())) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddEvent(day);
                        }}
                        className="text-gray-500 hover:text-green-500 transition-colors text-xs sm:text-sm"
                      >
                        +
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col gap-0.5 sm:gap-1 mt-0.5 sm:mt-1">
                    {dayEvents.slice(0, 2).map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={`px-1 sm:px-2 py-0.5 sm:py-1 rounded text-black text-[10px] sm:text-xs truncate`}
                        style={{
                          borderLeft: `2px solid ${event.color}`,
                          backgroundColor: `${event.color}2A`
                        }}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-[10px] sm:text-xs text-gray-500 text-center">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        selectedDate={selectedDate}
        onSave={handleSaveEvent}
      />
      <DayEventsShow
        isOpen={isDayEventsModalOpen}
        onClose={() => setIsDayEventsModalOpen(false)}
        selectedDate={selectedDate}
        events={selectedDate ? getEventsForDate(selectedDate) : []}
        onCreateNew={() => {
          setIsDayEventsModalOpen(false);
          setIsEventModalOpen(true);
        }}
      />
    </div>
  );
};

export default Calendar; 