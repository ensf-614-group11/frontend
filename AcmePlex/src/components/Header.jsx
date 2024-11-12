import { Link } from "react-router-dom"

function Header() {
  return(
    <header className="h-20 bg-neutral-300 flex items-center justify-between px-4">
      <div className="flex items-center">
        <Link to="/">
          <img 
            src="./acmeplex-logo-popcorn-beside.png" 
            alt="AcmePlex Logo"
            className="h-16 w-auto"
          />      
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/Login" className="text-acmeBlue hover:underline hover:text-acmeBlue-light">Login</Link>
        <Link to="/CancelTickets" className="text-acmeBlue hover:underline hover:text-acmeBlue-light">Cancel Tickets</Link>
      </div>
    </header>
  );
}

export default Header;