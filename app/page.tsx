import Navbar from "@/components/navbar/page";
import Hero from "@/components/hero/page";
import FeaturedCollections from "@/components/featured-collections/page";
import ReviewsMarquee from "@/components/reviews/page";
import Footer from "@/components/footer/page";
import Statistics from "@/components/statistics/page";
import Gallery from "@/components/gallery/page";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex flex-col grow">
        <Hero />
        <Statistics />
        <ReviewsMarquee />
        <FeaturedCollections />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}
