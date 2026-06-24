"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "../../lib/supabase";


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
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-green-400">
          ← Back to Home
        </Link>

        <section className="mt-8 bg-gray-900 p-6 rounded-xl">
          <h1 className="text-4xl font-bold mb-6">
            Book Your Airport Transfer
          </h1>

          <div className="grid gap-4">
            <input
              value={name}
              maxLength={20}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="p-3 rounded bg-black border border-gray-700"
            />

            <input
              type="tel"
              value={phone}
              maxLength={10}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, ""))
              }
              placeholder="10 Digit Phone Number"
              className="p-3 rounded bg-black border border-gray-700"
            />

            <input
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Pickup Address"
              className="p-3 rounded bg-black border border-gray-700"
            />

            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Drop Address"
              className="p-3 rounded bg-black border border-gray-700"
            />

            <label className="text-sm text-gray-300">Pickup Date</label>
            <input
              type="date"
              value={pickupDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setPickupDate(e.target.value)}
              className="p-3 rounded bg-black border border-gray-700"
            />

            <label className="text-sm text-gray-300">Pickup Time</label>
            <input
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="p-3 rounded bg-black border border-gray-700"
            />

            <button
              onClick={submitBooking}
              disabled={!isFormValid}
              className={`font-bold p-3 rounded ${
                isFormValid
                  ? "bg-green-500 text-black hover:bg-green-400"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              Submit Booking
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}