import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-container text-on-primary border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-8 md:px-16 pt-16 pb-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="font-serif text-2xl text-white font-bold tracking-tighter mb-4">LUXE RESERVE</p>
            <p className="font-sans text-xs text-primary-fixed-dim leading-relaxed mb-6">
              An intimate collection of 48 curated suites where every detail speaks to the art of quiet luxury hospitality.
            </p>
            <div className="flex gap-3">
              {["public", "alternate_email", "share"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-secondary hover:text-secondary text-white/60 transition-colors rounded-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-[9px] font-bold uppercase tracking-[0.3em] text-secondary mb-5">Explore</h4>
            <nav className="flex flex-col gap-3">
              {[
                { to: "/", label: "Home" },
                { to: "/rooms", label: "Accommodations" },
                { to: "/dining", label: "In-Room Dining" },
                { to: "/amenities", label: "Spa & Wellness" },
                { to: "/explorer", label: "Floor Map" },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="font-sans text-xs text-primary-fixed-dim hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-sans text-[9px] font-bold uppercase tracking-[0.3em] text-secondary mb-5">Services</h4>
            <nav className="flex flex-col gap-3">
              {[
                "Concierge Services",
                "Private Dining",
                "Spa Treatments",
                "Airport Transfer",
                "Event Planning",
                "Valet Parking",
              ].map((s) => (
                <a key={s} href="#" className="font-sans text-xs text-primary-fixed-dim hover:text-white transition-colors">
                  {s}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-[9px] font-bold uppercase tracking-[0.3em] text-secondary mb-5">Contact</h4>
            <div className="flex flex-col gap-4">
              {[
                { icon: "location_on", text: "1 Promenade Elysée, Monaco" },
                { icon: "phone", text: "+33 (0) 1 23 45 67 89" },
                { icon: "mail", text: "reservations@luxereserve.com" },
              ].map((c) => (
                <div key={c.icon} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[16px] mt-0.5 flex-shrink-0">{c.icon}</span>
                  <span className="font-sans text-xs text-primary-fixed-dim leading-relaxed">{c.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 font-sans text-[9px] font-bold uppercase tracking-widest text-secondary hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">admin_panel_settings</span>
                Staff Portal
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-[10px] text-primary-fixed-dim">
            © {year} Luxe Reserve. All rights reserved. Quiet Luxury Hospitality.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
              <a
                key={l}
                href="#"
                className="font-sans text-[10px] text-primary-fixed-dim hover:text-white transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
