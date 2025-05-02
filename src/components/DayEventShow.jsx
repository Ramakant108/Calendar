import { useDispatch } from 'react-redux';
import { deleteEvent } from '../store/eventsSlice';
import { format } from 'date-fns';

const DayEventsShow = ({ isOpen, onClose, selectedDate, events, onCreateNew }) => {
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleDelete = (eventId) => {
    dispatch(deleteEvent(eventId));
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Events for {format(selectedDate, 'MMMM d, yyyy')}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No events for this day</p>
            <button
              onClick={onCreateNew}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Create New Event
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                style={{ borderLeft: `4px solid ${event.color}` }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{event.title}</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Time: {event.startTime} - {event.endTime}</p>
                      {/* <p>Created: {format(new Date(event.date), 'MMM d, yyyy h:mm a')}</p> */}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Delete event"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={onCreateNew}
              className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Add Another Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DayEventsShow; 