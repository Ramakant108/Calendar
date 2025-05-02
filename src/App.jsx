import { Provider } from 'react-redux';
import store from './store/store';
import Calendar from './components/Calendar';
import NaveBar from './components/NaveBar';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <div className="sticky top-0 z-50">
          <NaveBar />
        </div>

        <div className="flex">
          <div className="sticky top-[64px] h-[calc(100vh-64px)]">
            <Sidebar />
          </div>
          
          <div className="flex-1 p-4">
            <Calendar />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
