"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  async function submitBooking() {
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
  console.log("SUPABASE ERROR:", error);
  alert(error.message);
    } else {
      alert("Booking submitted successfully!");

      setName("");
      setPhone("");
      setPickup("");
      setDestination("");
      setPickupDate("");
      setPickupTime("");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-green-400 text-center">
          VOLTRA
        </h1>

        <p className="text-center text-2xl mt-4">
          Premium EV Airport Transfers
        </p>

        <p className="text-center text-gray-300 mt-2">
          Reliable • Comfortable • Eco-Friendly
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <a
            href="#booking"
            className="px-6 py-3 bg-green-500 text-black font-bold rounded-lg"
          >
            Book Now
          </a>

          <a
            href="https://wa.me/919279167887"
            target="_blank"
            className="px-6 py-3 border border-green-500 rounded-lg"
          >
            WhatsApp Us
          </a>
        </div>

        <section
          id="booking"
          className="mt-16 bg-gray-900 p-6 rounded-xl"
        >
          <h2 className="text-3xl font-bold mb-6">
            Book Your Airport Transfer
          </h2>

          <div className="grid gap-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="p-3 rounded bg-black border border-gray-700"
            />

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="p-3 rounded bg-black border border-gray-700"
            />

            <input
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Pickup Location"
              className="p-3 rounded bg-black border border-gray-700"
            />

            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Destination"
              className="p-3 rounded bg-black border border-gray-700"
            />

            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="p-3 rounded bg-black border border-gray-700"
            />

            <input
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="p-3 rounded bg-black border border-gray-700"
            />

            <button
              onClick={submitBooking}
              className="bg-green-500 text-black font-bold p-3 rounded"
            >
              Submit Booking
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}