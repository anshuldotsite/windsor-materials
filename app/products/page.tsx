import Navbar from '@/components/navbar/page';
import ProductGrid from '@/components/product-grid/page';
import Footer from '@/components/footer/page';
import { listProducts } from '@/lib/data/products';

export default async function ProductsPage() {
  const products = await listProducts();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex flex-col grow pt-24">
        <ProductGrid products={products} />
      </main>
      <Footer />
    </div>
  );
}
