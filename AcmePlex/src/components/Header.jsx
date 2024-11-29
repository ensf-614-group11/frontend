import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppAPI from "./AppAPI";

function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600)
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName") || null); 
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("authToken") !== null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);

    // Check if user is logged in
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          const firstName = localStorage.getItem("firstName");
          if (!firstName) {
            const response = await AppAPI.get("user/profile/get");
            console.log(response)
            setFirstName(response.data.firstName);
            localStorage.setItem("firstName", response.data.firstName)
          } 
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    }

    fetchUserData();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    // await AppAPI.post("auth/logout")// Add the API call to the logout
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
    localStorage.removeItem("firstName");
    setFirstName(null);
    setIsLoggedIn(false);
    navigate("/");

    window.location.reload();
  }

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
        {isLoggedIn ? (
          <>
            <button
              onClick={() => navigate("/Profile")}
              className="text-acmeBlue hover:underline hover:text-acmeBlue-light"
            >
              Welcome, {firstName}
            </button>
            <span className="text-neutral-500">|</span>
            <button
              onClick={handleLogout}
              className="text-acmeBlue hover:underline hover:text-acmeBlue-light"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/Login" className="text-acmeBlue hover:underline hover:text-acmeBlue-light">Login</Link>
        )}
      </div>
    </header>
  );
}

export default Header;