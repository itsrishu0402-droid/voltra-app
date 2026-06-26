"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { FaWhatsapp } from "react-icons/fa";

export default function Home() {
  const [customerEmail, setCustomerEmail] = useState("");

useEffect(() => {
  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user?.email) {
      setCustomerEmail(user.email);
    }
  }

  checkUser();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setCustomerEmail(session?.user?.email || "");
  });

  return () => {
    subscription.unsubscribe();
  };
}, []);

async function logoutCustomer() {
  await supabase.auth.signOut();
  setCustomerEmail("");
}
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-black">
      <div className="max-w-7xl mx-auto px-6">

        {/* NAVBAR */}
       <nav className="mt-4 sm:mt-6 mb-8">
  {/* Mobile Navbar */}
  <div className="sm:hidden bg-white rounded-[28px] shadow-xl border border-gray-100 p-4">
    <div className="flex items-center gap-3">
      <Link href="/" className="flex items-center gap-3">
        <div className="bg-green-700 text-white font-extrabold w-12 h-12 rounded-full flex items-center justify-center shadow-md">
          K
        </div>

        <div>
          <h1 className="text-xl font-extrabold text-gray-900 leading-tight">
            Kyro Mobility
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Premium rides, privileged experience
          </p>
        </div>
      </Link>
    </div>

     

    <div className="grid grid-cols-2 gap-3 mt-5">
  <Link
    href={customerEmail ? "/book" : "/login"}
    className="bg-green-700 text-white py-3 rounded-xl font-extrabold text-sm text-center shadow-md hover:bg-green-800 transition"
  >
    Book Now
  </Link>

  <a
  href="https://wa.me/919279167887"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-gray-900 text-white py-3 rounded-xl font-extrabold text-sm shadow-md hover:bg-black transition flex items-center justify-center gap-2"
>
  <FaWhatsapp className="text-green-400" size={16} />
  WhatsApp
</a>
</div>
  </div>

  {/* Desktop Navbar */}
  <div className="hidden sm:flex items-center justify-between bg-white rounded-full shadow-md px-8 py-4">
    <Link href="/" className="flex items-center gap-3">
      <div className="bg-green-700 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center">
        K
      </div>

      <span className="text-2xl font-bold text-green-700 whitespace-nowrap">
        Kyro Mobility
      </span>
   <p className="text-xs text-gray-500 font-medium bold">
  Premium rides, privileged experience
</p>
    </Link>

    <div className="hidden lg:flex gap-8 text-gray-700 font-medium">
      <a href="#services">Services</a>
      <a href="#routes">Routes</a>
      <a href="#fleet">Fleet</a>
      <a href="#savings">Savings</a>
      <a href="#faqs">FAQs</a>
    </div>

    {customerEmail ? (
  <div className="flex items-center gap-4">
    <div className="text-right">
      <p className="text-xs text-gray-500 font-semibold">Logged in as</p>
      <p className="text-sm font-bold text-green-700 max-w-[180px] truncate">
        {customerEmail}
      </p>
    </div>

    <Link
      href="/book"
      className="bg-green-700 text-white px-7 py-3 rounded-full font-bold shadow-lg hover:bg-green-800 transition"
    >
      Book Now
    </Link>

    <button
      onClick={logoutCustomer}
      className="text-sm font-bold text-gray-500 hover:text-red-600"
    >
      Logout
    </button>
  </div>
) : (
  <Link
    href="/login"
    className="bg-green-700 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-green-800 transition"
  >
    Login
  </Link>
)}
  </div>
</nav>

        {/* HERO */}
        <section id="services" className="py-12 sm:py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <h2 className="text-3xl sm:text-5xl font-extrabold mb-8 text-center sm:text-left">
      Our Services
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div className="bg-[#f7f8f2] border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all">
        <h3 className="text-xl sm:text-2xl font-bold leading-snug">
          ✈ Airport Transfers
        </h3>

        <p className="text-gray-600 text-base sm:text-lg mt-3 leading-relaxed">
          Jamshedpur to Ranchi Airport and Kolkata Airport pickup & drop.
        </p>

        <p className="text-sm font-bold text-green-700 mt-4">
          Available Now
        </p>
      </div>

      <div className="bg-[#f7f8f2] border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all">
        <h3 className="text-xl sm:text-2xl font-bold leading-snug">
          🚗 Outstation Trips
        </h3>

        <p className="text-gray-600 text-base sm:text-lg mt-3 leading-relaxed">
          Comfortable rides for nearby cities and planned long-distance trips.
        </p>

        <p className="text-sm font-bold text-green-500 mt-4">
          On Request
        </p>
      </div>

      <div className="bg-[#f7f8f2] border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all">
        <h3 className="text-xl sm:text-2xl font-bold leading-snug">
          🏨 Hotel Guest Travel
        </h3>

        <p className="text-gray-600 text-base sm:text-lg mt-3 leading-relaxed">
          Reliable cab support for hotel guests, airport pickup and local travel.
        </p>

        <p className="text-sm font-bold text-green-500 mt-4">
          On Request
        </p>
      </div>

      <div className="bg-[#f7f8f2] border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all">
        <h3 className="text-xl sm:text-2xl font-bold leading-snug">
          🧳 Corporate Travel
        </h3>

        <p className="text-gray-600 text-base sm:text-lg mt-3 leading-relaxed">
          Professional travel support for business visitors and company guests.
        </p>

        <p className="text-sm font-bold text-gray-500 mt-4">
          Coming Soon
        </p>
      </div>
    </div>
  </div>
</section>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-10 sm:py-16">
  {/* LEFT SIDE TEXT */}
  <div>
    <div className="inline-block bg-green-100 text-green-800 px-5 py-2 rounded-full text-sm font-bold mb-8">
      ● Premium Airport Transfers from Jamshedpur
    </div>

    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight">
      Travel Smart <br />
      <span className="text-green-700">
        Save More.
      </span>
    </h1>

    <p className="text-base sm:text-xl text-gray-600 mt-6 sm:mt-8 leading-relaxed max-w-xl">
      Book reliable airport transfers from Jamshedpur to Ranchi Airport
      and Kolkata Airport with transparent pricing, comfortable vehicles
      and professional service.
    </p>

    {customerEmail && (
  <div className="mt-4 bg-green-50 border border-green-100 rounded-2xl p-3">
    <p className="text-xs text-gray-500 font-semibold">Logged in as</p>
    <p className="text-sm font-bold text-green-700 truncate">
      {customerEmail}
    </p>
  </div>
)}

<div className="grid grid-cols-2 gap-3 mt-4">
  <Link
    href={customerEmail ? "/book" : "/login"}
    className="bg-green-700 text-white py-3 rounded-xl font-bold text-sm text-center shadow-md hover:bg-green-800 transition"
  >
    {customerEmail ? "Book Now" : "Login"}
  </Link>

  <a
    href="https://wa.me/919279167887"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-gray-900 text-white py-3 rounded-xl font-bold text-sm text-center shadow-md hover:bg-black transition"
  >
    <FaWhatsapp className="text-green-400 inline-block mr-2" size={16} />
    WhatsApp
  </a>
</div>

    <div className="flex flex-wrap gap-6 mt-10 text-sm font-bold text-gray-600">
      <span>✈ Airport Specialists</span>
      <span>💰 Fixed Pricing</span>
      <span>🚗 Comfortable Vehicles</span>
    </div>
  </div>

  {/* RIGHT SIDE SAVINGS CARD */}
  <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
    <div className="bg-green-700 p-6 border-b border-green-800">
      <p className="text-sm font-bold text-white">
        EST. SAVINGS
      </p>

      <div className="flex justify-between items-end mt-2">
        <h2 className="text-5xl font-extrabold text-white">
          ₹200+
        </h2>
        <p className="text-sm text-green-100">
          Per Ranchi airport trip
        </p>
      </div>
    </div>

    <div className="p-6">
      <p className="text-sm font-bold text-gray-500 mb-3">
        ROUTE
      </p>

      <div className="bg-gray-50 rounded-xl p-4 mb-5">
        Jamshedpur ↔ Ranchi Airport
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-5 rounded-xl">
          <p className="text-gray-500 text-sm">
            Local Cab
          </p>
          <p className="text-2xl font-bold">
            ₹1699/- 
          </p>
          <p className="text-xs text-gray-500 mt-1">
    Toll and parking extra
  </p>
        </div>

        <div className="bg-green-700 p-5 rounded-xl border border-green-800">
          <p className="text-white text-sm font-semibold">
            Kyro Mobility
          </p>
          <p className="text-2xl font-bold text-white">
            ₹1499/-
          </p>
           <p className="text-xs text-green-100 mt-1">
    Including toll and parking
  </p>
        </div>
      </div>

      <p className="text-gray-500 text-sm mt-5">
        Customers can later check their total trips and savings using their phone number.
      </p>
    </div>
  </div>
</section>

      {/* SERVICES */}
      <section id="services" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-8">
            Why Choose Kyro Mobility?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="border rounded-2xl p-6">
              <h3 className="text-xl font-bold">✈ Airport Specialists</h3>
              <p className="text-gray-600 mt-3">
                Focused only on airport pickup and drop services.
              </p>
            </div>

            <div className="border rounded-2xl p-6">
              <h3 className="text-xl font-bold">⏰ On-Time Pickup</h3>
              <p className="text-gray-600 mt-3">
                Planned rides for better time management.
              </p>
            </div>

            <div className="border rounded-2xl p-6">
              <h3 className="text-xl font-bold">💰 Transparent Fare</h3>
              <p className="text-gray-600 mt-3">
                Clear pricing without unnecessary surprises.
              </p>
            </div>

            <div className="border rounded-2xl p-6">
              <h3 className="text-xl font-bold">🚗 Comfortable Vehicles</h3>
              <p className="text-gray-600 mt-3">
                Tata Punch and Ertiga CNG for comfortable travel.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* SMALL SAVINGS SECTION */}
<section className="py-20">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight text-center">
  <span className="text-green-700">Small Savings.</span>
  <br className="sm:hidden" />
  <span className="text-white sm:text-black"> Big Difference.</span>
</h2>

      <p className="text-gray-300 sm:text-gray-600 text-base sm:text-lg mt-4 max-w-2xl mx-auto leading-relaxed px-2">
        Every trip with Kyro Mobility helps you save more compared to usual
        local cab pricing while giving you a reliable and comfortable ride.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all">
        <div className="text-4xl mb-4">✈️</div>

        <h3 className="text-2xl font-bold">
          1 Airport Trip
        </h3>

        <p className=" font-semibold mt-2">
          Save on every ride
        </p>

        <p className="text-gray-600 mt-4 leading-relaxed">
          A single Jamshedpur to Ranchi Airport trip can already help you save
          compared to typical local cab fares.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all">
        <div className="text-4xl mb-4">💰</div>

        <h3 className="text-2xl font-bold">
          5 Regular Trips
        </h3>

        <p className="font-semibold mt-2">
          Bigger monthly savings
        </p>

        <p className="text-gray-600 mt-4 leading-relaxed">
          Frequent airport travelers can see their total savings grow over time,
          especially when using Kyro Mobility regularly.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all">
        <div className="text-4xl mb-4">🚗</div>

        <h3 className="text-2xl font-bold">
          Better Travel Experience
        </h3>

        <p className="font-semibold mt-2">
          Value beyond price
        </p>

        <p className="text-gray-600 mt-4 leading-relaxed">
          Along with savings, you get clean vehicles, better planning,
          transparent service and reliable pickup support.
        </p>
      </div>
    </div>
  </div>
</section>
<section className="py-10 sm:py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <div className="bg-green-700 text-white rounded-3xl p-6 sm:p-10 md:p-14 shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            Travel Smarter with Kyro Mobility
          </h2>

          <p className="mt-5 text-green-50 text-base sm:text-lg leading-relaxed">
            From airport transfers to outstation and hotel travel support,
            Kyro Mobility focuses on reliable service, comfortable rides and
            better value for every customer.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-white/10 rounded-2xl p-4 sm:p-6">
            <p className="text-2xl sm:text-3xl font-extrabold">24/7</p>
            <p className="mt-2 text-green-50 text-sm sm:text-base">
              Booking support
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 sm:p-6">
            <p className="text-2xl sm:text-3xl font-extrabold">2+</p>
            <p className="mt-2 text-green-50 text-sm sm:text-base">
              Primary routes
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 sm:p-6">
            <p className="text-2xl sm:text-3xl font-extrabold">₹0</p>
            <p className="mt-2 text-green-50 text-sm sm:text-base">
              Hidden charges
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 sm:p-6">
            <p className="text-2xl sm:text-3xl font-extrabold">100%</p>
            <p className="mt-2 text-green-50 text-sm sm:text-base">
              Customer focus
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ROUTES */}
      <section id="routes" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-8">
            Airport Transfer Routes
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow">
              <h3 className="text-2xl font-bold">
                Jamshedpur ↔ Ranchi Airport
              </h3>
              <p className="text-gray-600 mt-3">
                Available for pickup and drop.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow">
              <h3 className="text-2xl font-bold">
                Jamshedpur ↔ Kolkata Airport
              </h3>
              <p className="text-gray-600 mt-3">
                Available for pickup and drop.
              </p>
            </div>
          </div>
        </div>
      </section>
<section id="faqs" className="py-12 sm:py-16 bg-[#f7f8f2]">
  <div className="max-w-6xl mx-auto px-4 sm:px-6">
    <div className="text-center mb-10">
      <h2 className="text-4xl sm:text-5xl font-extrabold tracking-wide">
        FAQs
      </h2>
      <p className="text-gray-600 mt-4 text-base sm:text-lg">
        Everything you need to know before booking your ride.
      </p>
    </div>

    <div className="space-y-4">
      <details className="group bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <summary className="flex justify-between items-center cursor-pointer list-none px-6 py-5 text-lg sm:text-xl font-bold">
          Which routes are currently available?
          <span className="text-green-700 group-open:rotate-180 transition-transform">
            ▼
          </span>
        </summary>
        <div className="px-6 pb-5 text-gray-600 leading-relaxed">
          Currently, Kyro Mobility provides airport transfer services from
          Jamshedpur/Tata to Ranchi Airport and Kolkata Airport, including return
          trips from these airports to Jamshedpur/Tata.
        </div>
      </details>

      <details className="group bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <summary className="flex justify-between items-center cursor-pointer list-none px-6 py-5 text-lg sm:text-xl font-bold">
          How can I book a ride?
          <span className="text-green-700 group-open:rotate-180 transition-transform">
            ▼
          </span>
        </summary>
        <div className="px-6 pb-5 text-gray-600 leading-relaxed">
          You can book directly through our website booking form or contact us on
          WhatsApp. After receiving your booking request, our team will confirm
          the fare, vehicle and driver details.
        </div>
      </details>

      <details className="group bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <summary className="flex justify-between items-center cursor-pointer list-none px-6 py-5 text-lg sm:text-xl font-bold">
          Do I need to pay for toll and parking?
          <span className="text-green-700 group-open:rotate-180 transition-transform">
            ▼
          </span>
        </summary>
        <div className="px-6 pb-5 text-gray-600 leading-relaxed">
          No, our pricing includes toll and parking charges.
        </div>
      </details>

      <details className="group bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <summary className="flex justify-between items-center cursor-pointer list-none px-6 py-5 text-lg sm:text-xl font-bold">
          Will the pricing will change with fuel prices?
          <span className="text-green-700 group-open:rotate-180 transition-transform">
            ▼
          </span>
        </summary>
        <div className="px-6 pb-5 text-gray-600 leading-relaxed">
          No, our pricing is fixed and will not change with fuel price fluctuations. You can book your ride with confidence, knowing that the fare you see is the fare you pay.
        </div>
      </details>

      <details className="group bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <summary className="flex justify-between items-center cursor-pointer list-none px-6 py-5 text-lg sm:text-xl font-bold">
          When will the driver details be shared?
          <span className="text-green-700 group-open:rotate-180 transition-transform">
            ▼
          </span>
        </summary>
        <div className="px-6 pb-5 text-gray-600 leading-relaxed">
          Driver and vehicle details will be shared after your booking is
          confirmed. For airport transfers, details are usually shared before the
          scheduled pickup time.
        </div>
      </details>

      <details className="group bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <summary className="flex justify-between items-center cursor-pointer list-none px-6 py-5 text-lg sm:text-xl font-bold">
          Can I book for outstation or hotel guest travel?
          <span className="text-green-700 group-open:rotate-180 transition-transform">
            ▼
          </span>
        </summary>
        <div className="px-6 pb-5 text-gray-600 leading-relaxed">
          Yes, outstation trips and hotel guest travel are available on request.
          You can share your trip details and our team will confirm availability
          and fare.
        </div>
      </details>
    </div>
  </div>
</section>
      {/* FLOATING WHATSAPP */}
            {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/919279167887"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-green-600 text-white w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all z-50"
      >
        <FaWhatsapp size={26} />
      </a>
    </div>
  </main>
);
}