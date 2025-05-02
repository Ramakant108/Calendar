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
    deleteEvent: (state, action) => {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
  }
});

export const { addEvent, deleteEvent } = eventsSlice.actions;


export const selectAllEvents = (state) => {
  
  const staticEvents = fileEvent;
    const allEvents = [...state.events.events, ...staticEvents];
  
  return allEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
};

export default eventsSlice.reducer; 