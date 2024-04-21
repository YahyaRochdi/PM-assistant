import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from './mobile-menu';


export default function Header() {
  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="flex items-center justify-between h-20">
     
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link href="/" className="block" aria-label="Cognizant">
              <Image
                src="/images/Plogo.png" // Adjust the path if necessary
                alt="Logo"
                width={55}  // Adjust the size as necessary
                height={55}
                quality={100}
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop documentation link */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link
                  href="/documentation"
                  className="btn-sm text-sm text-white bg-purple-600 hover:bg-purple-700 px-2 py-1 flex items-center transition duration-150 ease-in-out"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
