import { useState } from 'react';
import { format } from 'date-fns';

const EventModal = ({ isOpen, onClose, selectedDate, onSave, existingEvents = [] }) => {
  const [eventData, setEventData] = useState({
    title: '',
    startTime: '',
    endTime: '',
    color: '#4CAF50'
  });
  const [timeConflict, setTimeConflict] = useState(false);

  const colors = [
    { name: 'Green', value: '#4CAF50' },
    { name: 'Blue', value: '#2196F3' },
    { name: 'Purple', value: '#9C27B0' },
    { name: 'Orange', value: '#FF9800' },
    { name: 'Red', value: '#F44336' }
  ];

  const checkTimeConflict = (startTime, endTime) => {

    if (!startTime || !endTime) return false;

    const convertToMinutes = (time) => {

      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const newStartMinutes = convertToMinutes(startTime);
    const newEndMinutes =convertToMinutes(endTime);


    const formattedSelectedDate = format(selectedDate, 'yyyy-MM-dd');
    const sameDayEvents = existingEvents.filter(event => event.date === formattedSelectedDate);

    console.log('Selected Date:', formattedSelectedDate);

    console.log('Same Day Events:', sameDayEvents);

    console.log('New Event Time:', { startTime, endTime });

    return sameDayEvents.some(event => {
      const eventStartMinutes = convertToMinutes(event.startTime);
      const eventEndMinutes = convertToMinutes(event.endTime);



      console.log('Comparing with event:', {
        title: event.title,
        startTime: event.startTime,
        endTime: event.endTime,
        startMinutes: eventStartMinutes,
        endMinutes: eventEndMinutes
      });

      
      const hasConflict = (
        (newStartMinutes >= eventStartMinutes && newStartMinutes < eventEndMinutes) || (newEndMinutes > eventStartMinutes && newEndMinutes <= eventEndMinutes) ||(newStartMinutes <= eventStartMinutes && newEndMinutes >= eventEndMinutes) );

      if (hasConflict) {
        console.log('Conflict found with event:', event.title);
      }

      return hasConflict;
    });
  };

  const handleTimeChange = (field, value) => {
    const newEventData = { ...eventData, [field]: value };
    setEventData(newEventData);
    
    if (newEventData.startTime && newEventData.endTime) {
      const hasConflict = checkTimeConflict(newEventData.startTime, newEventData.endTime);
      setTimeConflict(hasConflict);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (timeConflict) return;
    
    onSave({
      ...eventData,
      date: format(selectedDate, 'yyyy-MM-dd')
    });
    setEventData({
      title: '',
      startTime: '',
      endTime: '',
      color: '#4CAF50'
    });
    setTimeConflict(false);
    onClose();
  };

  const handleClose = () => {
    setEventData({
      title: '',
      startTime: '',
      endTime: '',
      color: '#4CAF50'
    });
    setTimeConflict(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/95 rounded-lg p-6 w-full max-w-md shadow-2xl border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Add New Event</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={eventData.title}
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={eventData.startTime}
                onChange={(e) => handleTimeChange('startTime', e.target.value)}
                className={`w-full px-3 py-2 border ${timeConflict ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="time"
                value={eventData.endTime}
                onChange={(e) => handleTimeChange('endTime', e.target.value)}
                className={`w-full px-3 py-2 border ${timeConflict ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                required
              />
            </div>
          </div>
          {timeConflict && (
            <p className="text-red-500 text-sm mt-1">
              This time slot is full on {format(selectedDate, 'MMMM d, yyyy')}
            </p>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="flex gap-2">
              {colors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setEventData({ ...eventData, color: color.value })}
                  className={`w-8 h-8 rounded-full border-2 ${
                    eventData.color === color.value ? 'border-gray-800' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={timeConflict}
              className={`px-4 py-2 text-white rounded-md ${
                timeConflict 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal; 