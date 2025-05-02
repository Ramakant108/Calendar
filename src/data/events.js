const staticEvents = [
  {
    id: '1',
    title: 'Team Meeting',
    date: new Date().toISOString(),
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    color: '#4CAF50'
  },
  {
    id: '2',
    title: 'Project Review',
    date: new Date(Date.now() + 86400000).toISOString(),
    startTime: '14:00 AM',
    endTime: '15:00 AM',
    color: '#2196F3'
  }
];

export default staticEvents; 