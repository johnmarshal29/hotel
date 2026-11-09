import React, { useState, useContext } from "react";
import { AppContext } from "../AppContext";

export default function BookingPage() {
  const { rooms, bookRoom } = useContext(AppContext);
  const [searchParams] = useState({
    checkIn: "12 Oct 2024",
    checkOut: "18 Oct 2024",
    guests: "2 Adults, 1 Child",
  });

  const [bookingModal, setBookingModal] = useState({
    isOpen: false,
    roomType: "",
    price: 0,
    guestName: "",
    checkIn: "2024-10-12",
    checkOut: "2024-10-18",
    guestsCount: 2,
  });

  const [successBooking, setSuccessBooking] = useState(null);

  // Group rooms by type to show counts or features
  const roomTypes = [
    {
      type: "Royal Ocean Suite",
      description: "Our signature suite featuring custom Italian furnishings, soaring ocean views, and premium services.",
      price: 1250,
      sqft: 850,
      view: "Sea View",
      badge: "Most Coveted",
      features: ["King Bed", "Private Bar", "Spa Access"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCsGqiVdLQwKg5V0bVJfhLT3W5wHAZprQv30V4SB6C9xzaeWgRzoH3_P0qH6KKdO8tYS5fUHcBEJAySqimQgWizGD8hzru95I1nGXzFjglvBtDiq2x8nChTkBQfzvw6jUEY-wkegiax5IR3X3bx0pukEivamKaR7tRp-m_8qkvn4GHm-tNbrR0ktyVlEKd9pnKQsBsXbnqf3Z5Cq4Ojv_Z--8cxroVaBlkA2unNLw_gifuss4-N9ni9UjJawA1fahuHoWkNj2-Nm4",
    },
    {
      type: "Deluxe Panorama",
      description: "Floor-to-ceiling windows outlining breathtaking high-rise city views with smart lighting and sleek designs.",
      price: 890,
      sqft: 620,
      view: "City View",
      badge: "Skyline View",
      features: ["Queen Bed", "Smart Tech", "Rain Shower"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_0Rya-jteO37mpCaQxTy73aHjnn-KSCLWyCklYZGruHz_WcskYCWHBf9e4oKk1iylY2c2UFZ-dOSzZmDazfceRLlUagIHU3SUbpdHIDU6lySzW7R0gTifyujUjZsEjRzXFYZpr5iya5E2EICNrSUik4bksKfAEUpFnxlR3tBh4aip9SL68a91rbsYaDm3fqJBBLFw2qeGM2y-vW5VNIrG0oJGiLCF0xhJ0uhs3WpEez0ZqY2_gA9nArzh-RQZp5G9TB5KINE05QI",
    },
    {
      type: "Garden Sanctuary",
      description: "An architectural oasis surrounded by limestone walkways, a private plunge pool, and dapples of natural shade.",
      price: 950,
      sqft: 750,
      view: "Garden View",
      badge: "Pure Serenity",
      features: ["King Bed", "Plunge Pool", "Yoga Mat"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOOhCvff3B1dhUad_djNv47TI9hMxntjQTOMSoBGcRfgPqp_pWHun_VFui3Xe1ujMlBaKH9trDstPMc-1MekP39Ip8DU3x4WuWeXvpfibqvtzHk3g1KCZ4Ke_pbNVqT4BQNZrd-hS1G3rYmUrYhXU8WxmRtHn3lFSMMzvln3ppCyDQnPsGmpxDcId8g3dz8FpiBLSSQjl0EIPiSso8dCGin7O2SlNqf_C8eD1tqpclgvBLaXQ85jeWaCrkkpFBy6GeFVchs-YoRu0",
    }
  ];

  const handleOpenBooking = (type, price) => {
    setSuccessBooking(null);
    setBookingModal({
      isOpen: true,
      roomType: type,
      price: price,
      guestName: "",
      checkIn: "2024-10-12",
      checkOut: "2024-10-18",
      guestsCount: 2,
    });
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!bookingModal.guestName) return;

    const res = bookRoom(
      bookingModal.roomType,
      bookingModal.checkIn,
      bookingModal.checkOut,
      bookingModal.guestsCount,
      bookingModal.guestName
    );

    if (res.success) {
      setSuccessBooking({
        roomNumber: res.roomNumber,
        roomType: bookingModal.roomType,
        guestName: bookingModal.guestName,
      });
      setBookingModal((prev) => ({ ...prev, isOpen: false }));
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="bg-background min-h-screen text-on-surface">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/35 z-10"></div>
          <div className="absolute inset-0 hero-gradient z-20"></div>
          <img
            className="w-full h-full object-cover"
            alt="Luxury hotel lobby"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4nisc4XMEhgz4mTZqZqYjVrOjhPvXucj684T_IZCcFZfr_BIkyRIzfuRFtbNPtPFK8VDAGBBLz-4inKNE1LCmTtF8cEjreO0grgR2Fb7v-hMzHZrAtfyzcWEr7L3g0iDf-2qBYSlibEngN9FoSa6Y4YgiQ72zSd-c4W0KSBSEvjmUu6SltMxw4s4GSK1uO0J_ajHRSVa5FyQA6Ew2Ct2jJOCEowwrS49v8U2ltAosttZsIGCEJkx2ZBrlKSAogmEd-SExTLk-6dk"
          />
        </div>

        <div className="relative z-30 px-8 md:px-16 max-w-7xl mx-auto w-full mb-24">
          <div className="max-w-2xl">
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight drop-shadow-md">
              The Art of Precise <br />
              <span className="italic">Hospitality</span>
            </h1>
            <p className="font-sans text-lg text-white/90 mb-12 max-w-lg">
              Experience refined tranquility where every detail is a testament to meticulous service and quiet luxury.
            </p>
          </div>

          {/* Booking Bar / Search Widget */}
          <div className="glass-effect p-2 border border-outline-variant grid grid-cols-1 md:grid-cols-4 items-center shadow-lg rounded-sm max-w-5xl">
            <div className="p-4 border-r border-outline-variant hover:bg-surface-variant/30 transition-colors">
              <label className="block font-sans text-[10px] font-semibold text-on-surface-variant uppercase mb-1">Check In</label>
              <div className="flex items-center text-primary">
                <span className="material-symbols-outlined text-secondary mr-2 text-[20px]">calendar_today</span>
                <span className="font-serif text-lg">{searchParams.checkIn}</span>
              </div>
            </div>
            <div className="p-4 border-r border-outline-variant hover:bg-surface-variant/30 transition-colors">
              <label className="block font-sans text-[10px] font-semibold text-on-surface-variant uppercase mb-1">Check Out</label>
              <div className="flex items-center text-primary">
                <span className="material-symbols-outlined text-secondary mr-2 text-[20px]">calendar_month</span>
                <span className="font-serif text-lg">{searchParams.checkOut}</span>
              </div>
            </div>
            <div className="p-4 border-r border-outline-variant hover:bg-surface-variant/30 transition-colors">
              <label className="block font-sans text-[10px] font-semibold text-on-surface-variant uppercase mb-1">Guests</label>
              <div className="flex items-center text-primary">
                <span className="material-symbols-outlined text-secondary mr-2 text-[20px]">group</span>
                <span className="font-serif text-lg">{searchParams.guests}</span>
              </div>
            </div>
            <div className="p-2 h-full flex">
              <button className="bg-primary text-on-primary w-full py-4 font-sans text-xs font-bold uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all rounded-sm">
                Search Availability
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Status Message */}
      {successBooking && (
        <div className="max-w-7xl mx-auto px-8 md:px-16 mt-8">
          <div className="bg-secondary-container border border-secondary text-primary p-6 rounded-none flex items-center justify-between animate-fade-in">
            <div>
              <h3 className="font-serif text-xl font-medium mb-1">Booking Confirmed!</h3>
              <p className="font-sans text-sm">
                Thank you, <strong>{successBooking.guestName}</strong>. You have reserved a <strong>{successBooking.roomType}</strong>. 
                Your allocated room is <strong>Suite {successBooking.roomNumber}</strong>.
              </p>
            </div>
            <button
              onClick={() => setSuccessBooking(null)}
              className="text-primary hover:text-secondary font-bold text-sm tracking-widest uppercase"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Accommodations Grid */}
      <section className="px-8 md:px-16 py-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl text-primary mb-4">Curated Living Spaces</h2>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Our suites are designed as sanctuaries of silence and sophistication. Each room features bespoke furnishings, curated artwork, and state-of-the-art climate control.
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="border border-outline-variant px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider hover:bg-surface-container transition-colors">
              Filters
            </button>
            <button className="border border-outline-variant px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider hover:bg-surface-container transition-colors">
              Sort by Price
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roomTypes.map((room) => {
            const availableCount = rooms.filter(r => r.type === room.type && r.status === "Available").length;
            return (
              <div key={room.type} className="hover-lift bg-surface-container-lowest border border-outline-variant flex flex-col group overflow-hidden">
                <div className="relative h-80 overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={room.type}
                    src={room.img}
                  />
                  {room.badge && (
                    <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 font-sans text-[10px] uppercase tracking-wider">
                      {room.badge}
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-primary px-3 py-1 font-sans text-[10px] uppercase tracking-wider font-bold">
                    {availableCount > 0 ? `${availableCount} Available` : "Sold Out"}
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-serif text-2xl text-primary mb-1">{room.type}</h3>
                      <div className="flex items-center text-on-surface-variant space-x-3 mt-2">
                        <span className="flex items-center font-sans text-[11px] font-medium">
                          <span className="material-symbols-outlined text-[16px] mr-1">square_foot</span> {room.sqft} sq ft
                        </span>
                        <span className="flex items-center font-sans text-[11px] font-medium">
                          <span className="material-symbols-outlined text-[16px] mr-1">waves</span> {room.view}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block font-serif text-2xl text-secondary font-medium">₹{room.price}</span>
                      <span className="font-sans text-[10px] text-on-surface-variant uppercase tracking-wider">per night</span>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-6 flex-grow">
                    {room.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {room.features.map((feat) => (
                      <span key={feat} className="bg-surface-container-low px-3 py-1 font-sans text-[10px] font-medium text-on-surface-variant">
                        {feat}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleOpenBooking(room.type, room.price)}
                    disabled={availableCount === 0}
                    className="w-full border border-primary text-primary hover:bg-primary hover:text-on-primary py-4 font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {availableCount > 0 ? "Book Now" : "Fully Booked"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* More results */}
        <div className="mt-16 flex flex-col items-center">
          <button className="flex items-center space-x-2 text-on-surface-variant hover:text-primary transition-colors py-4 px-8 border border-outline-variant">
            <span className="font-sans text-xs font-bold uppercase tracking-widest">Load More Accommodations</span>
            <span className="material-symbols-outlined">expand_more</span>
          </button>
        </div>
      </section>

      {/* Bespoke Experiences Section */}
      <section className="bg-primary-container text-on-primary py-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
          <span className="material-symbols-outlined text-[300px]">auto_awesome</span>
        </div>
        <div className="px-8 md:px-16 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10 gap-8">
          <div className="max-w-xl">
            <h2 className="font-serif text-3xl md:text-4xl mb-4 text-white">Bespoke Experiences</h2>
            <p className="font-sans text-sm text-primary-fixed-dim leading-relaxed">
              Leave the details to us. From private jet charters to curated gastronomic tours, our concierge team is available 24/7 to fulfill your every request.
            </p>
          </div>
          <div className="flex flex-col w-full md:w-auto space-y-4">
            <button className="bg-secondary text-white px-12 py-5 font-sans text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all rounded-sm">
              Inquire for Special Requests
            </button>
            <a
              href="#"
              className="text-primary-fixed-dim hover:text-white transition-colors text-center font-sans text-[11px] font-bold underline underline-offset-4 uppercase tracking-wider"
            >
              Explore Concierge Services
            </a>
          </div>
        </div>
      </section>

      {/* Booking Form Modal */}
      {bookingModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-outline-variant p-8 max-w-md w-full shadow-2xl animate-scale-up rounded-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-serif text-2xl text-primary font-semibold">Reserve Room</h3>
                <p className="font-sans text-xs text-on-surface-variant mt-1">{bookingModal.roomType} — ₹{bookingModal.price}/night</p>
              </div>
              <button
                onClick={() => setBookingModal((prev) => ({ ...prev, isOpen: false }))}
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-6">
              <div>
                <label className="block font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Guest Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Julianne Waters"
                  value={bookingModal.guestName}
                  onChange={(e) => setBookingModal((prev) => ({ ...prev, guestName: e.target.value }))}
                  className="w-full px-4 py-3 bg-surface-container border border-outline-variant text-sm font-sans focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary rounded-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Check In</label>
                  <input
                    type="date"
                    required
                    value={bookingModal.checkIn}
                    onChange={(e) => setBookingModal((prev) => ({ ...prev, checkIn: e.target.value }))}
                    className="w-full px-3 py-2 bg-surface-container border border-outline-variant text-xs font-sans focus:outline-none focus:ring-1 focus:ring-secondary rounded-sm"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Check Out</label>
                  <input
                    type="date"
                    required
                    value={bookingModal.checkOut}
                    onChange={(e) => setBookingModal((prev) => ({ ...prev, checkOut: e.target.value }))}
                    className="w-full px-3 py-2 bg-surface-container border border-outline-variant text-xs font-sans focus:outline-none focus:ring-1 focus:ring-secondary rounded-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Total Guests</label>
                <select
                  value={bookingModal.guestsCount}
                  onChange={(e) => setBookingModal((prev) => ({ ...prev, guestsCount: parseInt(e.target.value) }))}
                  className="w-full px-4 py-3 bg-surface-container border border-outline-variant text-sm font-sans focus:outline-none focus:ring-1 focus:ring-secondary rounded-sm"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                </select>
              </div>

              <div className="pt-4 border-t border-outline-variant flex justify-between items-center">
                <div className="text-left">
                  <span className="block font-sans text-[9px] text-on-surface-variant uppercase tracking-wider">Estimated Total</span>
                  <span className="font-serif text-xl font-bold text-secondary">
                    ₹{bookingModal.price * Math.max(1, (new Date(bookingModal.checkOut) - new Date(bookingModal.checkIn)) / (1000 * 60 * 60 * 24))}
                  </span>
                </div>
                <button
                  type="submit"
                  className="bg-primary text-on-primary px-8 py-3 font-sans text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all rounded-sm"
                >
                  Confirm Stay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
