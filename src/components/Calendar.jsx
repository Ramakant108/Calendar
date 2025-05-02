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
  console.log(monthStartday+"is monthStartday")
  const monthEndday = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStartday, end: monthEndday });

  const firstDayOfMonth = monthStartday.getDay();
  console.log(firstDayOfMonth)
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
    <div className="max-w-5xl w-5xl mx-auto p-5 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-5">
        <button 
          onClick={prevMonth}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          &lt;
        </button>
        <div className="flex items-center gap-4">
          <select 
            value={today.getFullYear()} 
            onChange={handleYearChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <select 
            value={today.getMonth()} 
            onChange={handleMonthChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {months.map((month, index) => (
              <option key={month} value={index}>{month}</option>
            ))}
          </select>
        </div>
        <button 
          onClick={nextMonth}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          &gt;
        </button>
      </div>
      <div className="flex flex-col">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 min-h-[600px]">
          {paddingDays.map((_, index) => (
            <div
              key={`padding-${index}`}
              className="min-h-[120px] p-2 border border-gray-200 rounded bg-gray-50"
            />
          ))}
          {days.map((day, index) => {

            const dayEvents = getEventsForDate(day);
            return (
              <div
                key={index}
                onClick={() => handleDayClick(day)}
                className={`min-h-[120px] p-2 border border-gray-200 rounded relative cursor-pointer hover:bg-gray-50 transition-colors  ${!isSameMonth(day, today) ? 'opacity-50' : ''}`}
                style={{borderTop:`${isToday(day)?"4px solid blue":""}`}}
              >

                <div className="flex justify-between items-start">
                  <span className="font-semibold">
                    {format(day, 'd')}
                  </span>
                  {!isBefore(startOfDay(day), startOfDay(new Date())) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddEvent(day);
                      }}
                      className="text-gray-500 hover:text-green-500 transition-colors text-sm"
                      
                    >
                      +
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-1 mt-1">
                  {dayEvents.slice(0, 2).map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className={`px-2 py-1 rounded text-black text-xs truncate`}
                      style={{
                        borderLeft: `2px solid ${event.color}`,
                        backgroundColor: `${event.color}2A`
                      }}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
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