import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContextProvider } from "./AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import DiningPage from "./pages/DiningPage";
import MapExplorerPage from "./pages/MapExplorerPage";
import AdminPortalPage from "./pages/AdminPortalPage";
import AmenitiesPage from "./pages/AmenitiesPage";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/LoginPage";

function App() {
  return (
    <AppContextProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-background text-on-surface">
          {/* Frosted Fixed Navbar */}
          <Navbar />

          {/* Page Routing Entry */}
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/rooms" element={<BookingPage />} />
              <Route path="/dining" element={<DiningPage />} />
              <Route path="/amenities" element={<AmenitiesPage />} />
              <Route path="/explorer" element={<MapExplorerPage />} />
              <Route path="/admin" element={<AdminPortalPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>

          {/* Premium Footer */}
          <Footer />
        </div>
      </Router>
    </AppContextProvider>
  );
}

export default App;