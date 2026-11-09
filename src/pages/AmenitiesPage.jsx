import React, { useState } from "react";
import { Link } from "react-router-dom";

const spaServices = [
  {
    id: 1,
    name: "Himalayan Salt Ritual",
    duration: "90 min",
    price: 320,
    category: "Body",
    desc: "Pink Himalayan salt stones are used alongside deep tissue massage to draw out toxins and restore the body's natural mineral balance.",
    icon: "spa",
  },
  {
    id: 2,
    name: "Caviar & Gold Facial",
    duration: "75 min",
    price: 450,
    category: "Face",
    desc: "An ultra-premium treatment using sustainably sourced caviar extract and 24k gold leaf to restore elasticity and luminosity.",
    icon: "auto_awesome",
  },
  {
    id: 3,
    name: "Couples Immersion",
    duration: "120 min",
    price: 780,
    category: "Couples",
    desc: "A private suite experience combining full body wraps, synchronized massages, and a private mineral plunge bath for two.",
    icon: "favorite",
  },
  {
    id: 4,
    name: "Jet Lag Recovery",
    duration: "60 min",
    price: 240,
    category: "Wellness",
    desc: "Scientifically designed to realign circadian rhythms through targeted acupressure, light therapy, and adaptogen-infused wraps.",
    icon: "flight_land",
  },
  {
    id: 5,
    name: "Thermal Journey",
    duration: "3 hours",
    price: 580,
    category: "Wellness",
    desc: "A guided journey through snow rooms, steam caves, infrared saunas, and culminating in a hot mineral pool immersion.",
    icon: "local_fire_department",
  },
  {
    id: 6,
    name: "Mindful Restoration",
    duration: "60 min",
    price: 195,
    category: "Mind",
    desc: "Guided breathwork, sound bath healing, and craniosacral therapy in our dedicated contemplation chamber.",
    icon: "self_improvement",
  },
];

const wellnessStats = [
  { value: "6,000", label: "Square Feet of Spa", unit: "" },
  { value: "18", label: "Treatment Rooms", unit: "" },
  { value: "100%", label: "Organic Products", unit: "" },
  { value: "5", label: "Pool Environments", unit: "" },
];

const categories = ["All", "Body", "Face", "Couples", "Wellness", "Mind"];

export default function AmenitiesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedService, setSelectedService] = useState(null);
  const [bookingName, setBookingName] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const filteredServices =
    activeCategory === "All"
      ? spaServices
      : spaServices.filter((s) => s.category === activeCategory);

  const handleBooking = (e) => {
    e.preventDefault();
    if (!bookingName || !bookingDate) return;
    setBookingSuccess(true);
  };

  return (
    <div className="bg-background min-h-screen text-on-surface">
      {/* Hero */}
      <section className="relative h-[600px] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="absolute inset-0 z-20" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(249,249,249,1) 100%)" }} />
          <img
            className="w-full h-full object-cover"
            alt="Luxe Reserve Spa Interior"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsK62n4AoGnwQhGxTFA1zBLaOMr924tABTG-wZPq-On2heezjkII4NaVefVNBotVM8FstwUd8gF8mrrLI-mF5SRCSXwSKtxLldt6HyqllVm_M4sAtT-GlD2xlKY3IKrediMrq9wKaWo3Iz6RF6bxlT8XzVpvCUnadeEyHjUFX1RLg6YurrBGU5PTAXr09b6tcpu_hxZcvIWA_5q99evbByv7COswTTI2_Y_Equp6sx9I06wkPc9ay0gUtYrvzWS1zHKAwuiFvTZU8"
          />
        </div>
        <div className="relative z-30 px-8 md:px-16 max-w-7xl mx-auto w-full mb-24">
          <p className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 mb-4">Wellness & Spa</p>
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-4 leading-tight">
            The Meridian Spa
          </h1>
          <p className="font-sans text-base text-white/80 max-w-xl leading-relaxed">
            6,000 square feet dedicated to the restoration of body, mind, and spirit using ancient wisdom and modern science.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary-container py-10">
        <div className="max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {wellnessStats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="font-serif text-4xl text-white font-medium mb-1">
                {s.value}<span className="text-secondary-fixed-dim text-2xl">{s.unit}</span>
              </p>
              <p className="font-sans text-[10px] text-primary-fixed-dim uppercase tracking-widest font-semibold">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-8 md:px-16 py-20">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mb-3">Our Treatments</p>
            <h2 className="font-serif text-4xl text-primary">Curated Healing Rituals</h2>
          </div>
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 font-sans text-[10px] font-bold uppercase tracking-widest transition-all duration-200 rounded-sm border ${
                  activeCategory === cat
                    ? "bg-primary text-on-primary border-primary"
                    : "border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-surface-container-lowest border border-outline-variant p-8 hover-lift group relative overflow-hidden rounded-sm"
            >
              <div className="absolute top-0 right-0 opacity-[0.04] group-hover:opacity-[0.07] transition-opacity pointer-events-none p-4">
                <span className="material-symbols-outlined text-[100px]">{service.icon}</span>
              </div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 bg-secondary-container text-secondary text-[9px] font-bold uppercase tracking-wider rounded-sm">
                    {service.category}
                  </span>
                  <span className="font-sans text-[10px] text-on-surface-variant font-medium">{service.duration}</span>
                </div>
                <h3 className="font-serif text-xl text-primary mb-3">{service.name}</h3>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-8 min-h-[60px]">{service.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="font-serif text-2xl text-secondary font-medium">₹{service.price}</span>
                  <button
                    onClick={() => {
                      setSelectedService(service);
                      setBookingSuccess(false);
                      setBookingName("");
                      setBookingDate("");
                    }}
                    className="border border-primary text-primary hover:bg-primary hover:text-on-primary px-6 py-2.5 font-sans text-[10px] font-bold uppercase tracking-widest transition-all duration-200 rounded-sm"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="bg-surface-container-lowest py-20 border-t border-outline-variant">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <p className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mb-4">Pools & Facilities</p>
          <h2 className="font-serif text-4xl text-primary mb-12">Thermal Environments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-80 rounded-sm overflow-hidden group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOOhCvff3B1dhUad_djNv47TI9hMxntjQTOMSoBGcRfgPqp_pWHun_VFui3Xe1ujMlBaKH9trDstPMc-1MekP39Ip8DU3x4WuWeXvpfibqvtzHk3g1KCZ4Ke_pbNVqT4BQNZrd-hS1G3rYmUrYhXU8WxmRtHn3lFSMMzvln3ppCyDQnPsGmpxDcId8g3dz8FpiBLSSQjl0EIPiSso8dCGin7O2SlNqf_C8eD1tqpclgvBLaXQ85jeWaCrkkpFBy6GeFVchs-YoRu0"
                alt="Infinity Pool"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="font-serif text-2xl text-white">Rooftop Infinity Pool</p>
                <p className="font-sans text-[11px] text-white/70 mt-1">Open 6 AM – Midnight</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Cold Plunge Pool", sub: "10°C · 24/7" },
                { label: "Finnish Sauna", sub: "80°C · 4 Rooms" },
                { label: "Steam Grotto", sub: "Himalayan Herbs" },
                { label: "Chromotherapy Pool", sub: "Mineral Water" },
              ].map((item, i) => (
                <div key={i} className="bg-primary-container border border-primary-container h-[180px] flex flex-col justify-end p-6 rounded-sm relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <span className="material-symbols-outlined text-[180px] text-white absolute -right-8 -bottom-8">water_drop</span>
                  </div>
                  <h4 className="font-serif text-lg text-white relative z-10">{item.label}</h4>
                  <p className="font-sans text-[10px] text-primary-fixed-dim relative z-10 mt-1">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Spa Booking Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-outline-variant p-8 max-w-md w-full shadow-2xl rounded-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-serif text-2xl text-primary font-semibold">Reserve Treatment</h3>
                <p className="font-sans text-xs text-on-surface-variant mt-1">
                  {selectedService.name} — ₹{selectedService.price} · {selectedService.duration}
                </p>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {bookingSuccess ? (
              <div className="bg-secondary-container border border-secondary p-6 text-center rounded-none">
                <span className="material-symbols-outlined text-4xl text-secondary mb-3">check_circle</span>
                <p className="font-serif text-xl text-primary mb-2">Reservation Confirmed</p>
                <p className="font-sans text-xs text-on-surface-variant">
                  We will contact you at the concierge desk to confirm the appointment time.
                </p>
                <button
                  onClick={() => setSelectedService(null)}
                  className="mt-6 w-full bg-primary text-on-primary py-3 font-sans text-xs font-bold uppercase tracking-widest rounded-sm"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-5">
                <div>
                  <label className="block font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Guest Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container border border-outline-variant text-sm font-sans focus:outline-none focus:ring-1 focus:ring-secondary rounded-sm"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container border border-outline-variant text-sm font-sans focus:outline-none focus:ring-1 focus:ring-secondary rounded-sm"
                  />
                </div>
                <div className="pt-4 border-t border-outline-variant flex justify-between items-center">
                  <div>
                    <span className="block font-sans text-[9px] text-on-surface-variant uppercase tracking-wider">Treatment Cost</span>
                    <span className="font-serif text-xl font-bold text-secondary">₹{selectedService.price}</span>
                  </div>
                  <button type="submit" className="bg-primary text-on-primary px-8 py-3 font-sans text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all rounded-sm">
                    Confirm
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
