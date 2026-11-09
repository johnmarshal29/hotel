import React, { useState, useContext } from "react";
import { AppContext } from "../AppContext";
import { Link } from "react-router-dom";

export default function AdminPortalPage() {
  const { rooms, guests, requests, updateGuestStatus, completeRequest } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Dynamic Metrics
  const totalGuestsInHotel = guests.filter(g => g.status === "Checked In").length;
  const reservedRoomsCount = rooms.filter(r => r.status === "Reserved").length;
  const totalRoomsCount = rooms.length;
  const occupancyRate = ((reservedRoomsCount / totalRoomsCount) * 100).toFixed(1);
  const pendingRequestsCount = requests.length;

  // Search & Filter Guest list
  const filteredGuests = guests.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.room.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = statusFilter === "All" || g.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-background min-h-screen text-on-surface flex pt-16">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex w-64 bg-surface-container-low border-r border-outline-variant flex-col py-6 sticky top-16 h-[calc(100vh-64px)] z-40">
        <div className="px-6 py-4 border-b border-outline-variant/40">
          <h2 className="font-serif text-lg text-primary font-bold">Admin Portal</h2>
          <p className="font-sans text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider opacity-70">
            Staff Access Only
          </p>
        </div>
        <div className="mt-6 flex-1 overflow-y-auto custom-scrollbar">
          <nav className="space-y-1">
            <a className="flex items-center text-primary border-l-4 border-secondary bg-surface-container-high pl-5 py-3.5 font-sans text-xs font-bold uppercase tracking-wider" href="#overview">
              <span className="material-symbols-outlined mr-3 text-[20px]">dashboard</span>
              Overview
            </a>
            <Link to="/explorer" className="flex items-center text-on-surface-variant pl-5 py-3.5 hover:bg-surface-variant transition-colors font-sans text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined mr-3 text-[20px]">floor_lamp</span>
              Live Floor Map
            </Link>
            <Link to="/" className="flex items-center text-on-surface-variant pl-5 py-3.5 hover:bg-surface-variant transition-colors font-sans text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined mr-3 text-[20px]">bed</span>
              Guest Booking
            </Link>
            <a className="flex items-center text-on-surface-variant pl-5 py-3.5 hover:bg-surface-variant transition-colors font-sans text-xs font-bold uppercase tracking-wider" href="#guests">
              <span className="material-symbols-outlined mr-3 text-[20px]">group</span>
              Guest Ledger
            </a>
          </nav>
        </div>
        <div className="px-6 py-4">
          <Link to="/" className="w-full block text-center bg-primary text-on-primary font-sans text-xs font-bold uppercase tracking-widest py-4 hover:opacity-90 active:scale-95 transition-all">
            New Booking
          </Link>
        </div>
        <div className="border-t border-outline-variant/60 pt-4 pb-2">
          <a className="flex items-center text-on-surface-variant pl-6 py-2.5 hover:text-secondary transition-colors font-sans text-[11px] font-semibold uppercase tracking-wider" href="#">
            <span className="material-symbols-outlined mr-3 text-[18px]">help</span>
            Help Desk
          </a>
          <a className="flex items-center text-on-surface-variant pl-6 py-2.5 hover:text-secondary transition-colors font-sans text-[11px] font-semibold uppercase tracking-wider" href="#">
            <span className="material-symbols-outlined mr-3 text-[18px]">logout</span>
            Logout
          </a>
        </div>
      </aside>

      {/* Main Content Dashboard */}
      <main className="flex-1 min-h-screen px-8 md:px-12 py-10 overflow-y-auto">
        {/* Top Header */}
        <header className="flex justify-between items-center mb-10 pb-6 border-b border-outline-variant/60">
          <div>
            <h2 className="font-serif text-3xl text-primary font-semibold">Dashboard Overview</h2>
            <p className="font-sans text-xs text-on-surface-variant mt-1">Wednesday, 22 May 2024</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="font-sans text-xs font-bold text-primary">Alexander Vance</p>
              <p className="font-sans text-[10px] text-on-surface-variant font-medium">Concierge Lead</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant">
              <img
                className="w-full h-full object-cover"
                alt="Alexander Vance headshot"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBixgOAj6BoLloCtgUu5GLpVHyzNoaU_QBSwA2gL_joeOzVeBXg6DIQtjDMNimEKX3qfOCC1RGoEcNISD-Tqrua073FKcLeVe1SethdobB1nW1e7kN2EZf8kXwQrot0nMOYiGf2_kSkLSdfIgWOv37DzgCxGK1mKlDei2cLHQW1Icd6Ya0-5BhqYoqcoiqfjpXLVUjatbeBYlzoILuIHkPv09aGD-T4B94xvWr1VW1ET6gBw9OVL96JbejMb06bfY-yv9Z53qbonG4"
              />
            </div>
          </div>
        </header>

        {/* Key Metrics Bento Grid */}
        <div id="overview" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Metric 1 */}
          <div className="bg-surface-container-low p-8 border border-outline-variant hover-lift group relative overflow-hidden rounded-sm">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-7xl">group</span>
            </div>
            <p className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">
              Guests Checked-In
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="font-serif text-5xl text-primary font-medium">{totalGuestsInHotel}</h3>
              <span className="text-secondary font-sans text-xs font-semibold">Active stays</span>
            </div>
            <div className="mt-4 h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${(totalGuestsInHotel / guests.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-surface-container-low p-8 border border-outline-variant hover-lift group relative overflow-hidden rounded-sm">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-7xl">bed</span>
            </div>
            <p className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">
              Occupancy Rate
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="font-serif text-5xl text-primary font-medium">{occupancyRate}%</h3>
              <span className="text-secondary font-sans text-xs font-semibold">
                {reservedRoomsCount} / {totalRoomsCount} Rooms
              </span>
            </div>
            <div className="mt-4 h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary transition-all duration-500"
                style={{ width: `${occupancyRate}%` }}
              ></div>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-primary text-on-primary p-8 border border-primary hover-lift group relative overflow-hidden rounded-sm">
            <div className="absolute top-0 right-0 p-4 opacity-15 group-hover:opacity-25 transition-opacity">
              <span className="material-symbols-outlined text-7xl">pending_actions</span>
            </div>
            <p className="font-sans text-[10px] font-bold text-on-primary-container uppercase tracking-wider mb-2">
              Pending Requests
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="font-serif text-5xl font-medium">{pendingRequestsCount}</h3>
              <span className="text-secondary-fixed font-sans text-xs font-semibold">Needs attention</span>
            </div>
            <div className="mt-4 flex gap-2">
              <span className="px-2 py-1 bg-surface-container-low text-primary text-[9px] font-bold uppercase rounded-sm">
                Room Service
              </span>
              <span className="px-2 py-1 bg-surface-container-low text-primary text-[9px] font-bold uppercase rounded-sm">
                Check-ins
              </span>
            </div>
          </div>
        </div>

        {/* Live Requests Board (Staff Notifications) */}
        {requests.length > 0 && (
          <section className="mb-12 bg-white border border-outline-variant p-6 rounded-sm shadow-sm">
            <h3 className="font-serif text-xl text-primary font-semibold mb-4">Pending Staff Action Items</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requests.map((req) => (
                <div key={req.id} className="p-4 border border-outline-variant/60 bg-surface-container-low flex justify-between items-start gap-4 animate-fade-in">
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-secondary text-[24px] mt-0.5">
                      {req.type === "Room Service" ? "restaurant" : "notifications_active"}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-xs font-bold uppercase text-primary">Suite {req.roomNumber}</span>
                        <span className="text-[10px] bg-secondary-container text-secondary px-2 py-0.5 font-bold uppercase">
                          {req.type}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-on-surface-variant mt-2 font-medium">Guest: {req.guestName}</p>
                      <p className="font-sans text-xs text-primary font-bold mt-1">Order: {req.details}</p>
                      {req.cost > 0 && <p className="font-sans text-xs text-secondary font-semibold mt-1">Cost: ₹{req.cost}</p>}
                      <span className="font-sans text-[10px] text-on-surface-variant opacity-60 block mt-2">{req.time}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => completeRequest(req.id)}
                    className="px-4 py-2 border border-primary hover:bg-primary hover:text-on-primary text-[10px] font-bold uppercase tracking-wider transition-all duration-200 bg-white"
                  >
                    Fulfill
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Guest Ledger Table */}
        <section id="guests" className="bg-surface-container-lowest border border-outline-variant rounded-sm shadow-sm">
          <div className="px-8 py-6 border-b border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4 bg-surface-bright">
            <div>
              <h4 className="font-serif text-2xl text-primary font-semibold">Live Guest List</h4>
              <p className="font-sans text-xs text-on-surface-variant">Real-time room status and occupancy tracking</p>
            </div>
            <div className="flex flex-wrap gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:flex-initial">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search guests or suites..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-surface-variant border-none text-xs font-sans focus:outline-none focus:ring-1 focus:ring-secondary w-full md:w-64 rounded-sm"
                />
              </div>

              {/* Status filter tabs */}
              <div className="flex border border-outline-variant/60 bg-white rounded-sm overflow-hidden text-[10px] font-bold uppercase tracking-wider">
                {["All", "Checked In", "Pending", "Overdue"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2 border-r last:border-none border-outline-variant/40 transition-colors ${
                      statusFilter === status ? "bg-primary text-on-primary" : "bg-white text-primary hover:bg-surface-container-low"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container text-on-surface-variant font-sans text-[11px] font-bold uppercase tracking-wider border-b border-outline-variant">
                  <th className="px-8 py-4">Guest Name</th>
                  <th className="px-8 py-4">Suite</th>
                  <th className="px-8 py-4">Room Type</th>
                  <th className="px-8 py-4">Check-In</th>
                  <th className="px-8 py-4">Check-Out</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {filteredGuests.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-8 py-10 text-center font-sans text-sm text-on-surface-variant">
                      No guests match the search filters.
                    </td>
                  </tr>
                ) : (
                  filteredGuests.map((g) => (
                    <tr key={g.id} className="hover:bg-surface-container-low transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${g.badgeClass || 'bg-secondary-container text-secondary'}`}>
                            {g.initials}
                          </div>
                          <div>
                            <p className="font-sans text-sm font-bold text-primary">{g.name}</p>
                            <p className="text-[10px] text-on-surface-variant uppercase font-medium">{g.vip}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 font-sans text-xs font-semibold text-primary">{g.room}</td>
                      <td className="px-8 py-5">
                        <span className="px-2.5 py-1 bg-surface-variant text-on-surface-variant text-[9px] uppercase font-bold rounded-sm">
                          {g.type}
                        </span>
                      </td>
                      <td className="px-8 py-5 font-sans text-xs text-on-surface-variant">{g.checkIn}</td>
                      <td className="px-8 py-5 font-sans text-xs text-on-surface-variant">{g.checkOut}</td>
                      <td className="px-8 py-5">
                        <span
                          className={`flex items-center gap-1.5 font-sans text-xs font-semibold ${
                            g.status === "Checked In"
                              ? "text-secondary"
                              : g.status === "Pending"
                              ? "text-on-surface-variant"
                              : "text-error"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              g.status === "Checked In"
                                ? "bg-secondary"
                                : g.status === "Pending"
                                ? "bg-outline-variant"
                                : "bg-error"
                            }`}
                          ></span>
                          {g.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          {g.status === "Pending" && (
                            <button
                              onClick={() => updateGuestStatus(g.id, "Checked In")}
                              className="px-3 py-1 bg-secondary text-white text-[9px] font-bold uppercase tracking-wider hover:opacity-90 rounded-sm"
                            >
                              Check In
                            </button>
                          )}
                          {g.status === "Checked In" && (
                            <button
                              onClick={() => updateGuestStatus(g.id, "Checked Out")}
                              className="px-3 py-1 border border-error text-error bg-white hover:bg-error/10 text-[9px] font-bold uppercase tracking-wider rounded-sm"
                            >
                              Check Out
                            </button>
                          )}
                          {g.status === "Overdue" && (
                            <button
                              onClick={() => updateGuestStatus(g.id, "Checked Out")}
                              className="px-3 py-1 bg-error text-white text-[9px] font-bold uppercase tracking-wider hover:opacity-90 rounded-sm"
                            >
                              Force Out
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="px-8 py-4 border-t border-outline-variant flex justify-between items-center bg-surface-bright">
            <p className="font-sans text-xs text-on-surface-variant">
              Showing {filteredGuests.length} of {guests.length} guests
            </p>
            <div className="flex gap-2">
              <button className="w-8 h-8 border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors rounded-sm">
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button className="w-8 h-8 border border-outline-variant flex items-center justify-center bg-primary text-on-primary rounded-sm">1</button>
              <button className="w-8 h-8 border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors rounded-sm">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </section>

        {/* System Health Footer */}
        <div className="mt-12 flex justify-between items-center text-xs text-on-surface-variant/70 border-t border-outline-variant/60 pt-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
            <span>Server Status: Optimal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span>Encrypted Admin Session</span>
          </div>
        </div>
      </main>
    </div>
  );
}
