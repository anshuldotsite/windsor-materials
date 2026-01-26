import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logo.png';

export default function Footer() {
  return (
    <footer className="flex flex-col bg-white text-[#243b64] border-t border-gray-200">
      <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="flex flex-col col-span-1 md:col-span-2">
            <div className="flex flex-row items-center gap-4 mb-4">
              <Image 
                src={logo} 
                alt="Windsor Materials" 
                width={120} 
                height={40}
                className="h-10 w-auto"
              />
              <h3 className="text-xl font-medium">Windsor Materials and Building Supply</h3>
            </div>
            <p className="text-[#64748B] mb-6 max-w-md font-light">
              Premium custom vanities and materials to transform your space with elegance and quality.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h4 className="text-base font-medium mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="flex flex-col space-y-3">
              <li>
                <Link href="/collections" className="text-[#64748B] hover:text-[#dda01e] transition-colors font-light">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-[#64748B] hover:text-[#dda01e] transition-colors font-light">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/custom-orders" className="text-[#64748B] hover:text-[#dda01e] transition-colors font-light">
                  Custom Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col">
            <h4 className="text-base font-medium mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="flex flex-col space-y-3 text- font-light">
              <li className="text-sm">
                info@windsormaterials.com
              </li>
              <li className="text-sm">
                (555) 123-4567
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center border-t border-gray-200 mt-12 pt-8">
          <div className="flex items-center gap-2">
            <span className="text-[#9CA3AF] text-xs font-normal">
              &copy; {new Date().getFullYear()} Windsor Materials and Building Supply
            </span>
            <span className="text-[#dda01e]">|</span>
            <a
              href="https://www.anshul.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9CA3AF] hover:text-[#dda01e] transition-all font-medium text-xs"
            >
              Website: Crafted by AK
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
