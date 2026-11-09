import React, { useState, useRef, useContext } from "react";
import { AppContext } from "../AppContext";

export default function MapExplorerPage() {
  const { rooms, bookRoom } = useContext(AppContext);
  const [selectedFloor, setSelectedFloor] = useState(4);
  const [selectedRoomId, setSelectedRoomId] = useState("405");
  const [successBooking, setSuccessBooking] = useState(null);
  
  const mapPlaneRef = useRef(null);

  // Filter rooms belonging to selected floor
  const floorRooms = rooms.filter(r => r.floor === selectedFloor);
  const selectedRoom = rooms.find(r => r.number === selectedRoomId);

  // Mouse move tilt effect
  const handleMouseMove = (e) => {
    if (!mapPlaneRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mapPlaneRef.current.style.transform = `rotateX(${10 + y * 12}deg) rotateZ(${-5 + x * 12}deg)`;
  };

  const handleMouseLeave = () => {
    if (!mapPlaneRef.current) return;
    mapPlaneRef.current.style.transform = `rotateX(10deg) rotateZ(-5deg)`;
  };

  // Change floor view with transition animation
  const [isTransitioning, setIsTransitioning] = useState(false);
  const handleFloorChange = (floorNum) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedFloor(floorNum);
      // Auto select first room on that floor
      const firstRoomOnFloor = rooms.find(r => r.floor === floorNum);
      if (firstRoomOnFloor) {
        setSelectedRoomId(firstRoomOnFloor.number);
      }
      setSuccessBooking(null);
      setIsTransitioning(false);
    }, 400);
  };

  // SVG room configurations for drawing dynamically
  // Each floor has its own room locations
  const getRoomSvgCoords = (roomNo) => {
    const coords = {
      // Penthouse
      "401": { x: 150, y: 150, w: 100, h: 100 },
      "402": { x: 250, y: 150, w: 100, h: 100 },
      "403": { x: 350, y: 150, w: 100, h: 100 },
      "404": { x: 450, y: 150, w: 100, h: 100 },
      "405": { x: 550, y: 150, w: 100, h: 100 },
      "406": { x: 150, y: 350, w: 150, h: 100 },
      "407": { x: 300, y: 350, w: 200, h: 100 },
      "408": { x: 500, y: 350, w: 150, h: 100 },
      // Floor 3
      "301": { x: 200, y: 200, w: 180, h: 160 },
      "302": { x: 420, y: 200, w: 180, h: 160 },
      // Floor 2
      "215": { x: 300, y: 200, w: 200, h: 180 },
      // Floor 1 (Lobby / Suite 101)
      "101": { x: 250, y: 220, w: 300, h: 180 }
    };

    return coords[roomNo] || { x: 200, y: 200, w: 100, h: 100 };
  };

  const handleBookFromMap = () => {
    if (!selectedRoom || selectedRoom.status === "Reserved") return;

    const res = bookRoom(
      selectedRoom.type,
      "2024-10-12",
      "2024-10-18",
      2,
      "Map Booking Guest"
    );

    if (res.success) {
      setSuccessBooking(selectedRoom.number);
    }
  };

  return (
    <div className="bg-background min-h-screen text-on-surface pt-24 pb-20">
      <main className="max-w-7xl mx-auto px-8 md:px-16 py-12">
        {/* Header */}
        <div className="mt-4 mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-primary mb-2">Interactive Floor Map</h1>
          <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-2xl">
            Explore our sanctuary. Select an available room (Gold) to view details and reserve, or view active occupancies (Charcoal).
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Floor controls & Legend */}
          <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6">
            {/* Legend */}
            <div className="bg-surface-container-low border border-outline-variant p-6 flex flex-col gap-4 rounded-sm">
              <h3 className="font-sans text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                Map Legend
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-secondary"></div>
                <span className="font-sans text-xs font-medium">Available for Booking</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-primary"></div>
                <span className="font-sans text-xs font-medium">Reserved / Occupied</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-surface-container-highest border border-outline-variant"></div>
                <span className="font-sans text-xs font-medium">Common Areas</span>
              </div>
            </div>

            {/* Floor Selector */}
            <div className="bg-surface-container-low border border-outline-variant p-6 flex flex-col gap-4 rounded-sm">
              <h3 className="font-sans text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                Floor Selector
              </h3>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Penthouse Floor", value: 4 },
                  { label: "Floor 03", value: 3 },
                  { label: "Floor 02", value: 2 },
                  { label: "Main Lobby", value: 1 }
                ].map((fl) => (
                  <button
                    key={fl.value}
                    onClick={() => handleFloorChange(fl.value)}
                    className={`w-full text-left py-3.5 px-5 border text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                      selectedFloor === fl.value
                        ? "border-secondary bg-secondary text-white shadow-sm"
                        : "border-outline-variant hover:border-secondary bg-white text-primary"
                    }`}
                  >
                    {fl.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Map canvas */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="col-span-12 lg:col-span-6 bg-white border border-outline-variant h-[650px] relative overflow-hidden flex items-center justify-center map-container group rounded-sm shadow-sm"
          >
            {/* Interactive SVG Map */}
            <svg
              ref={mapPlaneRef}
              className={`w-full h-full floor-plane p-10 transition-opacity duration-300 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
              viewBox="0 0 800 600"
              style={{ transform: "rotateX(10deg) rotateZ(-5deg)", transition: "opacity 0.3s ease" }}
            >
              {/* Floor layout container */}
              <rect
                x="50"
                y="50"
                width="700"
                height="500"
                fill="#F4F4F4"
                stroke="#E0E0E0"
                strokeWidth="2"
              />
              <rect
                x="150"
                y="150"
                width="500"
                height="300"
                fill="white"
                stroke="#E0E0E0"
                strokeWidth="1.5"
              />

              {/* Dynamic room polygons */}
              {floorRooms.map((r) => {
                const isSelected = r.number === selectedRoomId;
                const coords = getRoomSvgCoords(r.number);
                const isAvailable = r.status === "Available";

                return (
                  <g
                    key={r.number}
                    className="room-polygon"
                    onClick={() => {
                      setSelectedRoomId(r.number);
                      setSuccessBooking(null);
                    }}
                    style={{
                      opacity: isSelected ? 1 : 0.65,
                      stroke: isSelected ? "#775a19" : "white",
                      strokeWidth: isSelected ? "4" : "2"
                    }}
                  >
                    <rect
                      x={coords.x}
                      y={coords.y}
                      width={coords.w}
                      height={coords.h}
                      fill={isAvailable ? "#775a19" : "#1c1b1b"}
                      className="transition-colors duration-300"
                    />
                    <text
                      x={coords.x + coords.w / 2}
                      y={coords.y + coords.h / 2 + 5}
                      fill="white"
                      fontFamily="var(--font-sans)"
                      fontSize="14"
                      fontWeight="600"
                      textAnchor="middle"
                    >
                      {r.number}
                    </text>
                  </g>
                );
              })}

              {/* Commons: Elevator & Stairs */}
              <g>
                <rect x="50" y="260" width="80" height="80" fill="#E2E2E2" stroke="#C4C7C7" />
                <text
                  x="90"
                  y="308"
                  className="material-symbols-outlined"
                  fill="#444748"
                  fontSize="28"
                  textAnchor="middle"
                >
                  elevator
                </text>
              </g>
              <g>
                <rect x="670" y="260" width="80" height="80" fill="#E2E2E2" stroke="#C4C7C7" />
                <text
                  x="710"
                  y="308"
                  className="material-symbols-outlined"
                  fill="#444748"
                  fontSize="28"
                  textAnchor="middle"
                >
                  stairs
                </text>
              </g>
            </svg>

            {/* Helper scale UI */}
            <div className="absolute bottom-6 left-6 flex gap-2">
              <button className="w-10 h-10 rounded-full bg-white border border-outline-variant shadow-sm flex items-center justify-center hover:bg-surface-container-low transition-colors" title="Zoom In">
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-white border border-outline-variant shadow-sm flex items-center justify-center hover:bg-surface-container-low transition-colors" title="Zoom Out">
                <span className="material-symbols-outlined text-[20px]">remove</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-white border border-outline-variant shadow-sm flex items-center justify-center hover:bg-surface-container-low transition-colors" title="Reset View">
                <span className="material-symbols-outlined text-[20px]">restart_alt</span>
              </button>
            </div>
          </div>

          {/* Details panel */}
          <aside className="col-span-12 lg:col-span-3">
            {!selectedRoom ? (
              <div className="bg-surface-container-low border border-outline-variant p-10 flex flex-col items-center justify-center text-center h-[500px] rounded-sm">
                <span className="material-symbols-outlined text-4xl text-outline-variant mb-4">touch_app</span>
                <h2 className="font-serif text-lg text-primary mb-2">Select a Room</h2>
                <p className="font-sans text-xs text-on-surface-variant">
                  Click on any room on the map grid to view specifications and occupancy statuses.
                </p>
              </div>
            ) : (
              <div className="bg-white border border-outline-variant p-8 flex flex-col rounded-sm shadow-sm animate-fade-in">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span
                      className={`font-sans text-[9px] font-bold px-3 py-1 inline-block mb-2 text-white ${
                        selectedRoom.status === "Available" ? "bg-secondary" : "bg-primary"
                      }`}
                    >
                      {selectedRoom.status.toUpperCase()}
                    </span>
                    <h2 className="font-serif text-2xl text-primary font-semibold">Room {selectedRoom.number}</h2>
                    <p className="font-sans text-xs text-on-surface-variant">{selectedRoom.type}</p>
                  </div>
                </div>

                {selectedRoom.img && (
                  <div className="mb-6 rounded-sm overflow-hidden h-40 border border-outline-variant">
                    <img
                      className="w-full h-full object-cover"
                      alt={selectedRoom.type}
                      src={selectedRoom.img}
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex flex-col">
                    <span className="font-sans text-[9px] text-outline uppercase font-semibold">DAILY RATE</span>
                    <span className="font-serif text-xl font-bold text-primary">₹{selectedRoom.price}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-[9px] text-outline uppercase font-semibold">CAPACITY</span>
                    <span className="font-serif text-xl font-bold text-primary">2 Guests</span>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="block font-sans text-[9px] text-outline uppercase font-semibold mb-3">Room Info</span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-sans font-medium text-on-surface-variant">
                    <span>📐 {selectedRoom.sqft || 700} sq ft</span>
                    <span>🌊 {selectedRoom.view || "N/A"}</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="font-sans text-[9px] text-on-surface-variant font-bold uppercase tracking-widest mb-3">Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRoom.features?.map((feat) => (
                      <span key={feat} className="bg-surface-container text-on-surface px-2.5 py-1 font-sans text-[9px] font-semibold">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {successBooking === selectedRoom.number ? (
                  <div className="bg-secondary-container text-primary p-4 text-xs font-sans text-center border border-secondary leading-relaxed animate-fade-in">
                    🎉 Room booked! Reservation logged inside Staff Admin Portal.
                  </div>
                ) : selectedRoom.status === "Available" ? (
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleBookFromMap}
                      className="w-full py-4 bg-primary text-white font-sans text-xs font-bold uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all rounded-sm"
                    >
                      Book This Room
                    </button>
                    <button className="w-full py-4 border border-secondary text-secondary font-sans text-xs font-bold uppercase tracking-widest hover:bg-secondary-container transition-all rounded-sm">
                      Virtual Tour
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="p-4 bg-surface-container border-l-4 border-primary text-xs leading-relaxed text-on-surface-variant italic">
                      "Currently occupied. Expected check-out within standard guest limits."
                    </div>
                    <button className="w-full py-4 bg-primary text-white font-sans text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all rounded-sm">
                      Adjust Access Request
                    </button>
                    <button className="w-full py-4 border border-outline text-on-surface-variant font-sans text-xs font-bold uppercase tracking-widest rounded-sm">
                      Notify Availability
                    </button>
                  </div>
                )}
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
