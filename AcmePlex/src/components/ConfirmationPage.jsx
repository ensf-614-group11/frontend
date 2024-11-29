import { useLocation, useNavigate } from "react-router-dom";
import ContainerMain from "./ContainerMain";

function ConfirmationPage() {
  const { state } = useLocation();
  const { showtime, selectedSeats, totalCost } = state || {};
  const navigate = useNavigate();

  const formatDateLong = (dateString) => {
    if (!dateString) return "Invalid Date";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  }

  const handleBackToHome = () => {
    navigate("/");
  }

  return (
    <ContainerMain>
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-center">
          Thank you for your purchase from{" "}
          <span className="text-acmeYellow-dark">Acmeplex</span>
        </h2>
        <div className='border-t border-dotted border-neutral-300 my-4'></div>
        
        <h3 className="text-xl font-semibold mb-2">Your Purchase Details</h3>
        <p className="mb-1">
          Showtime: <span className="text-acmeYellow-dark">{showtime?.movieTitle || "Movie"}</span>
        </p>
        <p className="mb-1">
          Theatre: <span className="text-acmeYellow-dark">{showtime?.theatreName || "Theatre"}</span>
        </p>
        <p className="mb-1">
          Show Date: <span className="text-acmeYellow-dark">{formatDateLong(showtime?.date) || "Date"}</span> at{" "}
          <span className="text-acmeYellow-dark">{showtime?.time || "Time"}</span>
        </p>
        <p className="mb-1">
          Seats Purchased: <span className="text-acmeYellow-dark">{selectedSeats?.length || 0}</span> seats
        </p>
        <p className="mb-4">
          Total Cost: <span className="text-acmeYellow-dark">${totalCost?.toFixed(2) || "0.00"}</span>
        </p>

        <p className="mb-4 text-lg">
          You will receive an email with your ticket and receipt shortly.
        </p>

        <button
          onClick={handleBackToHome}
          className="w-full p-4 bg-acmeYellow text-white rounded-lg font-bold shadow-lg hover:bg-acmeYellow-dark"
        >
          Back to Home Page
        </button>
      </div>
    </ContainerMain>
  );
}

export default ConfirmationPage;