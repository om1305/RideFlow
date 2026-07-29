import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function Home() {

    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">
      
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-[140px]" />
      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-violet-500/20 blur-[140px]" />

      
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 lg:px-20">

  <h1 className="text-3xl font-bold tracking-wider">
    Ride<span className="text-cyan-400">Flow</span>
  </h1>


  <div className="flex items-center gap-4">

    <button
      onClick={() => navigate("/signup")}
      className="
      rounded-full
      border
      border-gray-600
      px-6
      py-3
      transition
      hover:border-cyan-400
      "
    >
      Register as Rider
    </button>


    <button
      onClick={() => navigate("/captain-signup")}
      className="
      rounded-full
      bg-violet-500
      px-6
      py-3
      font-semibold
      text-white
      transition
      hover:scale-105
      "
    >
      Register as Driver
    </button>

  </div>

</nav>

      <section className="relative z-10 mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-8 text-center">

        <span className="mb-6 rounded-full border border-cyan-400/30 bg-white/5 px-5 py-2 text-sm backdrop-blur">
          The Future of Urban Mobility
        </span>

        <h1 className="max-w-5xl text-5xl font-bold leading-tight md:text-7xl">
          Ride Smarter.
          <br />
          Move
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {" "}Faster.
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-gray-400">
          Experience seamless rides with intelligent route matching,
          lightning-fast booking, and real-time driver tracking.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <button className="flex items-center gap-2 rounded-full bg-cyan-400 px-8 py-4 font-semibold text-black transition hover:scale-105" onClick={() => navigate("/login")}>
            Book a Ride 
            <ArrowRight size={20} /> 
          </button>

          <button className="rounded-full border border-gray-600 px-8 py-4 transition hover:border-cyan-400" onClick={()=> navigate("/captain-login")}>
            Become a Driver
          </button>
        </div>


        <div className="mt-24 grid w-full max-w-6xl gap-8 md:grid-cols-3">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="mb-5 text-4xl">⚡</div>

            <h3 className="mb-3 text-xl font-semibold">
              Instant Booking
            </h3>

            <p className="text-gray-400">
              Get matched with the nearest driver within seconds using
              intelligent ride allocation.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="mb-5 text-4xl">📍</div>

            <h3 className="mb-3 text-xl font-semibold">
              Live Tracking
            </h3>

            <p className="text-gray-400">
              Track your ride in real time with accurate ETA updates and
              route visualization.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="mb-5 text-4xl">🛡️</div>

            <h3 className="mb-3 text-xl font-semibold">
              Safe Journey
            </h3>

            <p className="text-gray-400">
              Verified drivers, emergency assistance, and secure payments
              keep every journey protected.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}


