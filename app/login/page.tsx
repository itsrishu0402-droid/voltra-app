"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
  if (!email) {
    alert("Please enter your email.");
    return;
  }

  const redirectUrl = `${window.location.origin}/book`;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectUrl,
      shouldCreateUser: true,
    },
  });

  if (error) {
    alert(error.message);
    return;
  }

  setMessage("Magic link sent! Please check your email.");
}

  return (
    <main className="min-h-screen bg-[#f4f7fb] flex items-center justify-center px-6">
      <div className="bg-white max-w-xl w-full rounded-3xl shadow-xl p-10 border">
        <div className="text-center">
          <Link href="/" className="text-green-700 font-bold">
            ← Back to Home
          </Link>

          <div className="mt-8 flex justify-center">
            <div className="bg-green-700 text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl font-extrabold">
              K
            </div>
          </div>

          <h1 className="text-4xl font-extrabold mt-6 text-gray-900">
            Welcome to <span className="bg-[#f7f8f2]">Kyro Mobility</span>
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Sign in to schedule your airport transfer.
          </p>

          <p className="text-sm text-gray-400 mt-2">
            Jamshedpur ↔ Ranchi Airport • Jamshedpur ↔ Kolkata Airport
          </p>
        </div>

        <div className="mt-10">
          <button
            disabled
            className="w-full border rounded-xl py-4 text-lg font-bold text-gray-400 bg-gray-100 cursor-not-allowed"
          >
            Continue with Google
          </button>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gray-200"></div>
            <p className="text-sm font-bold text-gray-500">
              OR USING EMAIL
            </p>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <label className="text-sm font-semibold text-gray-600">
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full mt-2 border rounded-xl px-5 py-4 text-lg outline-none focus:border-green-600 text-gray-900"
          />

          <button
            onClick={signInWithEmail}
            disabled={loading}
            className="w-full mt-6 bg-green-700 text-white py-4 rounded-xl text-lg font-bold hover:bg-green-800 disabled:bg-gray-400"
          >
            {loading ? "Sending..." : "Send Magic Link"}
          </button>

          {message && (
  <p className="mt-6 text-black font-semibold text-center bg-white border border-gray-200 rounded-xl py-3 px-4">
    {message} ✅
  </p>
)}

          <p className="text-xs text-gray-400 mt-8 text-center">
            A secure booking access link will be sent to your email.
          </p>
        </div>
      </div>
    </main>
  );
}