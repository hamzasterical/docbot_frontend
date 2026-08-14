import React, { useEffect, useState } from 'react';
import { fetchDashboardSummary } from '../api';

export default function DashboardView() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardSummary()
      .then((data) => {
        setSummary(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load summary:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-8 max-w-7xl">
        <p className="text-on-surface-variant font-body-sm">Loading dashboard summary...</p>
      </div>
    );
  }

  // Fallback defaults if database is currently empty
  const data = summary || {
    appointments_today: 12,
    appointments_this_week: 84,
    revenue_this_week: 12450,
    cancellation_rate_this_week: 0.024,
    service_breakdown_this_week: [
      { service: "Cleaning / Scaling", count: 32 },
      { service: "Checkup / Consultation", count: 24 },
      { service: "Filling", count: 15 },
      { service: "Tooth Extraction", count: 5 },
      { service: "Root Canal", count: 4 },
      { service: "Teeth Whitening", count: 4 },
    ],
  };

  const formatCurrency = (val) => {
    return `Rs. ${val.toLocaleString()}`;
  };

  const cancellationPct = `${(data.cancellation_rate_this_week * 100).toFixed(1)}%`;
  const maxCount = Math.max(...data.service_breakdown_this_week.map((item) => item.count), 1);

  return (
    <div className="pt-8 px-8 pb-8 w-full">
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-error-container text-on-error-container text-sm">
          Warning: API unavailable, displaying demo data ({error})
        </div>
      )}

      {/* Bento Grid Layout for Stat Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Stat Card 1 */}
        <div className="bg-surface-container-lowest rounded-xl p-4 border border-[#DFEAE7] card-shadow flex flex-col items-center justify-center text-center h-40 relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <h3 className="font-display-lg text-display-lg text-on-surface relative z-10">
            {data.appointments_today}
          </h3>
          <div className="flex items-center gap-1 mt-2 mb-1 relative z-10">
            <span className="material-symbols-outlined text-primary text-sm">trending_up</span>
            <span className="font-data-mono text-data-mono text-primary">+2 FROM YESTERDAY</span>
          </div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase relative z-10">
            Appointments Today
          </p>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-surface-container-lowest rounded-xl p-4 border border-[#DFEAE7] card-shadow flex flex-col items-center justify-center text-center h-40 relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <h3 className="font-display-lg text-display-lg text-on-surface relative z-10">
            {data.appointments_this_week}
          </h3>
          <div className="flex items-center gap-1 mt-2 mb-1 relative z-10">
            <span className="material-symbols-outlined text-primary text-sm">trending_up</span>
            <span className="font-data-mono text-data-mono text-primary">+12% VS LAST WEEK</span>
          </div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase relative z-10">
            Appointments This Week
          </p>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-surface-container-lowest rounded-xl p-4 border border-[#DFEAE7] card-shadow flex flex-col items-center justify-center text-center h-40 relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <h3 className="font-display-lg text-display-lg text-on-surface relative z-10">
            {formatCurrency(data.revenue_this_week)}
          </h3>
          <div className="flex items-center gap-1 mt-2 mb-1 relative z-10">
            <span className="material-symbols-outlined text-primary text-sm">trending_up</span>
            <span className="font-data-mono text-data-mono text-primary">+5% VS LAST WEEK</span>
          </div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase relative z-10">
            Revenue This Week
          </p>
        </div>

        {/* Stat Card 4 */}
        <div className="bg-surface-container-lowest rounded-xl p-4 border border-[#DFEAE7] card-shadow flex flex-col items-center justify-center text-center h-40 relative overflow-hidden group">
          <div className="absolute inset-0 bg-error/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <h3 className="font-display-lg text-display-lg text-on-surface relative z-10">
            {cancellationPct}
          </h3>
          <div className="flex items-center gap-1 mt-2 mb-1 relative z-10">
            <span className="material-symbols-outlined text-error text-sm">trending_down</span>
            <span className="font-data-mono text-data-mono text-error">-0.5% VS LAST WEEK</span>
          </div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase relative z-10">
            Cancellation Rate
          </p>
        </div>
      </section>

      {/* Service Volume Chart Section */}
      <section className="bg-surface-container-lowest rounded-xl p-8 border border-[#DFEAE7] card-shadow">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="font-patient-title text-patient-title text-on-surface font-semibold">Service Volume</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Appointments by service type this week</p>
          </div>
          <button className="bg-secondary-container text-secondary font-label-caps text-label-caps uppercase px-4 py-2 rounded-lg hover:bg-secondary-fixed-dim transition-colors flex items-center gap-2 cursor-pointer">
            <span>Export</span>
            <span className="material-symbols-outlined text-sm">download</span>
          </button>
        </div>

        {/* Horizontal Bar Chart */}
        <div className="flex flex-col gap-4 mt-4">
          {data.service_breakdown_this_week.map((item, idx) => {
            const widthPct = Math.round((item.count / maxCount) * 100);
            return (
              <div key={idx} className="flex items-center w-full">
                <div className="w-44 flex-shrink-0 font-body-sm text-body-sm text-on-surface font-medium">
                  {item.service}
                </div>
                <div className="flex-grow flex items-center gap-3">
                  <div className="h-6 w-full bg-primary/10 rounded-full overflow-hidden relative">
                    <div
                      className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-700"
                      style={{ width: `${widthPct}%` }}
                    ></div>
                  </div>
                  <div className="w-10 flex-shrink-0 font-data-mono text-data-mono text-on-surface-variant text-right">
                    {item.count}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
