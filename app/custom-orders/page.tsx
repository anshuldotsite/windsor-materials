import Navbar from "@/components/navbar/page";
import Footer from "@/components/footer/page";
import ContactForm from "@/components/contact-form/page";
import { listCollections } from "@/lib/data/collections";

export default async function CustomOrdersPage() {
  const collections = await listCollections();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex flex-col grow pt-24">
        {/* Header Section */}
        <section className="flex flex-col py-20 bg-white">
          <div className="flex flex-col w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-light text-[#1F3A5F] mb-6">
              Custom Orders
            </h1>
            <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
              Create something uniquely yours. Share your vision below, and our
              team will craft a solution tailored to your space.
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="flex flex-col pb-32 bg-white">
          <div className="flex flex-col w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm">
              <ContactForm collections={collections} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
