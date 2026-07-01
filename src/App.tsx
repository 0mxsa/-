import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Layout/Sidebar';
import LifeMap from './components/Map/LifeMap';
import DailyDashboard from './components/Dashboard/DailyDashboard';
import TimelineView from './components/Timeline/TimelineView';
import { AIAssistantWidget } from './components/AI/AIAssistantWidget';

function App() {
  return (
    <Router>
      <div className="flex h-screen w-full bg-dark-900 overflow-hidden font-cairo" dir="rtl">
        <Sidebar />
        <main className="flex-1 relative h-full">
          <Routes>
            <Route path="/" element={<LifeMap />} />
            <Route path="/dashboard" element={<DailyDashboard />} />
            <Route path="/timeline" element={<TimelineView />} />
          </Routes>
          <AIAssistantWidget />
        </main>
      </div>
    </Router>
  );
}

export default App;
