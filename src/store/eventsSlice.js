import { createSlice } from '@reduxjs/toolkit';
import staticEvents from "../data/events"

const initialState = {
  events: [],
  status: 'idle',
  error: null
};
const fileEvent=staticEvents;
export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action) => {
      const index = state.events.findIndex(event => event.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    }
  }
});

export const { addEvent, updateEvent, deleteEvent, setEvents } = eventsSlice.actions;

// Selector to combine Redux events with static events
export const selectAllEvents = (state) => {
  // Import static events data
  const staticEvents = fileEvent;
  
  // Combine Redux events with static events
  const allEvents = [...state.events.events, ...staticEvents];
  
  // Sort events by date
  return allEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
};

export default eventsSlice.reducer; 