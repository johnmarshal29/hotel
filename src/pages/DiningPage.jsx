import React, { useState, useContext } from "react";
import { AppContext } from "../AppContext";

export default function DiningPage() {
  const { guests, addDiningOrder } = useContext(AppContext);
  const [activeCategory, setActiveCategory] = useState("breakfast");
  const [cart, setCart] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("402"); // default room
  const [successOrder, setSuccessOrder] = useState(false);

  const menuData = {
    breakfast: [
      {
        id: 1,
        name: "Royal Benedict",
        price: 34,
        desc: "Poached organic eggs, house-cured smoked salmon, and gold-leaf hollandaise on a toasted brioche muffin.",
        tag: "Signature",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkYVDxE-MD_pFykqDmsLXlWMbIjuWOSHtQd364Ay6xYpq1aNj4_Ejq4ex6Solt4eh7UsTz5W7xxkJVrMKizOfLEgQ0I04BOFekmupgRlGk4qe5aJlHoETpgQP6U_SkBh_1SxUw3EmG3orGETAo1EySwCrVeCCjmzLtTLCcY_TqATP_im7_UDx-6QdJwY-HLUk_rVAGH5mcIgvHxmz7qSQBviS8mqCzydHXVEGMNwF-iftdZueDUt2SNqTet96GTyfRM5NYXKhScW4",
        prompt: "Poached eggs Benedict on a white plate in bright morning suite lighting"
      },
      {
        id: 2,
        name: "Seasonal Berry Bowl",
        price: 22,
        desc: "A selection of wild berries, organic greek yogurt, and house-made truffle honey granola.",
        tag: "Fresh",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6_uA6R8qxhG4VMhX_SvKU3lIS0npq02O82098Unuz0jOfqe42Jv5PGJ0qtd7p5xXh29LZZSZ_O894-_LKzJuEo8yEphfnW2UO9rMrQG5YozihF9C6z64OEbnrBIp5QSYtCEGe8DK5K_wGAQ72pNxbGlHOfVHM0MF0Lymm5AQViCBC8CYGbWFBvhdJEmDNiFwhYVfWHimNwCatIR3znuTQPm5LoyaMmIRGJmg6L0-syZEVuevNFfkEm__hUewvffYgfgJJ1r__woQ",
        prompt: "A minimalist berry and artisan yogurt granola bowl served in handcrafted ceramic"
      }
    ],
    main: [
      {
        id: 3,
        name: "Wagyu Filet",
        price: 78,
        desc: "8oz A5 Wagyu, charred asparagus, and dark chocolate infused red wine reduction.",
        tag: "Chef Special",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBixgOAj6BoLloCtgUu5GLpVHyzNoaU_QBSwA2gL_joeOzVeBXg6DIQtjDMNimEKX3qfOCC1RGoEcNISD-Tqrua073FKcLeVe1SethdobB1nW1e7kN2EZf8kXwQrot0nMOYiGf2_kSkLSdfIgWOv37DzgCxGK1mKlDei2cLHQW1Icd6Ya0-5BhqYoqcoiqfjpXLVUjatbeBYlzoILuIHkPv09aGD-T4B94xvWr1VW1ET6gBw9OVL96JbejMb06bfY-yv9Z53qbonG4", // reuse staff avatar / lobby as placeholder or similar. Let's use similar visual styling.
        prompt: "Perfect Wagyu filet steak plating, high-end restaurant food styling"
      },
      {
        id: 4,
        name: "Lobster Risotto",
        price: 62,
        desc: "Butter-poached Maine lobster over creamy saffron-infused arborio rice and microgreens.",
        tag: "Luxury",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkYVDxE-MD_pFykqDmsLXlWMbIjuWOSHtQd364Ay6xYpq1aNj4_Ejq4ex6Solt4eh7UsTz5W7xxkJVrMKizOfLEgQ0I04BOFekmupgRlGk4qe5aJlHoETpgQP6U_SkBh_1SxUw3EmG3orGETAo1EySwCrVeCCjmzLtTLCcY_TqATP_im7_UDx-6QdJwY-HLUk_rVAGH5mcIgvHxmz7qSQBviS8mqCzydHXVEGMNwF-iftdZueDUt2SNqTet96GTyfRM5NYXKhScW4",
        prompt: "Golden saffron risotto with butter lobster tail on white plate"
      }
    ],
    drinks: [
      {
        id: 5,
        name: "Vintage Reserve",
        price: 110,
        desc: "A bottle of our finest 2012 vintage champagne, chilled to perfection and served with flutes.",
        tag: "Premium",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4nisc4XMEhgz4mTZqZqYjVrOjhPvXucj684T_IZCcFZfr_BIkyRIzfuRFtbNPtPFK8VDAGBBLz-4inKNE1LCmTtF8cEjreO0grgR2Fb7v-hMzHZrAtfyzcWEr7L3g0iDf-2qBYSlibEngN9FoSa6Y4YgiQ72zSd-c4W0KSBSEvjmUu6SltMxw4s4GSK1uO0J_ajHRSVa5FyQA6Ew2Ct2jJOCEowwrS49v8U2ltAosttZsIGCEJkx2ZBrlKSAogmEd-SExTLk-6dk",
        prompt: "Vintage champagne bottle in silver bucket, two crystal flutes in suite"
      },
      {
        id: 6,
        name: "Artisan Espresso",
        price: 12,
        desc: "Single-origin beans roasted in-house, served with a gold-dusted dark chocolate truffle.",
        tag: "Classic",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6_uA6R8qxhG4VMhX_SvKU3lIS0npq02O82098Unuz0jOfqe42Jv5PGJ0qtd7p5xXh29LZZSZ_O894-_LKzJuEo8yEphfnW2UO9rMrQG5YozihF9C6z64OEbnrBIp5QSYtCEGe8DK5K_wGAQ72pNxbGlHOfVHM0MF0Lymm5AQViCBC8CYGbWFBvhdJEmDNiFwhYVfWHimNwCatIR3znuTQPm5LoyaMmIRGJmg6L0-syZEVuevNFfkEm__hUewvffYgfgJJ1r__woQ",
        prompt: "Minimalist espresso cup on tray with single dark chocolate"
      }
    ]
  };

  const handleAddToCart = (item) => {
    setSuccessOrder(false);
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prevCart, { ...item, qty: 1 }];
    });
  };

  const handleRemoveFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((i) => i.id !== itemId));
  };

  const handleUpdateQty = (itemId, change) => {
    setCart((prevCart) =>
      prevCart
        .map((i) => {
          if (i.id === itemId) {
            const nextQty = i.qty + change;
            return { ...i, qty: nextQty };
          }
          return i;
        })
        .filter((i) => i.qty > 0)
    );
  };

  const calculateSubtotal = () => cart.reduce((acc, i) => acc + i.price * i.qty, 0);
  const calculateServiceCharge = () => calculateSubtotal() * 0.15;
  const calculateTotal = () => calculateSubtotal() + calculateServiceCharge();

  const handleConfirmOrder = () => {
    if (cart.length === 0) return;

    const itemsSummary = cart.map((i) => `${i.name} (x${i.qty})`).join(", ");
    const totalCost = calculateTotal();

    const res = addDiningOrder(selectedRoom, itemsSummary, totalCost);
    if (res.success) {
      setSuccessOrder(true);
      setCart([]);
    }
  };

  // Get currently active rooms with checked-in guests to list in delivery selector
  const activeRooms = guests.map(g => g.roomNumber).sort();

  return (
    <div className="bg-background min-h-screen text-on-surface pt-24 pb-20">
      <main className="max-w-7xl mx-auto px-8 md:px-16 py-12 flex flex-col lg:flex-row gap-12">
        {/* Left Content Area: Menu */}
        <div className="flex-1">
          {/* Header */}
          <section className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl text-primary mb-2">In-Room Dining</h1>
            <p className="text-on-surface-variant font-sans text-sm md:text-base leading-relaxed max-w-2xl">
              Exquisite culinary experiences delivered directly to your door. Our chefs select only the finest seasonal ingredients for a menu of quiet luxury.
            </p>
          </section>

          {/* Category Tabs */}
          <div className="flex space-x-8 border-b border-outline-variant mb-8 overflow-x-auto whitespace-nowrap">
            {Object.keys(menuData).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSuccessOrder(false);
                }}
                className={`pb-4 font-sans text-xs font-semibold uppercase tracking-widest transition-all duration-200 ${
                  activeCategory === cat
                    ? "border-b-2 border-secondary text-primary"
                    : "text-on-surface-variant hover:text-secondary border-b-2 border-transparent"
                }`}
              >
                {cat === "breakfast" ? "Breakfast" : cat === "main" ? "Main Courses" : "Drinks"}
              </button>
            ))}
          </div>

          {/* Food Menu Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {menuData[activeCategory].map((item) => (
              <div key={item.id} className="bg-surface-container-lowest border border-outline-variant group flex flex-col hover-lift">
                <div className="relative h-64 overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    alt={item.name}
                    src={item.img}
                  />
                  {item.tag && (
                    <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-primary px-3 py-1 font-sans text-[10px] uppercase tracking-wider font-bold">
                      {item.tag}
                    </span>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-xl font-medium text-primary">{item.name}</h3>
                    <span className="font-sans text-sm font-semibold text-secondary">₹{item.price}</span>
                  </div>
                  <p className="text-on-surface-variant font-sans text-xs leading-relaxed mb-6 flex-1">
                    {item.desc}
                  </p>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-primary text-on-primary py-3 font-sans text-xs font-bold uppercase tracking-widest transition-opacity hover:opacity-90 active:scale-[0.98] rounded-sm"
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Floating Cart */}
        <aside className="w-full lg:w-96">
          <div className="sticky top-28 bg-surface-container-low border border-outline-variant p-8 flex flex-col h-fit rounded-sm shadow-sm">
            <h2 className="font-serif text-2xl text-primary mb-6 uppercase tracking-tighter font-semibold">Your Order</h2>

            {successOrder && (
              <div className="bg-secondary-container border border-secondary text-primary p-4 mb-6 rounded-none text-xs leading-relaxed animate-fade-in">
                <strong>Tray confirmed!</strong> Your culinary order has been dispatched. Estimated delivery: 30-40 mins to Suite {selectedRoom}.
              </div>
            )}

            {/* Room Delivery Address selector */}
            <div className="mb-6">
              <label className="block font-sans text-[9px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                Deliver to Suite / Room
              </label>
              <select
                value={selectedRoom}
                onChange={(e) => {
                  setSelectedRoom(e.target.value);
                  setSuccessOrder(false);
                }}
                className="w-full px-3 py-2 bg-surface-container border border-outline-variant text-xs font-sans focus:outline-none focus:ring-1 focus:ring-secondary rounded-sm"
              >
                {activeRooms.map(rm => (
                  <option key={rm} value={rm}>Suite {rm}</option>
                ))}
                {/* Fallbacks if list is empty */}
                {!activeRooms.includes("402") && <option value="402">Suite 402 (Julianne)</option>}
                {!activeRooms.includes("215") && <option value="215">Room 215 (Marcus)</option>}
                {!activeRooms.includes("101") && <option value="101">Suite 101 (Sarah)</option>}
              </select>
            </div>

            <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="text-center py-8 text-on-surface-variant opacity-70">
                  <span className="material-symbols-outlined text-outline-variant text-4xl mb-2">restaurant</span>
                  <p className="font-sans text-xs font-bold uppercase tracking-wider">Your tray is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start border-b border-outline-variant/40 pb-4 animate-fade-in">
                    <div>
                      <h4 className="font-sans text-xs font-bold uppercase text-primary mb-1">{item.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <button
                          onClick={() => handleUpdateQty(item.id, -1)}
                          className="w-5 h-5 border border-outline-variant flex items-center justify-center text-xs hover:bg-surface-container-high"
                        >
                          -
                        </button>
                        <span className="font-sans text-xs font-semibold">{item.qty}</span>
                        <button
                          onClick={() => handleUpdateQty(item.id, 1)}
                          className="w-5 h-5 border border-outline-variant flex items-center justify-center text-xs hover:bg-surface-container-high"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-sans text-xs font-bold text-primary">₹{item.price * item.qty}</span>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="text-error font-sans text-[10px] font-semibold uppercase tracking-tighter hover:underline mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-outline-variant pt-6 space-y-3 mb-8">
              <div className="flex justify-between text-xs font-semibold uppercase text-on-surface-variant">
                <span>Subtotal</span>
                <span>₹{calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold uppercase text-on-surface-variant">
                <span>Service Charge (15%)</span>
                <span>₹{calculateServiceCharge().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold uppercase text-primary pt-2 border-t border-outline-variant border-dotted">
                <span>Total</span>
                <span>₹{calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleConfirmOrder}
              disabled={cart.length === 0}
              className="w-full bg-primary text-on-primary py-4 font-sans text-xs font-bold uppercase tracking-widest disabled:bg-outline-variant disabled:cursor-not-allowed transition-all hover:opacity-95 rounded-sm"
            >
              Confirm Order
            </button>
            <p className="mt-4 text-center font-sans text-[10px] text-on-surface-variant">
              Estimated Delivery: 30-40 mins
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}
