import { LogOut, Car, MapPin, Star, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";

export default function CaptainHome() {
  return (
    <div className="min-h-screen bg-[#050816] text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 lg:px-16">
        <h1 className="text-3xl font-bold tracking-wider">
          Ride<span className="text-cyan-400">Flow</span>
        </h1>

        <Link
          to="/captain-login"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"
        >
          <LogOut size={20} />
        </Link>
      </nav>

      {/* Map */}
      <div className="mx-auto mt-2 h-[42vh] w-[92%] overflow-hidden rounded-3xl border border-white/10 bg-white/5">

        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map"
          className="h-full w-full object-cover"
        />

      </div>

      {/* Captain Details */}
      <div className="mx-auto mt-6 w-[92%] rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-500 text-2xl font-bold">
              A
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Alex Johnson
              </h2>

              <p className="text-gray-400">
                Toyota Innova • DL01AB1234
              </p>
            </div>

          </div>

          <div className="flex items-center gap-1 text-yellow-400">
            <Star size={18} fill="currentColor" />
            <span className="font-semibold">4.9</span>
          </div>

        </div>

        {/* Stats */}

        <div className="mt-8 grid grid-cols-3 gap-4">

          <div className="rounded-2xl bg-white/5 p-5 text-center">
            <Car className="mx-auto mb-3 text-cyan-400" />
            <h3 className="text-xl font-bold">
              124
            </h3>
            <p className="text-sm text-gray-400">
              Trips
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 p-5 text-center">
            <IndianRupee className="mx-auto mb-3 text-green-400" />
            <h3 className="text-xl font-bold">
              ₹18,450
            </h3>
            <p className="text-sm text-gray-400">
              Earnings
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 p-5 text-center">
            <MapPin className="mx-auto mb-3 text-violet-400" />
            <h3 className="text-xl font-bold">
              Online
            </h3>
            <p className="text-sm text-gray-400">
              Status
            </p>
          </div>

        </div>

      </div>

      {/* Ride Request Card */}

      <div className="mx-auto mt-6 mb-8 w-[92%] rounded-3xl border border-violet-500/30 bg-violet-500/10 p-6">

        <h2 className="mb-5 text-2xl font-bold">
          New Ride Request
        </h2>

        <div className="space-y-5">

          <div>
            <p className="text-gray-400">
              Pickup
            </p>

            <h3 className="font-semibold">
              Connaught Place, New Delhi
            </h3>
          </div>

          <div>
            <p className="text-gray-400">
              Destination
            </p>

            <h3 className="font-semibold">
              India Gate
            </h3>
          </div>

          <div className="flex justify-between">

            <div>
              <p className="text-gray-400">
                Distance
              </p>

              <h3 className="font-semibold">
                8.5 km
              </h3>
            </div>

            <div>
              <p className="text-gray-400">
                Fare
              </p>

              <h3 className="font-semibold text-green-400">
                ₹285
              </h3>
            </div>

          </div>

        </div>

        <div className="mt-8 flex gap-4">

          <button className="flex-1 rounded-xl bg-violet-500 py-4 font-semibold transition hover:bg-violet-600">
            Accept Ride
          </button>

          <button className="flex-1 rounded-xl border border-white/10 py-4 transition hover:bg-white/10">
            Decline
          </button>

        </div>

      </div>

    </div>
  );
}