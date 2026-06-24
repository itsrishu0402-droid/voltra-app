"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { FaWhatsapp } from "react-icons/fa";

export default function BookPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  const isFormValid =
    name.trim().length >= 2 &&
    name.trim().length <= 20 &&
    phone.length === 10 &&
    pickup.trim() !== "" &&
    destination.trim() !== "" &&
    pickupDate !== "" &&
    pickupTime !== "";

  async function submitBooking() {
    if (!isFormValid) {
      alert("Please fill all details correctly.");
      return;
    }

    const selectedDateTime = new Date(`${pickupDate}T${pickupTime}`);
    const now = new Date();

    if (selectedDateTime <= now) {
      alert("Please select a future date and time.");
      return;
    }

    const { error } = await supabase.from("bookings").insert({
      name,
      phone,
      pickup,
      destination,
      pickup_date: pickupDate,
      pickup_time: pickupTime,
      passengers: 1,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Booking submitted successfully! Our team will contact you shortly.");

      setName("");
      setPhone("");
      setPickup("");
      setDestination("");
      setPickupDate("");
      setPickupTime("");
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f8f2] text-black">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* NAVBAR */}
        <nav className="flex items-center justify-between bg-white rounded-full shadow-md px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-green-700 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center">
              V
            </div>
            <span className="text-2xl font-bold text-green-700">
              Kyro Mobility
            </span>
          </Link>

          <Link
            href="/"
            className="text-green-700 font-bold"
          >
            ← Back Home
          </Link>
        </nav>

        {/* HEADER */}
        <section className="text-center py-12">
          <div className="inline-block bg-green-100 text-green-800 px-5 py-2 rounded-full text-sm font-bold mb-6">
            ● Airport Pickup & Drop Booking
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold">
            Book Your <span className="text-green-700">Airport Transfer</span>
          </h1>

          <p className="text-gray-600 text-lg mt-5 max-w-2xl mx-auto">
            Schedule a reliable airport transfer from Jamshedpur to Ranchi Airport
            or Kolkata Airport with comfortable vehicles and transparent pricing.
          </p>
        </section>

        <section className="grid lg:grid-cols-3 gap-8 items-start">
          {/* LEFT INFO */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl shadow-md p-6">
              <h2 className="text-2xl font-extrabold mb-4">
                Available Routes
              </h2>

              <div className="space-y-4">
                <div className="bg-[#f7f8f2] p-4 rounded-xl">
                  <p className="font-bold">Jamshedpur ↔ Ranchi Airport</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Pickup and drop available.
                  </p>
                </div>

                <div className="bg-[#f7f8f2] p-4 rounded-xl">
                  <p className="font-bold">Jamshedpur ↔ Kolkata Airport</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Pickup and drop available.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6">
              <h2 className="text-2xl font-extrabold mb-4">
                Why Book with Kyro Mobility?
              </h2>

              <div className="space-y-3 text-gray-700">
                <p>✈ Airport transfer specialists</p>
                <p>⏰ Planned pickup and drop timing</p>
                <p>💰 Transparent fare discussion</p>
                <p>🚗 Tata Punch & Ertiga CNG available</p>
                <p>📞 WhatsApp support available</p>
              </div>
            </div>

            <div className="bg-green-700 text-white rounded-3xl shadow-md p-6">
              <h2 className="text-2xl font-extrabold">
                Need Help?
              </h2>

              <p className="mt-3 text-green-50">
                You can also contact us directly on WhatsApp for instant booking support.
              </p>

              <a
                href="https://wa.me/919279167887"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 bg-white text-green-700 px-5 py-3 rounded-xl font-bold"
              >
                <FaWhatsapp />
                WhatsApp Now
              </a>
            </div>
          </div>

          {/* BOOKING FORM */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-3xl font-extrabold mb-2">
              Trip Details
            </h2>

            <p className="text-gray-500 mb-8">
              Fill the details below. Our team will contact you to confirm the trip.
            </p>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Full Name
                </label>
                <input
                  value={name}
                  maxLength={20}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full mt-2 p-4 rounded-xl border border-gray-300 outline-none focus:border-green-700"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Maximum 20 characters.
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  maxLength={10}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="10 digit mobile number"
                  className="w-full mt-2 p-4 rounded-xl border border-gray-300 outline-none focus:border-green-700"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Phone number must be exactly 10 digits.
                </p>
              </div>
<div>
  <label className="text-sm font-semibold text-gray-600">
    Service Type
  </label>

  <select
    className="w-full mt-2 p-4 rounded-xl border border-gray-300 outline-none focus:border-green-700"
  >
    <option>Airport Transfer</option>
    <option>Outstation Trip</option>
    <option>Hotel Guest Travel</option>
    <option>Corporate Travel</option>
  </select>
</div>
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Pickup Address
                </label>
                <input
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="Example: Sakchi, Jamshedpur"
                  className="w-full mt-2 p-4 rounded-xl border border-gray-300 outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Drop Address
                </label>
                <input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Example: Ranchi Airport"
                  className="w-full mt-2 p-4 rounded-xl border border-gray-300 outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Pickup Date
                </label>
                <input
                  type="date"
                  value={pickupDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full mt-2 p-4 rounded-xl border border-gray-300 outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Pickup Time
                </label>
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full mt-2 p-4 rounded-xl border border-gray-300 outline-none focus:border-green-700"
                />
              </div>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-2xl p-5 mt-8">
              <h3 className="font-bold text-green-800">
                Booking Note
              </h3>
              <p className="text-gray-600 mt-2">
                This is a booking request. Final fare, vehicle availability and pickup
                time will be confirmed by our team on call or WhatsApp.
              </p>
            </div>

            <button
              onClick={submitBooking}
              disabled={!isFormValid}
              className={`w-full mt-8 py-4 rounded-xl text-lg font-bold transition-all ${
                isFormValid
                  ? "bg-green-700 text-white hover:bg-green-800"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Submit Booking Request
            </button>
          </div>
        </section>

        {/* PROCESS */}
        <section className="py-16">
          <h2 className="text-3xl font-extrabold text-center mb-8">
            How Booking Works
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow text-center">
              <h3 className="text-xl font-bold text-green-700">1. Submit</h3>
              <p className="text-gray-600 mt-3">
                Fill your trip details and submit the booking request.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow text-center">
              <h3 className="text-xl font-bold text-green-700">2. Confirm</h3>
              <p className="text-gray-600 mt-3">
                Our team confirms fare, timing and vehicle availability.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow text-center">
              <h3 className="text-xl font-bold text-green-700">3. Travel</h3>
              <p className="text-gray-600 mt-3">
                Enjoy a comfortable airport transfer with Kyro Mobility.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/919279167887"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all z-50"
      >
        <FaWhatsapp size={34} />
      </a>
    </main>
  );
}