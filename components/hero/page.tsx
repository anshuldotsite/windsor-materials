import Link from "next/link";
import VideoBackground from "./VideoBackground";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <VideoBackground />

      {/* Content Container - Centered */}
      <div className="relative z-10 flex flex-col justify-center items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-8 leading-[1.1] tracking-tight">
            Precision in Every Finish
            <br />
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-lg font-light leading-relaxed mb-12 mx-auto">
            Vanities created with intention and designed to make you feel at
            home.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/collections"
              className="px-8 py-4 bg-white text-black hover:bg-[#dda01e] hover:text-white transition-all duration-300 font-medium text-sm tracking-wide rounded-full"
            >
              Browse Collections
            </Link>

            <Link
              href="/custom-orders"
              className="px-8 py-4 border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 font-medium text-sm tracking-wide rounded-full backdrop-blur-sm"
            >
              Custom Orders
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
