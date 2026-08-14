import React from 'react';

export default function Topbar({ activePanel }) {
  const panelTitles = {
    dashboard: 'Dashboard',
    customers: 'Customers',
    calendar: 'Calendar',
  };

  const formattedDate = `Today, ${new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })}`;

  return (
    <header className="bg-background h-[64px] ml-0 md:ml-[220px] w-full md:w-[calc(100%-220px)] sticky top-0 flex justify-between items-center px-8 z-10 border-b border-surface-variant/30">
      <div className="flex items-center">
        <h2 className="font-headline-md text-headline-md text-primary font-bold tracking-tight">
          {panelTitles[activePanel] || 'Dashboard'}
        </h2>
        <span className="ml-4 font-body-sm text-body-sm text-on-surface-variant hidden sm:inline-block">
          {formattedDate}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-1">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-1">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm border border-outline-variant cursor-pointer">
          <span className="material-symbols-outlined text-lg">medical_services</span>
        </div>
      </div>
    </header>
  );
}
