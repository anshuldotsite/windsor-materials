import Link from "next/link";
import Navbar from "@/components/navbar/page";
import Footer from "@/components/footer/page";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center pt-32">
          <h1 className="text-4xl font-light text-[#1F3A5F] mb-4">
            Payment successful
          </h1>
          <p className="text-[#64748B] mb-8">
            Thanks — we received your payment. Our team will reach out if we
            need any details.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/collections"
              className="inline-block px-6 py-3 bg-[#1F3A5F] text-white hover:bg-[#E3A008] transition-colors"
            >
              Continue browsing
            </Link>
            <Link
              href="/cart"
              className="inline-block px-6 py-3 border border-[#E5E7EB] text-[#1F3A5F] hover:border-[#1F3A5F] transition-colors"
            >
              Back to cart
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
