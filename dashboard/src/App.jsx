import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import DashboardView from './components/DashboardView';
import CustomersView from './components/CustomersView';
import CalendarView from './components/CalendarView';

export default function App() {
  const [activePanel, setActivePanel] = useState('dashboard');

  const renderActivePanel = () => {
    switch (activePanel) {
      case 'dashboard':
        return <DashboardView />;
      case 'customers':
        return <CustomersView />;
      case 'calendar':
        return <CalendarView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface antialiased">
      <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} />
      <div className="flex flex-col min-h-screen">
        <Topbar activePanel={activePanel} />
        <main className="ml-0 md:ml-[220px] flex-1">
          {renderActivePanel()}
        </main>
      </div>
    </div>
  );
}
