export default function Statistics() {
  return (
    <section className="flex flex-col py-32 bg-white">
      <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-light text-[#243b64] mb-6 leading-tight">
              Designed for the heart of your space.
            </h2>
          </div>
          
          <div className="grid grid-cols-3 gap-12">
            <div>
              <div className="text-5xl font-light text-[#243b64] mb-2">50+</div>
              <div className="text-xs text-[#9CA3AF] uppercase tracking-wider">Styles</div>
            </div>
            
            <div>
              <div className="text-5xl font-light text-[#243b64] mb-2">12+</div>
              <div className="text-xs text-[#9CA3AF] uppercase tracking-wider">Collections</div>
            </div>
            
            <div>
              <div className="text-5xl font-light text-[#243b64] mb-2">200+</div>
              <div className="text-xs text-[#9CA3AF] uppercase tracking-wider">Models</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
