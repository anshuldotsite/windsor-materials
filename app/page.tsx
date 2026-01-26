import Navbar from '@/components/navbar/page';
import Hero from '@/components/hero/page';
import FeaturedCollections from '@/components/featured-collections/page';
import Footer from '@/components/footer/page';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex flex-col grow">
        <Hero />
        <FeaturedCollections />
      </main>
      <Footer />
    </div>
  );
}
