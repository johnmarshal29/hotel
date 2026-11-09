import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center text-center px-8 py-32">
      <p className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mb-6">404 — Not Found</p>
      <h1 className="font-serif text-8xl md:text-[10rem] text-primary leading-none mb-6 opacity-10 select-none">
        404
      </h1>
      <h2 className="font-serif text-4xl text-primary mb-6 -mt-12">This Room Doesn't Exist</h2>
      <p className="font-sans text-sm text-on-surface-variant max-w-md leading-relaxed mb-12">
        The page you are looking for has checked out or was never reserved. Allow us to guide you back to our main lobby.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary text-on-primary px-10 py-4 font-sans text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all rounded-sm"
        >
          <span className="material-symbols-outlined text-[18px]">home</span>
          Return to Lobby
        </Link>
        <Link
          to="/rooms"
          className="inline-flex items-center gap-2 border border-outline-variant text-primary px-10 py-4 font-sans text-xs font-bold uppercase tracking-widest hover:bg-surface-container transition-all rounded-sm"
        >
          View Suites
        </Link>
      </div>
    </div>
  );
}
