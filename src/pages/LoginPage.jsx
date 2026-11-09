import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("guest");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    roomNumber: ""
  });
  const [notification, setNotification] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotification(
      isLogin
        ? `Welcome back! Logged in as ${role === "admin" ? "Staff Concierge" : "Guest"}.`
        : `Account created successfully for ${formData.name || "Guest"}!`
    );
    setTimeout(() => {
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/rooms");
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 flex items-center justify-center bg-surface relative overflow-hidden">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-surface-container/80 backdrop-blur-xl border border-outline-variant/60 rounded-xl shadow-2xl p-8 z-10 relative">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <span className="text-secondary font-sans text-xs tracking-[0.3em] uppercase font-bold">
            Luxury Concierge Portal
          </span>
          <h2 className="font-serif text-3xl font-bold text-primary mt-2">
            LUXE RESERVE
          </h2>
          <p className="text-on-surface-variant text-sm mt-1">
            {isLogin ? "Sign in to manage your reservations" : "Create an account for personalized luxury"}
          </p>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className="mb-6 p-3 bg-secondary-container text-secondary text-sm font-medium rounded-lg text-center animate-fade-in">
            {notification}
          </div>
        )}

        {/* Role Toggle */}
        <div className="flex bg-surface-container-highest rounded-lg p-1 mb-6">
          <button
            type="button"
            onClick={() => setRole("guest")}
            className={`flex-1 py-2 text-xs uppercase font-bold tracking-wider rounded-md transition-all ${
              role === "guest"
                ? "bg-secondary text-white shadow-sm"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            Guest Portal
          </button>
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`flex-1 py-2 text-xs uppercase font-bold tracking-wider rounded-md transition-all ${
              role === "admin"
                ? "bg-secondary text-white shadow-sm"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            Staff Portal
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Julianne Waters"
                className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg text-on-surface text-sm focus:outline-none focus:border-secondary transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">
              Email Address / User ID
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder={role === "admin" ? "staff@luxereserve.com" : "guest@domain.com"}
              className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg text-on-surface text-sm focus:outline-none focus:border-secondary transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg text-on-surface text-sm focus:outline-none focus:border-secondary transition-colors"
            />
          </div>

          {role === "guest" && isLogin && (
            <div className="flex justify-between items-center text-xs">
              <label className="flex items-center gap-2 text-on-surface-variant cursor-pointer">
                <input type="checkbox" className="rounded text-secondary focus:ring-0" />
                Remember me
              </label>
              <a href="#forgot" className="text-secondary hover:underline font-semibold">
                Forgot suite pin?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-2 py-3 bg-secondary text-white font-bold uppercase tracking-widest text-xs rounded-lg hover:opacity-95 transition-all shadow-md"
          >
            {isLogin ? `Sign In as ${role === "admin" ? "Staff" : "Guest"}` : "Create Account"}
          </button>
        </form>

        {/* Switch Login/Signup */}
        <div className="mt-6 text-center text-xs text-on-surface-variant">
          {isLogin ? "First time visiting?" : "Already registered?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-secondary font-bold hover:underline uppercase tracking-wider ml-1"
          >
            {isLogin ? "Register Suite" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}
