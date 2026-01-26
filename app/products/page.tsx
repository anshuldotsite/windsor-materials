import Navbar from '@/components/navbar/page';
import ProductGrid from '@/components/product-grid/page';
import Footer from '@/components/footer/page';

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex flex-col grow pt-24">
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
}
