"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { FaWhatsapp } from "react-icons/fa";

export default function BookPage() {
  const router = useRouter();
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
const isOwnReferralCode =
  referralCode.trim() !== "" &&
  myReferralCode.trim() !== "" &&
  referralCode.trim().toUpperCase() === myReferralCode.trim().toUpperCase();
  useEffect(() => {
  async function getLoggedInUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
  router.push("/login");
  return;
}

    if (!user) {
  router.push("/login");
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
}, [router]);

  const isFormValid =
    name.trim().length >= 2 &&
    name.trim().length <= 20 &&
    phone.length === 10 &&
    pickup.trim() !== "" &&
    destination.trim() !== "" &&
    pickupDate !== "" &&
    pickupTime !== "";

  async function submitBooking() {
    if (isOwnReferralCode) {
  alert("You cannot use your own referral code. Please choose a different referral code or remove it.");
  return;
}
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
        <div className="max-w-md mx-auto mb-10 bg-white rounded-[28px] border border-gray-100 p-5 shadow-xl">
  <div className="flex items-center gap-4">
    <Link href="/" className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-green-700 text-white flex items-center justify-center font-extrabold shadow-md">
        K
      </div>

      <div>
        <h1 className="text-xl font-extrabold text-green-700 leading-tight">
          Kyro Mobility
        </h1>

        <p className="text-xs text-gray-500 font-medium">
          Premium rides, privileged experience
        </p>
      </div>
    </Link>
  </div>

  {customerEmail && (
    <div className="mt-4 bg-green-50 border border-green-100 rounded-2xl p-3">
      <p className="text-xs text-gray-500 font-semibold">
        Logged in as
      </p>

      <p className="text-sm font-bold text-green-700 truncate">
        {customerEmail}
      </p>
    </div>
  )}

  <div className="grid grid-cols-2 gap-3 mt-5">
    <Link
      href="/"
      className="bg-green-700 text-white py-3 rounded-xl font-extrabold text-sm text-center shadow-md hover:bg-green-800 transition"
    >
      Back Home
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

        {/* HEADER */}
        <section className="text-center py-8 sm:py-12">
          <div className="inline-block bg-green-100 text-green-800 px-5 py-2 rounded-full text-sm font-bold mb-5">
            ● Welcome in the journey of feeling safe and comfortable with Kyro Mobility
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">
            Book Your <span className="text-green-700">Ride</span>
          </h1>

          <p className="text-gray-600 text-base sm:text-lg mt-5 max-w-2xl mx-auto">
            Schedule airport transfers, outstation trips, hotel guest travel or corporate travel support with Kyro Mobility.
          </p>
        </section>

        {/* MAIN BOOKING LAYOUT */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* LEFT INFO BOXES */}
         <div className="lg:col-span-1 flex flex-col gap-6 order-2 lg:order-1">
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

            
            {/* Need Help Box */}
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
    className="mt-5 inline-flex items-center justify-center gap-2 bg-white text-green-700 px-5 py-3 rounded-xl font-bold shadow hover:bg-gray-100"
  >
    <FaWhatsapp className="text-green-600" size={22} />
    WhatsApp Now
  </a>
</div>

{/* Vehicle Suggestion Box */}
<div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
  <h2 className="text-2xl font-extrabold text-gray-900">
    Which Vehicle Suits You?
  </h2>

  <p className="mt-2 text-gray-600 leading-relaxed">
    Choose the vehicle based on passenger count, luggage and travel comfort.
  </p>

  <div className="mt-5 space-y-4">
    <div className="bg-[#f7f8f2] rounded-2xl p-5 border border-gray-200">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xl font-extrabold text-green-700">
          Tata Punch 
        </h3>

        <span className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full">
          Best Value
        </span>
      </div>

      <p className="mt-3 text-gray-700 leading-relaxed">
        Best for 1 to 3 passengers with light luggage. Ideal for airport pickup,
        solo travellers, couples and small families.
      </p>

      <ul className="mt-4 space-y-2 text-sm text-gray-600">
        <li>• Comfortable for small groups</li>
        <li>• Eco-friendly ride</li>
        <li>• Suitable for Ranchi airport transfers</li>
      </ul>
    </div>

    <div className="bg-[#f7f8f2] rounded-2xl p-5 border border-gray-200">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xl font-extrabold text-green-700">
          Maruti Ertiga
        </h3>

        <span className="text-xs font-bold bg-gray-900 text-white px-3 py-1 rounded-full">
          More Space
        </span>
      </div>

      <p className="mt-3 text-gray-700 leading-relaxed">
        Best for 4 to 6 passengers or customers carrying extra luggage. Ideal
        for families, hotel guests and long-distance comfort.
      </p>

      <ul className="mt-4 space-y-2 text-sm text-gray-600">
        <li>• More seating capacity</li>
        <li>• Better luggage space</li>
        <li>• Suitable for family and outstation trips</li>
      </ul>
    </div>
  </div>

  <div className="mt-5 bg-green-50 border border-green-100 rounded-2xl p-4">
    <p className="text-sm text-gray-700 leading-relaxed">
      Not sure which vehicle to choose? Submit your booking request or message us
      on WhatsApp. Our team will suggest the best vehicle based on your trip.
    </p>
  </div>
</div>
          </div>


          {/* RIGHT BOOKING FORM */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-5 sm:p-6 lg:p-8 order-1 lg:order-2">
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
{/* REFERRAL CODE */}
<div>
  <label className="text-sm font-semibold text-gray-600">
    Referral Code <span className="text-gray-400">(Optional)</span>
  </label>

  <input
    value={referralCode}
    onChange={(e) =>
      setReferralCode(e.target.value.trim().toUpperCase())
    }
    placeholder="Example: KYRO7A92X"
    className={`w-full mt-2 p-4 rounded-xl border outline-none ${
      isOwnReferralCode
        ? "border-red-500 focus:border-red-600"
        : "border-gray-300 focus:border-green-700"
    }`}
  />

  {isOwnReferralCode ? (
    <p className="text-sm text-red-600 font-semibold mt-2">
      You cannot use your own referral code. Please choose a different referral
      code or remove it.
    </p>
  ) : (
    <p className="text-xs text-gray-400 mt-1">
      Enter referral code if someone referred you.
    </p>
  )}
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
              disabled={!isFormValid || isOwnReferralCode}
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