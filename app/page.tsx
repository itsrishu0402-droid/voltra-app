import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f8f2] text-black">
      <div className="max-w-7xl mx-auto px-6">

        {/* NAVBAR */}
        <nav className="flex items-center justify-between bg-white rounded-full shadow-md px-8 py-4 mt-6">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center">
              K
            </div>
            <span className="text-2xl font-bold text-green-700">
              Kyro Mobility
            </span>
          </div>

          <div className="hidden md:flex gap-8 text-gray-700 font-medium">
            <a href="#services">Services</a>
            <a href="#routes">Routes</a>
            <a href="#fleet">Fleet</a>
            <a href="#savings">Savings</a>
            <a href="#faqs">FAQs</a>
          </div>

          <Link
  href="/login"
  className="bg-green-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg"
>
  Schedule Booking 🚕
</Link>
        </nav>

        {/* HERO */}
        <section id="services" className="bg-white py-16">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-3xl font-extrabold mb-8">
      Our Services
    </h2>

    <div className="grid md:grid-cols-4 gap-6">
      <div className="border rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-green-700">
          ✈ Airport Transfers
        </h3>
        <p className="text-gray-600 mt-3">
          Jamshedpur to Ranchi Airport and Kolkata Airport pickup & drop.
        </p>
        <p className="text-sm font-bold text-green-700 mt-4">
          Available Now
        </p>
      </div>

      <div className="border rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-green-700">
          🚗 Outstation Trips
        </h3>
        <p className="text-gray-600 mt-3">
          Comfortable rides for nearby cities and planned long-distance trips.
        </p>
        <p className="text-sm font-bold text-gray-500 mt-4">
          On Request
        </p>
      </div>

      <div className="border rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-green-700">
          🏨 Hotel Guest Travel
        </h3>
        <p className="text-gray-600 mt-3">
          Reliable cab support for hotel guests, airport pickup and local travel.
        </p>
        <p className="text-sm font-bold text-gray-500 mt-4">
          On Request
        </p>
      </div>

      <div className="border rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-green-700">
          🧳 Corporate Travel
        </h3>
        <p className="text-gray-600 mt-3">
          Professional travel support for business visitors and company guests.
        </p>
        <p className="text-sm font-bold text-gray-500 mt-4">
          Coming Soon
        </p>
      </div>
    </div>
  </div>
</section>
        <section className="grid md:grid-cols-2 gap-12 items-center py-20">
          <div>
            <div className="inline-block bg-green-100 text-green-800 px-5 py-2 rounded-full text-sm font-bold mb-8">
              ● Premium Airport Transfers from Jamshedpur
            </div>

            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
              Travel Smart <br />
              <span className="text-green-700">
                Save More.
              </span>
            </h1>

            <p className="text-xl text-gray-600 mt-8 leading-relaxed max-w-xl">
              Book reliable airport transfers from Jamshedpur to Ranchi Airport
              and Kolkata Airport with transparent pricing, comfortable vehicles
              and professional service.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href="/book"
                className="bg-green-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg"
              >
                Schedule Booking 🚕
              </Link>

              <a
                href="https://wa.me/919279167887"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-gray-300 px-8 py-4 rounded-xl font-bold shadow"
              >
                WhatsApp Now
              </a>
            </div>

            <div className="flex flex-wrap gap-6 mt-10 text-sm font-bold text-gray-600">
              <span>✈ Airport Specialists</span>
              <span>💰 Fixed Pricing</span>
              <span>🚗 Comfortable Vehicles</span>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-green-50 p-6 border-b">
              <p className="text-sm font-bold text-green-700">
                EST. SAVINGS
              </p>

              <div className="flex justify-between items-end mt-2">
                <h2 className="text-4xl font-extrabold text-green-700">
                  ₹100+
                </h2>
                <p className="text-sm text-gray-500">
                  Per Ranchi airport trip
                </p>
              </div>
            </div>

            <div className="p-6">
              <p className="text-sm font-bold text-gray-500 mb-3">
                ROUTE
              </p>

              <div className="bg-[#f7f8f2] rounded-xl p-4 mb-5">
                Jamshedpur ↔ Ranchi Airport
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-5 rounded-xl">
                  <p className="text-gray-500 text-sm">Local Cab</p>
                  <p className="text-2xl font-bold">₹1700+</p>
                </div>

                <div className="bg-green-50 p-5 rounded-xl">
                  <p className="text-gray-500 text-sm">Kyro Mobility</p>
                  <p className="text-2xl font-bold text-green-700">₹1600</p>
                </div>
              </div>

              <p className="text-gray-500 text-sm mt-5">
                Customers can later check their total trips and savings using
                their phone number.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* SERVICES */}
      <section id="services" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-8">
            Why Choose Kyro Mobility?
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
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

      {/* ROUTES */}
      <section id="routes" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-8">
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