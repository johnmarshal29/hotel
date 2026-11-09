import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const testimonials = [
  {
    id: 1,
    name: "Isabelle Fontaine",
    title: "Creative Director, Paris",
    quote:
      "Luxe Reserve is unlike any other hotel I've experienced. The attention to detail—from the temperature of the room to the scent in the hallway—is nothing short of extraordinary.",
    initials: "IF",
    badge: "5 Stays",
  },
  {
    id: 2,
    name: "Hiroshi Tanaka",
    title: "CEO, Tokyo",
    quote:
      "The seamless blend of minimalism and warmth here is a rare art. My suite felt like a private residence, with every surface curated to perfection.",
    initials: "HT",
    badge: "12 Stays",
  },
  {
    id: 3,
    name: "Amara Osei",
    title: "Architect & Traveler",
    quote:
      "From the in-room dining to the floor map that lets you see your suite before arriving, every touchpoint is a masterclass in thoughtful hospitality.",
    initials: "AO",
    badge: "3 Stays",
  },
];

const amenities = [
  {
    icon: "pool",
    title: "Infinity Pool",
    desc: "Float between sea and sky in our rooftop infinity pool, open from sunrise to midnight.",
  },
  {
    icon: "spa",
    title: "Holistic Spa",
    desc: "A 6,000 sq ft sanctuary offering bespoke treatments rooted in ancient wellness traditions.",
  },
  {
    icon: "restaurant",
    title: "Fine Dining",
    desc: "Three Michelin-recognized restaurants featuring seasonal menus and rare cellar selections.",
  },
  {
    icon: "fitness_center",
    title: "Fitness Atelier",
    desc: "State-of-the-art equipment alongside personal trainers and sunrise yoga on the terrace.",
  },
  {
    icon: "local_bar",
    title: "Rooftop Lounge",
    desc: "Crafted cocktails and rare spirits poured against a panoramic backdrop of the city skyline.",
  },
  {
    icon: "concierge",
    title: "24/7 Concierge",
    desc: "A dedicated personal concierge ensures every desire, however private, is quietly fulfilled.",
  },
];

const galleryImages = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCsGqiVdLQwKg5V0bVJfhLT3W5wHAZprQv30V4SB6C9xzaeWgRzoH3_P0qH6KKdO8tYS5fUHcBEJAySqimQgWizGD8hzru95I1nGXzFjglvBtDiq2x8nChTkBQfzvw6jUEY-wkegiax5IR3X3bx0pukEivamKaR7tRp-m_8qkvn4GHm-tNbrR0ktyVlEKd9pnKQsBsXbnqf3Z5Cq4Ojv_Z--8cxroVaBlkA2unNLw_gifuss4-N9ni9UjJawA1fahuHoWkNj2-Nm4",
    alt: "Royal Ocean Suite Interior",
    span: "col-span-2 row-span-2",
    label: "Royal Ocean Suite",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOOhCvff3B1dhUad_djNv47TI9hMxntjQTOMSoBGcRfgPqp_pWHun_VFui3Xe1ujMlBaKH9trDstPMc-1MekP39Ip8DU3x4WuWeXvpfibqvtzHk3g1KCZ4Ke_pbNVqT4BQNZrd-hS1G3rYmUrYhXU8WxmRtHn3lFSMMzvln3ppCyDQnPsGmpxDcId8g3dz8FpiBLSSQjl0EIPiSso8dCGin7O2SlNqf_C8eD1tqpclgvBLaXQ85jeWaCrkkpFBy6GeFVchs-YoRu0",
    alt: "Garden Sanctuary",
    span: "col-span-1 row-span-1",
    label: "Garden Sanctuary",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkYVDxE-MD_pFykqDmsLXlWMbIjuWOSHtQd364Ay6xYpq1aNj4_Ejq4ex6Solt4eh7UsTz5W7xxkJVrMKizOfLEgQ0I04BOFekmupgRlGk4qe5aJlHoETpgQP6U_SkBh_1SxUw3EmG3orGETAo1EySwCrVeCCjmzLtTLCcY_TqATP_im7_UDx-6QdJwY-HLUk_rVAGH5mcIgvHxmz7qSQBviS8mqCzydHXVEGMNwF-iftdZueDUt2SNqTet96GTyfRM5NYXKhScW4",
    alt: "In-Room Dining",
    span: "col-span-1 row-span-1",
    label: "Signature Breakfast",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_0Rya-jteO37mpCaQxTy73aHjnn-KSCLWyCklYZGruHz_WcskYCWHBf9e4oKk1iylY2c2UFZ-dOSzZmDazfceRLlUagIHU3SUbpdHIDU6lySzW7R0gTifyujUjZsEjRzXFYZpr5iya5E2EICNrSUik4bksKfAEUpFnxlR3tBh4aip9SL68a91rbsYaDm3fqJBBLFw2qeGM2y-vW5VNIrG0oJGiLCF0xhJ0uhs3WpEez0ZqY2_gA9nArzh-RQZp5G9TB5KINE05QI",
    alt: "Deluxe Panorama",
    span: "col-span-1 row-span-2",
    label: "City View Suite",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsK62n4AoGnwQhGxTFA1zBLaOMr924tABTG-wZPq-On2heezjkII4NaVefVNBotVM8FstwUd8gF8mrrLI-mF5SRCSXwSKtxLldt6HyqllVm_M4sAtT-GlD2xlKY3IKrediMrq9wKaWo3Iz6RF6bxlT8XzVpvCUnadeEyHjUFX1RLg6YurrBGU5PTAXr09b6tcpu_hxZcvIWA_5q99evbByv7COswTTI2_Y_Equp6sx9I06wkPc9ay0gUtYrvzWS1zHKAwuiFvTZU8",
    alt: "Presidential Penthouse",
    span: "col-span-1 row-span-1",
    label: "Presidential Penthouse",
  },
];

const stats = [
  { value: "48", label: "Curated Suites", unit: "" },
  { value: "4.97", label: "Guest Satisfaction", unit: "/5" },
  { value: "24", label: "Concierge Available", unit: "/7" },
  { value: "12", label: "Years of Excellence", unit: "+" },
];

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-background text-on-surface overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[700px] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 z-20" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 40%, rgba(249,249,249,1) 100%)" }} />
          <img
            className="w-full h-full object-cover scale-105 animate-hero-zoom"
            alt="Luxe Reserve hotel at golden hour"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4nisc4XMEhgz4mTZqZqYjVrOjhPvXucj684T_IZCcFZfr_BIkyRIzfuRFtbNPtPFK8VDAGBBLz-4inKNE1LCmTtF8cEjreO0grgR2Fb7v-hMzHZrAtfyzcWEr7L3g0iDf-2qBYSlibEngN9FoSa6Y4YgiQ72zSd-c4W0KSBSEvjmUu6SltMxw4s4GSK1uO0J_ajHRSVA5FyQA6Ew2Ct2jJOCEowwrS49v8U2ltAosttZsIGCEJkx2ZBrlKSAogmEd-SExTLk-6dk"
          />
        </div>

        <div className="relative z-30 px-8 md:px-16 max-w-7xl mx-auto w-full mb-28 md:mb-32">
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-white/70 mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Est. 2012 · Award-Winning Hospitality
          </p>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white mb-6 leading-none tracking-tight animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Where Silence<br />
            <span className="italic text-secondary-fixed-dim">Speaks Luxury</span>
          </h1>
          <p className="font-sans text-base md:text-lg text-white/80 mb-12 max-w-lg leading-relaxed animate-fade-up" style={{ animationDelay: "0.35s" }}>
            An intimate collection of 48 suites designed for those who understand that true luxury is felt, not seen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <Link
              to="/rooms"
              className="inline-flex items-center justify-center gap-3 bg-secondary text-white px-10 py-5 font-sans text-xs font-bold uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all rounded-sm shadow-lg"
            >
              Reserve Your Suite
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
            <a
              href="#experiences"
              className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-10 py-5 font-sans text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all rounded-sm"
            >
              Discover More
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 animate-bounce-gentle">
          <span className="font-sans text-[9px] text-white/50 uppercase tracking-widest">Scroll</span>
          <span className="material-symbols-outlined text-white/50 text-[20px]">expand_more</span>
        </div>
      </section>

      {/* ── STATS RIBBON ── */}
      <section className="bg-primary-container py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div
              key={i}
              id={`stat-${i}`}
              data-animate
              className={`text-center transition-all duration-700 ${isVisible[`stat-${i}`] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p className="font-serif text-4xl md:text-5xl text-white font-medium mb-1">
                {stat.value}<span className="text-secondary-fixed-dim">{stat.unit}</span>
              </p>
              <p className="font-sans text-[10px] text-primary-fixed-dim uppercase tracking-widest font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── INTRO EDITORIAL ── */}
      <section
        id="intro"
        data-animate
        className={`max-w-7xl mx-auto px-8 md:px-16 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${isVisible.intro ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div>
          <p className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mb-6">Our Philosophy</p>
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-8 leading-tight">
            A Hotel Built on the<br />Art of Listening
          </h2>
          <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-6">
            At Luxe Reserve, every surface, scent, and silence is an intentional choice. We believe the finest luxury is invisible — it is the absence of worry, the anticipation of need, and the quietude that comes from knowing you are being cared for without being disturbed.
          </p>
          <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-10">
            Our 48 suites span four curated floors, each designed by a different award-winning architect and furnished with commissioned pieces from European artisans.
          </p>
          <Link
            to="/rooms"
            className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-primary border-b-2 border-secondary pb-1 hover:text-secondary transition-colors"
          >
            View All Accommodations
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
        <div className="relative">
          <img
            className="w-full h-[500px] object-cover rounded-sm shadow-2xl"
            alt="Luxe Reserve lobby detail"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCsGqiVdLQwKg5V0bVJfhLT3W5wHAZprQv30V4SB6C9xzaeWgRzoH3_P0qH6KKdO8tYS5fUHcBEJAySqimQgWizGD8hzru95I1nGXzFjglvBtDiq2x8nChTkBQfzvw6jUEY-wkegiax5IR3X3bx0pukEivamKaR7tRp-m_8qkvn4GHm-tNbrR0ktyVlEKd9pnKQsBsXbnqf3Z5Cq4Ojv_Z--8cxroVaBlkA2unNLw_gifuss4-N9ni9UjJawA1fahuHoWkNj2-Nm4"
          />
          <div className="absolute -bottom-6 -left-6 bg-white border border-outline-variant p-6 shadow-xl rounded-sm max-w-[200px]">
            <p className="font-serif text-3xl text-secondary font-semibold">#1</p>
            <p className="font-sans text-[10px] text-on-surface-variant uppercase tracking-wider mt-1">Luxury Hotel Award 2024</p>
          </div>
        </div>
      </section>

      {/* ── AMENITIES GRID ── */}
      <section id="experiences" className="bg-surface-container-lowest py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div
            id="amenities-header"
            data-animate
            className={`flex flex-col md:flex-row justify-between items-end mb-16 gap-6 transition-all duration-700 ${isVisible["amenities-header"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div>
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mb-4">World-Class Amenities</p>
              <h2 className="font-serif text-4xl md:text-5xl text-primary">Every Indulgence,<br />Considered</h2>
            </div>
            <Link
              to="/amenities"
              className="flex-shrink-0 border border-outline-variant px-8 py-3 font-sans text-xs font-semibold uppercase tracking-widest hover:bg-surface-container transition-colors rounded-sm"
            >
              All Amenities
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map((item, i) => (
              <div
                key={i}
                id={`amenity-${i}`}
                data-animate
                className={`group bg-background border border-outline-variant p-8 hover-lift cursor-default transition-all duration-700 rounded-sm ${isVisible[`amenity-${i}`] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 border border-outline-variant flex items-center justify-center mb-6 group-hover:border-secondary group-hover:bg-secondary-container transition-all duration-300 rounded-sm">
                  <span className="material-symbols-outlined text-[22px] text-on-surface-variant group-hover:text-secondary transition-colors">{item.icon}</span>
                </div>
                <h3 className="font-serif text-xl text-primary mb-3">{item.title}</h3>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY ── */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-8 md:px-16">
        <div
          id="gallery-header"
          data-animate
          className={`mb-12 transition-all duration-700 ${isVisible["gallery-header"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mb-4">Visual Journey</p>
          <h2 className="font-serif text-4xl md:text-5xl text-primary">Our Spaces</h2>
        </div>
        <div
          id="gallery-grid"
          data-animate
          className={`grid grid-cols-3 grid-rows-3 gap-3 h-[600px] md:h-[700px] transition-all duration-1000 ${isVisible["gallery-grid"] ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`${img.span} relative overflow-hidden group cursor-pointer rounded-sm`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="font-sans text-[10px] text-white font-bold uppercase tracking-wider">{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-primary-container py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-secondary-fixed mb-4">Guest Voices</p>
              <h2 className="font-serif text-4xl md:text-5xl text-white">Words From<br />Our Guests</h2>
            </div>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-1 transition-all duration-400 rounded-full ${i === activeTestimonial ? "w-8 bg-secondary" : "w-4 bg-white/30 hover:bg-white/50"}`}
                />
              ))}
            </div>
          </div>

          <div className="relative min-h-[220px]">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className={`absolute inset-0 transition-all duration-700 ${i === activeTestimonial ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 pointer-events-none"}`}
              >
                <blockquote className="font-serif text-2xl md:text-3xl text-white leading-relaxed mb-8 max-w-3xl">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center font-serif text-lg font-bold text-primary">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-sans text-sm font-bold text-white">{t.name}</p>
                    <p className="font-sans text-[11px] text-primary-fixed-dim">{t.title}</p>
                  </div>
                  <span className="ml-4 px-3 py-1 bg-secondary-container text-secondary text-[9px] font-bold uppercase tracking-wider rounded-sm">{t.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="max-w-7xl mx-auto px-8 md:px-16 py-24 md:py-32">
        <div
          id="cta"
          data-animate
          className={`border border-outline-variant p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden transition-all duration-700 rounded-sm ${isVisible.cta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none">
            <span className="material-symbols-outlined text-[500px]">hotel</span>
          </div>
          <div className="relative z-10 max-w-xl">
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mb-4">Reserve Now</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">Begin Your Story at<br />Luxe Reserve</h2>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Complimentary butler service, a welcome amenity of your choosing, and guaranteed late checkout for all direct reservations.
            </p>
          </div>
          <div className="relative z-10 flex flex-col gap-4 w-full md:w-auto flex-shrink-0">
            <Link
              to="/rooms"
              className="bg-primary text-on-primary px-12 py-5 font-sans text-xs font-bold uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all text-center rounded-sm"
            >
              Book a Suite
            </Link>
            <Link
              to="/dining"
              className="border border-secondary text-secondary px-12 py-5 font-sans text-xs font-bold uppercase tracking-widest hover:bg-secondary-container transition-all text-center rounded-sm"
            >
              Explore Dining
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
