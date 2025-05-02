import { Provider } from 'react-redux';
import store from './store/store';
import Calendar from './components/Calendar';
import NaveBar from './components/NaveBar';
import Sidebar from './components/Sidebar';
import { useState } from 'react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <div className="sticky top-0 z-50">
          <NaveBar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        </div>

        <div className="flex">
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
          
          <div className={`fixed lg:static top-[64px] h-[calc(100vh-64px)] z-40 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}>
            <Sidebar />
          </div>
          
          
          <div className="flex-1 p-1 w-full">
            <Calendar />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
