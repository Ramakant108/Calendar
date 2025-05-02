import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { selectAllEvents } from '../store/eventsSlice';

const Sidebar = () => {
  const events = useSelector(selectAllEvents);

  const menuItems = [
    { name: 'Dashboard',icon: '📊', active: false },

    { name: 'Calendar',icon: '📅',active: true },
    { name: 'Tasks', icon: '✓', active:false },
    { name: 'Projects', icon: '📁',active: false },
    
    { name: 'Team', icon: '👥', active: false },
    
    { name: 'Career', icon: '🎯', active: false },
    { name: 'About', icon: 'ℹ️', active: false },
  ];

  const upcomingEvents = events.slice(0, 3);

  return (
    <div className="w-64 bg-white h-full shadow-md">
      <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        <div className="p-4">
          <div className="mb-6 pb-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold">
                RP
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Ram Patil</h3>
                <p className="text-sm text-gray-500">Admin</p>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xs font-semibold text-gray-500 uppercase mb-2">Menu</h2>
            <div className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-3 transition-colors ${item.active ? 'bg-green-50 text-green-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xs font-semibold text-gray-500 uppercase mb-2">Quick Stats</h2>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-600">Events</p>
                <p className="text-lg font-semibold text-blue-700">{events.length}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-xs text-green-600">Tasks</p>
                <p className="text-lg font-semibold text-green-700">12</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <button className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              <span className="text-lg">❓</span>
              Help & Support
            </button>
            <button className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              <span className="text-lg">⚙️</span>
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 