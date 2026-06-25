"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { FaWhatsapp } from "react-icons/fa";

export default function BookPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [locationLink, setLocationLink] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [serviceType, setServiceType] = useState("Airport Transfer");
  const [referralCode, setReferralCode] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [myReferralCode, setMyReferralCode] = useState("");
  function generateReferralCode() {
  const randomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `KYRO${randomCode}`;
}
  useEffect(() => {
  async function getLoggedInUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    if (user.email) {
      setCustomerEmail(user.email);
    }

    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (existingProfile?.referral_code) {
      setMyReferralCode(existingProfile.referral_code);
      return;
    }

    const newReferralCode = generateReferralCode();

    const { data: newProfile, error } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        email: user.email,
        referral_code: newReferralCode,
      })
      .select()
      .single();

    if (!error && newProfile?.referral_code) {
      setMyReferralCode(newProfile.referral_code);
    }
  }

  getLoggedInUser();
}, []);

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
  customer_email: customerEmail || null,
  referral_code_used: referralCode || null,
  pickup,
  destination,
  pickup_date: pickupDate,
  pickup_time: pickupTime,
  location_link: locationLink || null,
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
      setLocationLink("");
      setReferralCode("");
      setServiceType("Airport Transfer");
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f8f2] text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* NAVBAR */}
        <nav className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white rounded-3xl sm:rounded-full shadow-md px-4 sm:px-8 py-4 mb-8">
          <Link href="/" className="flex items-center justify-center sm:justify-start gap-3">
            <div className="bg-green-700 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center">
              K
            </div>

            <span className="text-xl sm:text-2xl font-bold text-green-700 whitespace-nowrap">
              Kyro Mobility
            </span>
          </Link>

          <Link href="/" className="text-center text-green-700 font-bold">
            ← Back Home
          </Link>
        </nav>

        {/* HEADER */}
        <section className="text-center py-8 sm:py-12">
          <div className="inline-block bg-green-100 text-green-800 px-5 py-2 rounded-full text-sm font-bold mb-5">
            ● Cab & Travel Service Booking
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">
            Book Your <span className="text-green-700">Ride</span>
          </h1>

          <p className="text-gray-600 text-base sm:text-lg mt-5 max-w-2xl mx-auto">
            Schedule airport transfers, outstation trips, hotel guest travel or corporate travel support with Kyro Mobility.
          </p>
        </section>

        {/* MAIN BOOKING LAYOUT */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
          {/* LEFT INFO BOXES */}
          <div className="xl:col-span-1 flex flex-col gap-6">
            <div className="bg-white rounded-3xl shadow-md p-6">
              <h2 className="text-2xl font-extrabold mb-5">
                Available Routes
              </h2>

              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-bold">
                    Jamshedpur ↔ Ranchi Airport
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Pickup and drop available.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold">
                    Jamshedpur ↔ Kolkata Airport
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Pickup and drop available.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6">
              <h2 className="text-2xl font-extrabold mb-5">
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

              <p className="mt-3 text-green-50 leading-relaxed">
                You can also contact us directly on WhatsApp for instant booking support.
              </p>

              <a
                href="https://wa.me/919279167887"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center gap-2 bg-white text-green-700 px-5 py-3 rounded-xl font-bold shadow hover:bg-gray-100 w-full sm:w-auto"
              >
                <FaWhatsapp className="text-green-600" size={22} />
                WhatsApp Now
              </a>
            </div>
          </div>

          {/* RIGHT BOOKING FORM */}
          <div className="xl:col-span-2 bg-white rounded-3xl shadow-xl p-6 sm:p-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Trip Details
              {customerEmail && (
  <p className="mt-2 text-sm text-green-700 font-semibold">
    Signed in as: {customerEmail}
  </p>
)}
            </h2>

            <p className="text-gray-600 mt-3">
              Fill the details below. Our team will contact you to confirm the trip.
            </p>
            {myReferralCode && (
  <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-5">
    <p className="text-sm font-semibold text-green-700">
      Your Referral Code
    </p>

    <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <p className="text-2xl font-extrabold tracking-wider text-gray-900">
        {myReferralCode}
      </p>

      <button
        type="button"
        onClick={() => navigator.clipboard.writeText(myReferralCode)}
        className="bg-green-700 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-green-800"
      >
        Copy Code
      </button>
    </div>

    <p className="text-sm text-gray-600 mt-3 leading-relaxed">
      Share this code with your friends. They get referral benefits, and you get
      rewards after their first completed ride.
    </p>
  </div>
)}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-8">
  {/* FULL NAME */}
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

  {/* PHONE NUMBER */}
  <div>
    <label className="text-sm font-semibold text-gray-600">
      Phone Number
    </label>
    <input
      type="tel"
      value={phone}
      maxLength={10}
      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
      placeholder="10 digit mobile number"
      className="w-full mt-2 p-4 rounded-xl border border-gray-300 outline-none focus:border-green-700"
    />
    <p className="text-xs text-gray-400 mt-1">
      Phone number must be exactly 10 digits.
    </p>
  </div>

  {/* SERVICE TYPE */}
  <div>
    <label className="text-sm font-semibold text-gray-600">
      Service Type
    </label>
    <select
      value={serviceType}
      onChange={(e) => setServiceType(e.target.value)}
      className="w-full mt-2 p-4 rounded-xl border border-gray-300 outline-none focus:border-green-700 bg-white"
    >
      <option>Airport Transfer</option>
      <option>Outstation Trip</option>
      <option>Hotel Guest Travel</option>
      <option>Corporate Travel</option>
    </select>
  </div>

  {/* PICKUP ADDRESS */}
  <div>
    <label className="text-sm font-semibold text-gray-600">
      Complete Pickup Address
    </label>
    <input
      value={pickup}
      onChange={(e) => setPickup(e.target.value)}
      placeholder="Example: HNO, Locality, Landmark, Area, City"
      className="w-full mt-2 p-4 rounded-xl border border-gray-300 outline-none focus:border-green-700"
    />
  </div>

  {/* DROP ADDRESS */}
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

  {/* PICKUP DATE */}
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

  {/* PICKUP TIME */}
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

  {/* LOCATION LINK */}
  <div>
    <label className="text-sm font-semibold text-gray-600">
      Location Link <span className="text-gray-400">(Optional)</span>
    </label>

    <input
      type="url"
      value={locationLink}
      onChange={(e) => setLocationLink(e.target.value)}
      placeholder="Paste Google Maps location link"
      className="w-full mt-2 p-4 rounded-xl border border-gray-300 outline-none focus:border-green-700"
    />

    <p className="text-xs text-gray-400 mt-1">
      Customer can paste Google Maps location link here.
    </p>
  </div>
  {/* REFERRAL CODE */}
<div>
  <label className="text-sm font-semibold text-gray-600">
    Referral Code <span className="text-gray-400">(Optional)</span>
  </label>

  <input
    value={referralCode}
    onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
    placeholder="Example: KYRO7A92X"
    className="w-full mt-2 p-4 rounded-xl border border-gray-300 outline-none focus:border-green-700"
  />

  <p className="text-xs text-gray-400 mt-1">
    Enter referral code if someone referred you.
  </p>
</div>
</div>
            <div className="bg-green-50 border border-green-100 rounded-2xl p-5 mt-8">
              <h3 className="font-bold text-green-800">
                Booking Note
              </h3>
              <p className="text-gray-600 mt-2">
                This is a booking request. Final fare, vehicle availability and pickup time will be confirmed by our team on call or WhatsApp.
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
      </div>

      {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/919279167887"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-green-600 text-white w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all z-50"
      >
        <FaWhatsapp size={26} />
      </a>
    </main>
  );
}