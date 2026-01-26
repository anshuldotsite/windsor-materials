import Link from 'next/link';
import Image from 'next/image';
import hero from '@/app/assets/hero/hero.jpg';

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center overflow-hidden bg-white">
      {/* Background Image Layer */}
      <Image 
        src={hero}
        alt="Windsor Materials Hero"
        fill
        className="object-cover"
        priority
      />

      {/* Content Container - Left Aligned */}
      <div className="flex flex-col justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{position: 'absolute', zIndex: 10}}>
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-[#243b64] mb-6 leading-tight">
            Excellence is
            <br />
            <span className="italic font-light">in the details.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#243b64]/80 max-w-lg font-light leading-relaxed mb-10">
            Vanities created with intention and designed to make you feel at home.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <Link
              href="/products"
              className="text-[#243b64] hover:text-[#dda01e] transition-colors font-medium text-base tracking-wide border-b-2 border-[#243b64] hover:border-[#dda01e] pb-1"
            >
              Browse Collections
            </Link>
            
            <Link
              href="/custom"
              className="text-[#243b64] hover:text-[#dda01e] transition-colors font-medium text-base tracking-wide border-b-2 border-[#243b64] hover:border-[#dda01e] pb-1"
            >
              Custom Order
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
