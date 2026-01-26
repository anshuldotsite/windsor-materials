import Navbar from '@/components/navbar/page';
import Collections from '@/components/collections/page';
import Footer from '@/components/footer/page';

export default function CollectionsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex flex-col grow pt-24">
        <Collections />
      </main>
      <Footer />
    </div>
  );
}
