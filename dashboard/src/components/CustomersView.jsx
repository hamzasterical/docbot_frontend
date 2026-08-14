import React, { useEffect, useState } from 'react';
import { fetchConversations, createCustomer, createAppointment } from '../api';
import CustomerChatPanel from './CustomerChatPanel';

const SERVICES_OPTIONS = [
  { key: 'checkup', label: 'Checkup / Consultation (20 mins)' },
  { key: 'cleaning', label: 'Cleaning / Scaling (30 mins)' },
  { key: 'filling', label: 'Composite Filling (45 mins)' },
  { key: 'extraction', label: 'Tooth Extraction (45 mins)' },
  { key: 'root_canal', label: 'Root Canal Treatment (90 mins)' },
  { key: 'whitening', label: 'Laser Teeth Whitening (60 mins)' },
];

export default function CustomersView() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Add Customer inline form / modal state
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [savingCustomer, setSavingCustomer] = useState(false);
  const [addCustomerError, setAddCustomerError] = useState(null);

  // Booking modal state
  const [bookingPatient, setBookingPatient] = useState(null);
  const [serviceKey, setServiceKey] = useState('checkup');
  const [bookingDate, setBookingDate] = useState(new Date().toISOString().substring(0, 10));
  const [bookingTime, setBookingTime] = useState('10:00');
  const [savingBooking, setSavingBooking] = useState(false);
  const [bookingModalError, setBookingModalError] = useState(null);

  const loadConversations = () => {
    setLoading(true);
    fetchConversations()
      .then((data) => {
        setConversations(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load conversations:", err);
        setError(err.message);
        setConversations([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadConversations();
  }, []);

  const handleAddCustomerSubmit = (e) => {
    e.preventDefault();
    if (!custPhone.trim()) {
      setAddCustomerError("Phone number is required.");
      return;
    }
    setSavingCustomer(true);
    setAddCustomerError(null);

    createCustomer(custPhone.trim(), custName.trim() || null)
      .then(() => {
        setSavingCustomer(false);
        setShowAddCustomer(false);
        setCustName('');
        setCustPhone('');
        loadConversations();
      })
      .catch((err) => {
        console.error("Error creating customer:", err);
        setAddCustomerError(err.message);
        setSavingCustomer(false);
      });
  };

  const handleCreateAppointmentSubmit = (e) => {
    e.preventDefault();
    if (!bookingPatient) return;
    setSavingBooking(true);
    setBookingModalError(null);

    const startTimeIso = `${bookingDate}T${bookingTime}:00`;

    createAppointment(bookingPatient.id, serviceKey, startTimeIso)
      .then(() => {
        setSavingBooking(false);
        setBookingPatient(null);
        alert(`Successfully booked ${serviceKey} for ${bookingPatient.name || 'Customer'} on ${bookingDate} at ${bookingTime}!`);
        loadConversations();
      })
      .catch((err) => {
        console.error("Error creating appointment:", err);
        setBookingModalError(err.message);
        setSavingBooking(false);
      });
  };

  const formatLastActive = (ts) => {
    if (!ts) return 'Never';
    try {
      const date = new Date(ts);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 60) return `${Math.max(1, diffMins)} mins ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours} hrs ago`;
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return ts;
    }
  };

  const getInitials = (name) => {
    if (!name) return 'C';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const filteredRows = conversations.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      (item.name && item.name.toLowerCase().includes(q)) ||
      (item.phone_number && item.phone_number.toLowerCase().includes(q))
    );
  });

  return (
    <div className="pt-8 px-8 pb-8 w-full">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="font-patient-title text-patient-title text-on-surface font-semibold">Customers Directory</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Customer management, appointment scheduling, and message history
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
              search
            </span>
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-surface-container-lowest border border-surface-variant rounded-lg font-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Cyan Pill Add Customer Button */}
          <button
            onClick={() => setShowAddCustomer(!showAddCustomer)}
            className="bg-secondary-container text-on-secondary-container hover:bg-primary/20 transition-colors font-body-sm px-4 py-2 rounded-full cursor-pointer font-medium shadow-sm flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-lg">person_add</span>
            <span>+ Add Customer</span>
          </button>
        </div>
      </div>

      {/* Inline Form to Add Customer */}
      {showAddCustomer && (
        <div className="mb-6 p-5 bg-surface-container-lowest border border-[#DFEAE7] rounded-xl card-shadow">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-patient-title text-patient-title text-on-surface font-semibold">
              Add New Customer
            </h4>
            <button
              onClick={() => setShowAddCustomer(false)}
              className="text-on-surface-variant hover:text-on-surface cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {addCustomerError && (
            <div className="mb-4 p-3 bg-error-container text-on-error-container text-xs rounded-lg">
              {addCustomerError}
            </div>
          )}

          <form onSubmit={handleAddCustomerSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block font-label-caps text-xs text-on-surface-variant mb-1 uppercase font-semibold">
                Phone Number *
              </label>
              <input
                type="text"
                placeholder="e.g. 923470712288"
                value={custPhone}
                onChange={(e) => setCustPhone(e.target.value)}
                className="w-full px-4 py-2 bg-surface-container-low border border-surface-variant rounded-lg font-body-sm text-on-surface font-data-mono focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block font-label-caps text-xs text-on-surface-variant mb-1 uppercase font-semibold">
                Full Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Sarah Jenkins"
                value={custName}
                onChange={(e) => setCustName(e.target.value)}
                className="w-full px-4 py-2 bg-surface-container-low border border-surface-variant rounded-lg font-body-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={savingCustomer}
                className="px-5 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium hover:bg-primary-container transition-colors cursor-pointer disabled:opacity-50"
              >
                {savingCustomer ? "Saving..." : "Save Customer"}
              </button>
              <button
                type="button"
                onClick={() => setShowAddCustomer(false)}
                className="px-4 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg text-sm cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-error-container text-on-error-container text-sm rounded-lg">
          Error loading customer directory: {error}
        </div>
      )}

      {/* Main Content Area: Table + Optional Side Chat Panel */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Customer Table */}
        <div className="flex-1 bg-surface-container-lowest rounded-xl card-shadow border border-[#DFEAE7] overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap border-collapse">
              <thead>
                <tr className="border-b border-surface-variant/40 bg-surface-container-low/40">
                  <th className="font-label-caps text-label-caps text-primary px-6 py-4 font-semibold uppercase tracking-wider">
                    Name
                  </th>
                  <th className="font-label-caps text-label-caps text-primary px-6 py-4 font-semibold uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="font-label-caps text-label-caps text-primary px-6 py-4 font-semibold uppercase tracking-wider text-right">
                    Messages
                  </th>
                  <th className="font-label-caps text-label-caps text-primary px-6 py-4 font-semibold uppercase tracking-wider text-right">
                    Last Active
                  </th>
                  <th className="font-label-caps text-label-caps text-primary px-6 py-4 font-semibold uppercase tracking-wider text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-variant/30 text-on-surface">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-on-surface-variant">
                      Loading customer directory...
                    </td>
                  </tr>
                ) : conversations.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-on-surface-variant font-body-sm">
                      No customer records found. Click <strong>+ Add Customer</strong> above to create one.
                    </td>
                  </tr>
                ) : filteredRows.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-on-surface-variant">
                      No customers matching "{searchQuery}"
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((conv) => {
                    const isSelected = selectedPatient && selectedPatient.id === conv.id;
                    return (
                      <tr
                        key={conv.id}
                        onClick={() => setSelectedPatient(conv)}
                        className={`transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-primary/10 font-medium'
                            : 'hover:bg-surface-container-low/50'
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary-container/10 flex items-center justify-center text-primary font-patient-title text-sm font-semibold">
                              {getInitials(conv.name)}
                            </div>
                            <span className="font-patient-title text-patient-title text-on-surface font-semibold">
                              {conv.name || 'Unnamed Customer'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-data-mono text-data-mono text-on-surface-variant">
                          {conv.phone_number}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface text-xs font-medium">
                            {conv.message_count}{' '}
                            <span className="text-on-surface-variant/70 font-normal">msgs</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-body-sm text-body-sm text-on-surface-variant">
                          {formatLastActive(conv.last_message_at)}
                        </td>
                        <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setBookingPatient(conv)}
                              className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-lg text-xs font-medium hover:bg-primary/20 transition-colors cursor-pointer flex items-center gap-1"
                              title="Manually book an appointment"
                            >
                              <span className="material-symbols-outlined text-sm">calendar_add_on</span>
                              <span>Book Visit</span>
                            </button>

                            <button
                              onClick={() => setSelectedPatient(conv)}
                              className="text-outline hover:text-primary transition-colors cursor-pointer p-1"
                              title="View Messages"
                            >
                              <span className="material-symbols-outlined text-lg">chat</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inline Customer Chat Panel (Side-by-side when patient is selected) */}
        {selectedPatient && (
          <CustomerChatPanel
            patient={selectedPatient}
            onClose={() => setSelectedPatient(null)}
          />
        )}
      </div>

      {/* Book Appointment Modal */}
      {bookingPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest rounded-2xl border border-[#DFEAE7] card-shadow w-full max-w-md p-6 relative">
            <button
              onClick={() => setBookingPatient(null)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <h4 className="font-patient-title text-patient-title text-on-surface font-semibold mb-1">
              Book Visit
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
              Manual appointment booking for <strong>{bookingPatient.name || bookingPatient.phone_number}</strong>
            </p>

            {bookingModalError && (
              <div className="mb-4 p-3 bg-error-container text-on-error-container text-xs rounded-lg">
                {bookingModalError}
              </div>
            )}

            <form onSubmit={handleCreateAppointmentSubmit} className="space-y-4">
              <div>
                <label className="block font-label-caps text-xs text-on-surface-variant mb-1 uppercase font-semibold">
                  Dental Service
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
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-container-low border border-surface-variant rounded-lg font-body-sm text-on-surface focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block font-label-caps text-xs text-on-surface-variant mb-1 uppercase font-semibold">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-container-low border border-surface-variant rounded-lg font-body-sm text-on-surface focus:outline-none focus:border-primary font-data-mono"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setBookingPatient(null)}
                  className="px-4 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingBooking}
                  className="px-5 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium hover:bg-primary-container transition-colors cursor-pointer disabled:opacity-50"
                >
                  {savingBooking ? "Scheduling..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
