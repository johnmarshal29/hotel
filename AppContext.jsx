import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  // Initialize Rooms with their statuses, coordinates, images, and features
  const [rooms, setRooms] = useState(() => {
    const savedRooms = localStorage.getItem("luxe_rooms");
    if (savedRooms) return JSON.parse(savedRooms);

    return [
      // Floor 4 (Penthouse Floor)
      {
        number: "401",
        floor: 4,
        type: "Royal Ocean Suite",
        price: 1250,
        status: "Available",
        sqft: 850,
        view: "Sea View",
        features: ["King Bed", "Private Bar", "Spa Access"],
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCsGqiVdLQwKg5V0bVJfhLT3W5wHAZprQv30V4SB6C9xzaeWgRzoH3_P0qH6KKdO8tYS5fUHcBEJAySqimQgWizGD8hzru95I1nGXzFjglvBtDiq2x8nChTkBQfzvw6jUEY-wkegiax5IR3X3bx0pukEivamKaR7tRp-m_8qkvn4GHm-tNbrR0ktyVlEKd9pnKQsBsXbnqf3Z5Cq4Ojv_Z--8cxroVaBlkA2unNLw_gifuss4-N9ni9UjJawA1fahuHoWkNj2-Nm4",
        dataAlt: "Luxury ocean suite bedroom with Italian furnishings"
      },
      {
        number: "402",
        floor: 4,
        type: "Deluxe Panorama",
        price: 890,
        status: "Reserved",
        sqft: 620,
        view: "City View",
        features: ["Queen Bed", "Smart Tech", "Rain Shower"],
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_0Rya-jteO37mpCaQxTy73aHjnn-KSCLWyCklYZGruHz_WcskYCWHBf9e4oKk1iylY2c2UFZ-dOSzZmDazfceRLlUagIHU3SUbpdHIDU6lySzW7R0gTifyujUjZsEjRzXFYZpr5iya5E2EICNrSUik4bksKfAEUpFnxlR3tBh4aip9SL68a91rbsYaDm3fqJBBLFw2qeGM2y-vW5VNIrG0oJGiLCF0xhJ0uhs3WpEez0ZqY2_gA9nArzh-RQZp5G9TB5KINE05QI",
        dataAlt: "Deluxe panorama room twilight city view"
      },
      {
        number: "403",
        floor: 4,
        type: "Garden Sanctuary",
        price: 950,
        status: "Available",
        sqft: 750,
        view: "Garden View",
        features: ["King Bed", "Plunge Pool", "Yoga Mat"],
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOOhCvff3B1dhUad_djNv47TI9hMxntjQTOMSoBGcRfgPqp_pWHun_VFui3Xe1ujMlBaKH9trDstPMc-1MekP39Ip8DU3x4WuWeXvpfibqvtzHk3g1KCZ4Ke_pbNVqT4BQNZrd-hS1G3rYmUrYhXU8WxmRtHn3lFSMMzvln3ppCyDQnPsGmpxDcId8g3dz8FpiBLSSQjl0EIPiSso8dCGin7O2SlNqf_C8eD1tqpclgvBLaXQ85jeWaCrkkpFBy6GeFVchs-YoRu0",
        dataAlt: "Garden sanctuary room private courtyard stone plunge pool"
      },
      {
        number: "404",
        floor: 4,
        type: "Deluxe Panorama",
        price: 890,
        status: "Reserved",
        sqft: 620,
        view: "City View",
        features: ["Queen Bed", "Smart Tech", "Rain Shower"],
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_0Rya-jteO37mpCaQxTy73aHjnn-KSCLWyCklYZGruHz_WcskYCWHBf9e4oKk1iylY2c2UFZ-dOSzZmDazfceRLlUagIHU3SUbpdHIDU6lySzW7R0gTifyujUjZsEjRzXFYZpr5iya5E2EICNrSUik4bksKfAEUpFnxlR3tBh4aip9SL68a91rbsYaDm3fqJBBLFw2qeGM2y-vW5VNIrG0oJGiLCF0xhJ0uhs3WpEez0ZqY2_gA9nArzh-RQZp5G9TB5KINE05QI",
        dataAlt: "Deluxe panorama room twilight city view"
      },
      {
        number: "405",
        floor: 4,
        type: "Royal Ocean Suite",
        price: 1250,
        status: "Available",
        sqft: 850,
        view: "Sea View",
        features: ["King Bed", "Private Bar", "Spa Access"],
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCsGqiVdLQwKg5V0bVJfhLT3W5wHAZprQv30V4SB6C9xzaeWgRzoH3_P0qH6KKdO8tYS5fUHcBEJAySqimQgWizGD8hzru95I1nGXzFjglvBtDiq2x8nChTkBQfzvw6jUEY-wkegiax5IR3X3bx0pukEivamKaR7tRp-m_8qkvn4GHm-tNbrR0ktyVlEKd9pnKQsBsXbnqf3Z5Cq4Ojv_Z--8cxroVaBlkA2unNLw_gifuss4-N9ni9UjJawA1fahuHoWkNj2-Nm4",
        dataAlt: "Luxury ocean suite bedroom with Italian furnishings"
      },
      {
        number: "406",
        floor: 4,
        type: "Deluxe Panorama",
        price: 890,
        status: "Reserved",
        sqft: 620,
        view: "City View",
        features: ["Queen Bed", "Smart Tech", "Rain Shower"],
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_0Rya-jteO37mpCaQxTy73aHjnn-KSCLWyCklYZGruHz_WcskYCWHBf9e4oKk1iylY2c2UFZ-dOSzZmDazfceRLlUagIHU3SUbpdHIDU6lySzW7R0gTifyujUjZsEjRzXFYZpr5iya5E2EICNrSUik4bksKfAEUpFnxlR3tBh4aip9SL68a91rbsYaDm3fqJBBLFw2qeGM2y-vW5VNIrG0oJGiLCF0xhJ0uhs3WpEez0ZqY2_gA9nArzh-RQZp5G9TB5KINE05QI",
        dataAlt: "Deluxe panorama room twilight city view"
      },
      {
        number: "407",
        floor: 4,
        type: "Garden Sanctuary",
        price: 950,
        status: "Available",
        sqft: 750,
        view: "Garden View",
        features: ["King Bed", "Plunge Pool", "Yoga Mat"],
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOOhCvff3B1dhUad_djNv47TI9hMxntjQTOMSoBGcRfgPqp_pWHun_VFui3Xe1ujMlBaKH9trDstPMc-1MekP39Ip8DU3x4WuWeXvpfibqvtzHk3g1KCZ4Ke_pbNVqT4BQNZrd-hS1G3rYmUrYhXU8WxmRtHn3lFSMMzvln3ppCyDQnPsGmpxDcId8g3dz8FpiBLSSQjl0EIPiSso8dCGin7O2SlNqf_C8eD1tqpclgvBLaXQ85jeWaCrkkpFBy6GeFVchs-YoRu0",
        dataAlt: "Garden sanctuary room private courtyard stone plunge pool"
      },
      {
        number: "408",
        floor: 4,
        type: "Royal Ocean Suite",
        price: 2400, // Presidential
        status: "Reserved",
        sqft: 1500,
        view: "Panoramic View",
        features: ["King Bed", "Private Terrace", "Jacuzzi"],
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsK62n4AoGnwQhGxTFA1zBLaOMr924tABTG-wZPq-On2heezjkII4NaVefVNBotVM8FstwUd8gF8mrrLI-mF5SRCSXwSKtxLldt6HyqllVm_M4sAtT-GlD2xlKY3IKrediMrq9wKaWo3Iz6RF6bxlT8XzVpvCUnadeEyHjUFX1RLg6YurrBGU5PTAXr09b6tcpu_hxZcvIWA_5q99evbByv7COswTTI2_Y_Equp6sx9I06wkPc9ay0gUtYrvzWS1zHKAwuiFvTZU8",
        dataAlt: "Presidential penthouse suite twilight cityscape view"
      },

      // Floor 3
      {
        number: "301",
        floor: 3,
        type: "Royal Ocean Suite",
        price: 1100,
        status: "Available",
        sqft: 800,
        view: "Sea View",
        features: ["King Bed", "Balcony"],
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCsGqiVdLQwKg5V0bVJfhLT3W5wHAZprQv30V4SB6C9xzaeWgRzoH3_P0qH6KKdO8tYS5fUHcBEJAySqimQgWizGD8hzru95I1nGXzFjglvBtDiq2x8nChTkBQfzvw6jUEY-wkegiax5IR3X3bx0pukEivamKaR7tRp-m_8qkvn4GHm-tNbrR0ktyVlEKd9pnKQsBsXbnqf3Z5Cq4Ojv_Z--8cxroVaBlkA2unNLw_gifuss4-N9ni9UjJawA1fahuHoWkNj2-Nm4"
      },
      {
        number: "302",
        floor: 3,
        type: "Deluxe Panorama",
        price: 850,
        status: "Available",
        sqft: 600,
        view: "City View",
        features: ["Queen Bed", "Smart Tech"],
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_0Rya-jteO37mpCaQxTy73aHjnn-KSCLWyCklYZGruHz_WcskYCWHBf9e4oKk1iylY2c2UFZ-dOSzZmDazfceRLlUagIHU3SUbpdHIDU6lySzW7R0gTifyujUjZsEjRzXFYZpr5iya5E2EICNrSUik4bksKfAEUpFnxlR3tBh4aip9SL68a91rbsYaDm3fqJBBLFw2qeGM2y-vW5VNIrG0oJGiLCF0xhJ0uhs3WpEez0ZqY2_gA9nArzh-RQZp5G9TB5KINE05QI"
      },

      // Floor 2
      {
        number: "215",
        floor: 2,
        type: "Deluxe Panorama",
        price: 890,
        status: "Reserved",
        sqft: 620,
        view: "City View",
        features: ["Queen Bed", "Desk Space"],
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_0Rya-jteO37mpCaQxTy73aHjnn-KSCLWyCklYZGruHz_WcskYCWHBf9e4oKk1iylY2c2UFZ-dOSzZmDazfceRLlUagIHU3SUbpdHIDU6lySzW7R0gTifyujUjZsEjRzXFYZpr5iya5E2EICNrSUik4bksKfAEUpFnxlR3tBh4aip9SL68a91rbsYaDm3fqJBBLFw2qeGM2y-vW5VNIrG0oJGiLCF0xhJ0uhs3WpEez0ZqY2_gA9nArzh-RQZp5G9TB5KINE05QI"
      },

      // Floor 1
      {
        number: "101",
        floor: 1,
        type: "Royal Ocean Suite",
        price: 1200,
        status: "Reserved",
        sqft: 850,
        view: "Ocean View",
        features: ["King Bed", "Rain Shower"],
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCsGqiVdLQwKg5V0bVJfhLT3W5wHAZprQv30V4SB6C9xzaeWgRzoH3_P0qH6KKdO8tYS5fUHcBEJAySqimQgWizGD8hzru95I1nGXzFjglvBtDiq2x8nChTkBQfzvw6jUEY-wkegiax5IR3X3bx0pukEivamKaR7tRp-m_8qkvn4GHm-tNbrR0ktyVlEKd9pnKQsBsXbnqf3Z5Cq4Ojv_Z--8cxroVaBlkA2unNLw_gifuss4-N9ni9UjJawA1fahuHoWkNj2-Nm4"
      }
    ];
  });

  // Active Guests State
  const [guests, setGuests] = useState(() => {
    const savedGuests = localStorage.getItem("luxe_guests");
    if (savedGuests) return JSON.parse(savedGuests);

    return [
      {
        id: 1,
        name: "Julianne Waters",
        vip: "VIP • Platinum Member",
        room: "Suite 402",
        roomNumber: "402",
        type: "Panoramic Suite",
        checkIn: "20 May, 14:00",
        checkOut: "25 May, 11:00",
        status: "Checked In",
        initials: "JW",
        badgeClass: "bg-secondary-container text-secondary"
      },
      {
        id: 2,
        name: "Marcus Bennett",
        vip: "Corporate",
        room: "Room 215",
        roomNumber: "215",
        type: "Deluxe King",
        checkIn: "21 May, 15:30",
        checkOut: "23 May, 10:00",
        status: "Pending",
        initials: "MB",
        badgeClass: "bg-surface-container-highest text-primary"
      },
      {
        id: 3,
        name: "Sarah Chen",
        vip: "Late Departure",
        room: "Suite 101",
        roomNumber: "101",
        type: "Ocean View",
        checkIn: "18 May, 12:00",
        checkOut: "22 May, 13:00",
        status: "Overdue",
        initials: "SC",
        badgeClass: "bg-error-container text-error"
      }
    ];
  });

  // Pending System Requests (Notifications, Valet, Dining Orders)
  const [requests, setRequests] = useState(() => {
    const savedRequests = localStorage.getItem("luxe_requests");
    if (savedRequests) return JSON.parse(savedRequests);

    return [
      {
        id: 1,
        roomNumber: "402",
        guestName: "Julianne Waters",
        type: "Room Service",
        details: "Royal Benedict, Artisanal Sourdough toast, Double Espresso",
        status: "Pending",
        time: "5 mins ago",
        cost: 46
      },
      {
        id: 2,
        roomNumber: "101",
        guestName: "Sarah Chen",
        type: "Valet",
        details: "Requesting Tesla Model S at front lobby",
        status: "Pending",
        time: "15 mins ago",
        cost: 0
      }
    ];
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("luxe_rooms", JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem("luxe_guests", JSON.stringify(guests));
  }, [guests]);

  useEffect(() => {
    localStorage.setItem("luxe_requests", JSON.stringify(requests));
  }, [requests]);

  // Action: Book a Room
  const bookRoom = (roomType, checkIn, checkOut, guestCount, guestName) => {
    // Find first available room of this type
    const availableRoom = rooms.find(r => r.type === roomType && r.status === "Available");
    if (!availableRoom) return { success: false, message: "No rooms of this type are currently available." };

    // Update room status
    setRooms(prevRooms =>
      prevRooms.map(r =>
        r.number === availableRoom.number ? { ...r, status: "Reserved" } : r
      )
    );

    // Create a guest record
    const initials = guestName ? guestName.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2) : "G";
    const newGuest = {
      id: Date.now(),
      name: guestName || "Guest User",
      vip: "Online Reservation",
      room: `Room ${availableRoom.number}`,
      roomNumber: availableRoom.number,
      type: roomType,
      checkIn: checkIn || "Today, 15:00",
      checkOut: checkOut || "Tomorrow, 11:00",
      status: "Pending",
      initials,
      badgeClass: "bg-surface-container-highest text-primary"
    };

    setGuests(prevGuests => [newGuest, ...prevGuests]);

    // Create a pending check-in request
    const newRequest = {
      id: Date.now() + 1,
      roomNumber: availableRoom.number,
      guestName: newGuest.name,
      type: "Check-in Request",
      details: `${roomType} Booking for ${guestCount} guest(s)`,
      status: "Pending",
      time: "Just now",
      cost: availableRoom.price
    };

    setRequests(prevRequests => [newRequest, ...prevRequests]);

    return { success: true, roomNumber: availableRoom.number };
  };

  // Action: Add In-Room Dining Order
  const addDiningOrder = (roomNumber, itemsSummary, totalCost) => {
    // Find guest in that room
    const guest = guests.find(g => g.roomNumber === roomNumber) || { name: `Room ${roomNumber} Guest` };

    const newRequest = {
      id: Date.now(),
      roomNumber,
      guestName: guest.name,
      type: "Room Service",
      details: itemsSummary,
      status: "Pending",
      time: "Just now",
      cost: totalCost
    };

    setRequests(prevRequests => [newRequest, ...prevRequests]);
    return { success: true };
  };

  // Action: Complete / Dismiss a staff request
  const completeRequest = (id) => {
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  // Action: Check In/Check Out guests
  const updateGuestStatus = (guestId, newStatus) => {
    setGuests(prevGuests =>
      prevGuests.map(g => {
        if (g.id === guestId) {
          // If checking out, release the room
          if (newStatus === "Checked Out") {
            setRooms(prevRooms =>
              prevRooms.map(r =>
                r.number === g.roomNumber ? { ...r, status: "Available" } : r
              )
            );
          }
          return { ...g, status: newStatus };
        }
        return g;
      }).filter(g => g.status !== "Checked Out") // Optionally filter out checked out guests from live dashboard list
    );
  };

  return (
    <AppContext.Provider
      value={{
        rooms,
        guests,
        requests,
        bookRoom,
        addDiningOrder,
        completeRequest,
        updateGuestStatus,
        setRooms
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
