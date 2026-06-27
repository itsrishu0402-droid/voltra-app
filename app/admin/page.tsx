"use client";

import { useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  async function loadBookings() {
    try {
      setLoading(true);

      const response = await fetch("/api/admin/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const result: any = await response.json();

      if (!response.ok) {
        alert(result.error || "Unable to load bookings");
        return;
      }

      setBookings(result.bookings || []);
      setLoggedIn(true);
    } catch (error) {
      console.log("ADMIN ERROR:", error);
      alert("Something went wrong. Check VS Code terminal for error.");
    } finally {
      setLoading(false);
    }
  }

  function formatPhone(phone: string) {
    const cleaned = String(phone || "").replace(/\D/g, "");

    if (cleaned.length === 10) {
      return `91${cleaned}`;
    }

    return cleaned;
  }

  function sendConfirmation(booking: any) {
    const phoneNumber = formatPhone(booking.phone);

    const emoji = {
      namaste: String.fromCodePoint(128591),
      check: String.fromCodePoint(9989),
      car: String.fromCodePoint(128664),
      calendar: String.fromCodePoint(128197),
      clock: String.fromCodePoint(9200),
      pin: String.fromCodePoint(128205),
      flag: String.fromCodePoint(127937),
      taxi: String.fromCodePoint(128661),
      sparkle: String.fromCodePoint(10024),
    };

    const message = [
      `Hello *${booking.name || "Customer"}*! ${emoji.namaste}`,
      "",
      `${emoji.check} *Your Kyro Mobility booking request has been received.*`,
      "",
      `${emoji.car} *Service:* ${booking.service_type || "Cab & Travel Service"}`,
      `${emoji.calendar} *Travel Date:* ${booking.pickup_date || "-"}`,
      `${emoji.clock} *Pickup Time:* ${booking.pickup_time || "-"}`,
      `${emoji.pin} *Pickup:* ${booking.pickup || "-"}`,
      `${emoji.flag} *Drop:* ${booking.destination || "-"}`,
      "",
      "Our team will shortly confirm the fare, vehicle and driver details with you.",
      "",
      "Thank you for choosing *Kyro Mobility*.",
      "",
      `*Travel Smart. Feel Privileged.* ${emoji.taxi}${emoji.sparkle}`,
    ].join("\n");

    const params = new URLSearchParams({
      phone: phoneNumber,
      text: message,
    });

    window.open(`https://api.whatsapp.com/send?${params.toString()}`, "_blank");
  }

  async function markRideCompleted(bookingId: number) {
  try {
    const response = await fetch("/api/admin/update-booking-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        bookingId,
        status: "completed",
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.error || "Unable to update ride status");
      return;
    }

    setBookings((currentBookings) =>
      currentBookings.map((booking) =>
        booking.id === bookingId
          ? { ...booking, trip_status: "completed" }
          : booking
      )
    );

    alert("Ride marked as completed.");

    if (result.referralReward?.referrerPhone) {
      const phoneNumber = formatPhone(result.referralReward.referrerPhone);

      const message = `Hello! 🎉

Good news from *Kyro Mobility*.

Your referral code *${result.referralReward.referralCode}* was used by a customer, and their ride has been completed.

You have earned:
*₹100 off on each of your next 2 rides.*

Thank you for referring Kyro Mobility.

*Travel Smart. Feel Privileged.*`;

      const params = new URLSearchParams({
        phone: phoneNumber,
        text: message,
      });

      window.open(`https://api.whatsapp.com/send?${params.toString()}`, "_blank");
    }

    if (result.referralReward && !result.referralReward.referrerPhone) {
      alert(
        "Referral reward saved, but referrer's phone number is not available in profile."
      );
    }
  } catch (error) {
    console.log("STATUS UPDATE ERROR:", error);
    alert("Something went wrong while updating status.");
  }
}
  return (
    <main className="min-h-screen bg-[#f7f8f2] text-black px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-md p-6 mb-6">
          <h1 className="text-3xl font-extrabold text-green-700">
            Kyro Mobility Admin
          </h1>

          <p className="text-gray-600 mt-2">
            View bookings and send WhatsApp confirmation messages.
          </p>
        </div>

        {!loggedIn && (
          <div className="bg-white rounded-3xl shadow-md p-6 max-w-md">
            <label className="text-sm font-semibold text-gray-600">
              Admin Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full mt-2 p-4 rounded-xl border border-gray-300 outline-none focus:border-green-700"
            />

            <button
              onClick={loadBookings}
              disabled={loading}
              className="w-full mt-5 bg-green-700 text-white py-4 rounded-xl font-bold hover:bg-green-800 disabled:bg-gray-400"
            >
              {loading ? "Loading..." : "Open Bookings"}
            </button>
          </div>
        )}

        {loggedIn && (
          <div className="space-y-5">
            <div className="flex justify-between items-center gap-4">
              <h2 className="text-2xl font-extrabold">Latest Bookings</h2>

              <button
                onClick={loadBookings}
                disabled={loading}
                className="bg-green-700 text-white px-5 py-3 rounded-xl font-bold disabled:bg-gray-400"
              >
                {loading ? "Refreshing..." : "Refresh"}
              </button>
            </div>

            {bookings.length === 0 && (
              <div className="bg-white rounded-2xl p-6 shadow">
                No bookings found.
              </div>
            )}

            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-3xl shadow-md p-6"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-2xl font-bold">
                      {booking.name || "Customer"}
                    </h3>

                    <p className="text-gray-600 mt-1">
                      Phone: {booking.phone || "-"}
                    </p>

                    <p className="text-gray-600">
                      Email: {booking.customer_email || "-"}
                    </p>

                    <p className="text-gray-600">
                      Service: {booking.service_type || "-"}
                    </p>

                    {booking.referral_code_used && (
                      <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-3">
                        <p className="text-sm font-bold text-green-700">
                          Referral Code Used
                        </p>

                        <p className="text-lg font-extrabold tracking-wide text-gray-900">
                          {booking.referral_code_used}
                        </p>

                        {booking.referrer_email && (
                          <p className="text-sm text-gray-600 mt-1">
                            Referred By: {booking.referrer_email}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="md:text-right">
                    <p className="text-gray-600">
                      Date: {booking.pickup_date || "-"}
                    </p>

                    <p className="text-gray-600">
                      Time: {booking.pickup_time || "-"}
                    </p>

                    <p
                      className={`text-sm font-bold mt-2 ${
                        booking.trip_status === "completed"
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      Status: {booking.trip_status || "pending"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 bg-[#f7f8f2] rounded-2xl p-4">
                  <p>
                    <span className="font-bold">Pickup:</span>{" "}
                    {booking.pickup || "-"}
                  </p>

                  <p className="mt-2">
                    <span className="font-bold">Drop:</span>{" "}
                    {booking.destination || "-"}
                  </p>

                  {booking.location_link && (
                    <a
                      href={booking.location_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-green-700 font-bold"
                    >
                      Open Customer Location
                    </a>
                  )}
                </div>

                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => sendConfirmation(booking)}
                    className="bg-green-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-800"
                  >
                    Send WhatsApp Confirmation
                  </button>

                  {booking.trip_status !== "completed" && (
                    <button
                      onClick={() => markRideCompleted(booking.id)}
                      className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-black"
                    >
                      Mark Ride Completed
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}