import Navbar from '@/components/navbar/page';
import Footer from '@/components/footer/page';

export default function CustomOrdersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex flex-col grow pt-24">
        <section className="flex flex-col py-32 bg-white">
          <div className="flex flex-col w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl md:text-6xl font-light text-[#243b64] mb-6">
              Custom Orders
            </h1>
            <p className="text-xl text-[#64748B] font-light leading-relaxed mb-8">
              Create something uniquely yours. Our custom order service allows you to design the perfect vanity tailored to your specific needs and style preferences.
            </p>
            <a
              href="/contact"
              className="text-[#243b64] hover:text-[#dda01e] transition-colors font-medium text-lg border-b-2 border-[#243b64] hover:border-[#dda01e] pb-1 w-fit"
            >
              Contact Us to Get Started →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
