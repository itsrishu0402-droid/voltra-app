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

    const message = `Hello *${booking.name || "Customer"}*! 🙏

✅ *Your Kyro Mobility booking request has been received.*

🚘 *Service:* ${booking.service_type || "Cab & Travel Service"}
📅 *Travel Date:* ${booking.pickup_date || "-"}
⏰ *Pickup Time:* ${booking.pickup_time || "-"}
📍 *Pickup:* ${booking.pickup || "-"}
🏁 *Drop:* ${booking.destination || "-"}

Our team will shortly confirm the fare, vehicle and driver details with you.

Thank you for choosing *Kyro Mobility*.
*Travel Smart. Feel Privileged.* 🚕✨`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  }

  