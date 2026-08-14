import React from 'react';

export default function Sidebar({ activePanel, setActivePanel }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'customers', label: 'Customers', icon: 'group' },
    { id: 'calendar', label: 'Calendar', icon: 'calendar_month' },
  ];

  return (
    <nav className="bg-background w-[220px] h-screen fixed left-0 top-0 hidden md:flex flex-col py-6 px-4 z-20 border-r border-[#e8e6e5]">
      {/* Brand Header */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm">
          <span className="material-symbols-outlined text-xl" data-weight="fill">dentistry</span>
        </div>
        <div>
          <h1 className="font-headline-md text-headline-md font-bold text-primary tracking-tight">DocBot</h1>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">BrightSmile</p>
        </div>
      </div>

      {/* Nav List */}
      <ul className="flex flex-col gap-1.5 w-full mt-2">
        {navItems.map((item) => {
          const isActive = activePanel === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => setActivePanel(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-full transition-all duration-150 text-left cursor-pointer font-medium text-sm ${
                  isActive
                    ? 'bg-[#1c1917] text-white shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high/60 hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                <span className="font-body-main">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
