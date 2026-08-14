import React, { useEffect, useState } from 'react';
import { fetchCalendarMonth, fetchConversations, createAppointment } from '../api';

const SERVICES_OPTIONS = [
  { key: 'checkup', label: 'Checkup / Consultation (20 mins)' },
  { key: 'cleaning', label: 'Cleaning / Scaling (30 mins)' },
  { key: 'filling', label: 'Composite Filling (45 mins)' },
  { key: 'extraction', label: 'Tooth Extraction (45 mins)' },
  { key: 'root_canal', label: 'Root Canal Treatment (90 mins)' },
  { key: 'whitening', label: 'Laser Teeth Whitening (60 mins)' },
];

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDayEvents, setSelectedDayEvents] = useState(null);
  const [selectedDayStr, setSelectedDayStr] = useState('');

  // Add Event Modal
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [patientsList, setPatientsList] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [serviceKey, setServiceKey] = useState('checkup');
  const [eventDate, setEventDate] = useState(new Date().toISOString().substring(0, 10));
  const [eventTime, setEventTime] = useState('10:00');
  const [savingEvent, setSavingEvent] = useState(false);
  const [eventModalError, setEventModalError] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed
  const monthStr = `${year}-${String(month + 1).padStart(2, '0')}`;

  const loadCalendar = () => {
    setLoading(true);
    fetchCalendarMonth(monthStr)
      .then((data) => {
        setEvents(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load calendar events:", err);
        setEvents([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCalendar();
  }, [monthStr]);

  const openAddEventModal = () => {
    fetchConversations()
      .then((pts) => {
        setPatientsList(pts || []);
        if (pts && pts.length > 0) {
          setSelectedPatientId(pts[0].id);
        }
        setShowAddEventModal(true);
      })
      .catch(() => {
        setPatientsList([]);
        setShowAddEventModal(true);
      });
  };

  const handleAddEventSubmit = (e) => {
    e.preventDefault();
    if (!selectedPatientId) {
      setEventModalError("Please select a patient or add one first in Customers directory.");
      return;
    }
    setSavingEvent(true);
    setEventModalError(null);

    const startTimeIso = `${eventDate}T${eventTime}:00`;

    createAppointment(selectedPatientId, serviceKey, startTimeIso)
      .then(() => {
        setSavingEvent(false);
        setShowAddEventModal(false);
        loadCalendar();
      })
      .catch((err) => {
        console.error("Error creating appointment:", err);
        setEventModalError(err.message);
        setSavingEvent(false);
      });
  };

  const monthLabel = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDayEvents(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDayEvents(null);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDayEvents(null);
  };

  // Build Month Grid (Sun - Sat)
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startDayIdx = firstDayOfMonth.getDay(); // 0 = Sun
  const daysInMonth = lastDayOfMonth.getDate();

  const calendarDays = [];

  // Prev month padding days
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startDayIdx - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevMonthLastDay - i,
      monthType: 'prev',
      dateStr: '',
    });
  }

  // Current month days
  const todayIso = new Date().toISOString().substring(0, 10);
  for (let d = 1; d <= daysInMonth; d++) {
    const dStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    calendarDays.push({
      day: d,
      monthType: 'current',
      dateStr: dStr,
      isToday: dStr === todayIso,
    });
  }

  // Next month padding days
  const totalCells = Math.ceil(calendarDays.length / 7) * 7;
  const nextPadding = totalCells - calendarDays.length;
  for (let i = 1; i <= nextPadding; i++) {
    calendarDays.push({
      day: i,
      monthType: 'next',
      dateStr: '',
    });
  }

  // Group events by date (YYYY-MM-DD)
  const eventsByDate = {};
  events.forEach((evt) => {
    if (!eventsByDate[evt.date]) eventsByDate[evt.date] = [];
    eventsByDate[evt.date].push(evt);
  });

  const handleDayClick = (dayObj) => {
    if (dayObj.monthType !== 'current') return;
    const dayEvts = eventsByDate[dayObj.dateStr] || [];
    setSelectedDayStr(dayObj.dateStr);
    setSelectedDayEvents(dayEvts);
  };

  // Selected Day Label formatting
  const formatSelectedDayLabel = (dateStr) => {
    if (!dateStr) return 'Selected Day';
    try {
      const parts = dateStr.split('-');
      const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const activeDayList = selectedDayEvents || (selectedDayStr ? (eventsByDate[selectedDayStr] || []) : []);

  return (
    <div className="pt-8 px-8 pb-8 w-full">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
            {monthLabel}
          </h3>
          <div className="flex items-center gap-1 bg-surface-container-lowest border border-surface-variant rounded-lg p-1">
            <button
              onClick={prevMonth}
              className="p-1 hover:text-primary transition-colors cursor-pointer text-on-surface-variant flex items-center"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              onClick={goToToday}
              className="px-3 py-1 font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              Today
            </button>
            <button
              onClick={nextMonth}
              className="p-1 hover:text-primary transition-colors cursor-pointer text-on-surface-variant flex items-center"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        <button
          onClick={openAddEventModal}
          className="bg-primary text-on-primary font-body-sm px-4 py-2 rounded-lg hover:bg-primary-container transition-colors flex items-center gap-2 cursor-pointer font-medium shadow-sm"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          <span>Add Event</span>
        </button>
      </div>

      {/* Main Grid + Detail Side Panel Container */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Calendar Grid */}
        <div className="flex-1 bg-surface-container-lowest border border-[#DFEAE7] rounded-xl p-6 card-shadow">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-2 mb-4 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName) => (
              <div key={dayName} className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                {dayName}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((cell, idx) => {
              const dayEvts = cell.dateStr ? (eventsByDate[cell.dateStr] || []) : [];
              const count = dayEvts.length;
              const isSelected = selectedDayStr === cell.dateStr;

              return (
                <div
                  key={idx}
                  onClick={() => handleDayClick(cell)}
                  className={`h-24 p-2 border rounded-lg relative transition-all duration-150 cursor-pointer ${
                    cell.monthType !== 'current'
                      ? 'border-transparent text-on-surface-variant/30 pointer-events-none'
                      : isSelected
                      ? 'border-primary bg-primary/10 shadow-sm'
                      : cell.isToday
                      ? 'bg-secondary-container/30 border-primary/40 font-bold'
                      : 'border-surface-variant hover:border-primary/50 hover:bg-surface-container-low/50'
                  }`}
                >
                  <span className={`font-data-mono text-data-mono ${cell.isToday ? 'text-primary font-bold' : ''}`}>
                    {cell.day}
                  </span>

                  {count > 0 && (
                    <div className="absolute bottom-2 right-2 w-5 h-5 bg-primary text-on-primary rounded-full flex items-center justify-center font-label-caps text-[10px]">
                      {count}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Day Detail Panel */}
        <aside className="w-full lg:w-80 bg-surface-container-lowest border border-[#DFEAE7] rounded-xl p-6 card-shadow flex flex-col">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h4 className="font-patient-title text-patient-title text-on-surface font-semibold">
                {formatSelectedDayLabel(selectedDayStr || todayIso)}
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {activeDayList.length} Appointment{activeDayList.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {activeDayList.length === 0 ? (
              <div className="p-4 text-center text-on-surface-variant font-body-sm bg-surface-container-low/30 rounded-lg">
                No appointments scheduled for this date.
              </div>
            ) : (
              activeDayList.map((evt, idx) => (
                <div
                  key={evt.id || idx}
                  className="p-3.5 border-l-4 border-primary bg-surface-container-low/50 rounded-r-lg space-y-1.5"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-data-mono text-data-mono text-primary font-medium">
                      {evt.start_time || '09:00 AM'}
                    </span>
                    <span className="text-xs bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-medium">
                      {evt.service || evt.service_type || 'Dental Visit'}
                    </span>
                  </div>
                  <h5 className="font-body-sm text-body-sm font-semibold text-on-surface">
                    {evt.patient_name || 'Patient'}
                  </h5>
                  <p className="text-xs text-on-surface-variant">
                    Status: <span className="font-medium text-primary uppercase">{evt.status}</span>
                  </p>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>

      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest rounded-2xl border border-[#DFEAE7] card-shadow w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowAddEventModal(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <h4 className="font-patient-title text-patient-title text-on-surface font-semibold mb-1">
              Add Appointment Event
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
              Schedules visit in database & syncs with Google Calendar API
            </p>

            {eventModalError && (
              <div className="mb-4 p-3 bg-error-container text-on-error-container text-xs rounded-lg">
                {eventModalError}
              </div>
            )}

            <form onSubmit={handleAddEventSubmit} className="space-y-4">
              <div>
                <label className="block font-label-caps text-xs text-on-surface-variant mb-1 uppercase font-semibold">
                  Patient
                </label>
                {patientsList.length === 0 ? (
                  <p className="text-xs text-error">
                    No patients found in DB. Please add a patient in the Customers tab first.
                  </p>
                ) : (
                  <select
                    value={selectedPatientId}
                    onChange={(e) => setSelectedPatientId(e.target.value)}
                    className="w-full px-4 py-2.5 bg-surface-container-low border border-surface-variant rounded-lg font-body-sm text-on-surface focus:outline-none focus:border-primary"
                  >
                    {patientsList.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name || 'Unnamed'} ({p.phone_number})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="block font-label-caps text-xs text-on-surface-variant mb-1 uppercase font-semibold">
                  Service
                </label>
                <select
                  value={serviceKey}
                  onChange={(e) => setServiceKey(e.target.value)}
                  className="w-full px-4 py-2.5 bg-surface-container-low border border-surface-variant rounded-lg font-body-sm text-on-surface focus:outline-none focus:border-primary"
                >
                  {SERVICES_OPTIONS.map((opt) => (
                    <option key={opt.key} value={opt.key}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-label-caps text-xs text-on-surface-variant mb-1 uppercase font-semibold">
                    Date
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-container-low border border-surface-variant rounded-lg font-body-sm text-on-surface focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block font-label-caps text-xs text-on-surface-variant mb-1 uppercase font-semibold">
                    Time
                  </label>
                  <input
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-container-low border border-surface-variant rounded-lg font-body-sm text-on-surface focus:outline-none focus:border-primary font-data-mono"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddEventModal(false)}
                  className="px-4 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEvent || patientsList.length === 0}
                  className="px-5 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium hover:bg-primary-container transition-colors cursor-pointer disabled:opacity-50"
                >
                  {savingEvent ? "Scheduling..." : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
