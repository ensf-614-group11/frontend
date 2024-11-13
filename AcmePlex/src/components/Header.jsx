import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return(
    <header className="h-20 bg-neutral-200 flex items-center justify-between px-4 border border-neutral-300">
      <div className="flex items-center">
        <Link to="/">
          <img 
            src={isMobile ? "./acmeplex-logo-just-popcorn.png" : "./acmeplex-logo-popcorn-beside.png"}
            alt="AcmePlex Logo"
            className="h-16 w-auto"
          />      
        </Link>
      </div>

      <div className="flex items-center space-x-4 mr-5">
        <Link to="/Login" className="text-acmeBlue hover:underline hover:text-acmeBlue-light">Login</Link>
      </div>
    </header>
  );
}

export default Header;