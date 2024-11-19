import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import ContainerMain from "./ContainerMain";

function AvailableSeatsPage() {
  const { state } = useLocation();
  const { showtime } = state || {}
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Mock data for seat availability (to be replaced with API call)
  const mockSeats = Array.from({length: 5}, (_, row) => 
    Array.from({length: 8}, (_, col) => ({
        id: `${String.fromCharCode(65 + row)}${col + 1}`,
        isBooked: Math.random() < 0.2 // randomly mark some seats as booked
    })))
  const mockTicketPrice = 15;

  // Toggle seat selection
  const toggleSeatSelection = (seatID) => {
    setSelectedSeats((prev) => 
      prev.includes(seatID) ? prev.filter((id) => id !== seatID) : [...prev, seatID]);
  }

  const formatDateLong = (dateString) => {
    if(!dateString) return "Invalid Date";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  }

  return (
    <ContainerMain>
      <div className="space-y-6">
        <Link
          to="/Showtimes"
          className="inline-block px-4 py-2 text-white bg-neutral-500 rounded-lg hover:bg-acmeYellow"
        >
          Back
        </Link>
        <h2 className="text-2xl font-bold text-center">
          Available seats for{" "}
          <span className="text-acmeYellow-dark">{showtime?.movie || "Movie"}</span> at{" "}
          <span className="text-acmeYellow-dark">{showtime?.theatre || "Theatre"}</span> on{" "}
          <span className="text-acmeYellow-dark">{formatDateLong(showtime?.date) || "Date"}</span> at{" "} 
          <span className="text-acmeYellow-dark">{showtime?.time || "Time"}</span>
        </h2>
        <div className="space-y-4">
          {/* Screen Indicator */}
          <div className="flex justify-center items-center mb-4">
            <div className="w-full h-8 bg-acmeBlue-lighter text-white text-center font-bold rounded-t-lg">
              SCREEN
            </div>
          </div>
          {/* Seat Selection Grid */}
          <div className="grid grid-cols-8 gap-2">
            {mockSeats.flat().map((seat) => (
              <button
                key={seat.id}
                className={`w-10 h-10 text-center rounded-lg ${
                  seat.isBooked
                    ? "bg-gray-300 cursor-not-allowed"
                    : selectedSeats.includes(seat.id)
                    ? "bg-acmeYellow-dark text-white"
                    : "bg-white border border-neutral-300 hover:bg-acmeYellowlight"
                }`}
                onClick={() => !seat.isBooked && toggleSeatSelection(seat.id)}
                disabled={seat.isBooked}
              >
                {seat.id}
              </button>
            ))}
          </div>
          {/* Legend */}
          <div className="flex flex-wrap items-center space-x-4">
            <span className="flex items-center mb-3">
              <div className="w-6 h-6 bg-gray-300 rounded-lg mr-2"></div>Booked
            </span>
            <span className="flex items-center mb-3">
              <div className="w-6 h-6 bg-white border border-neutral-300 rounded-lg mr-2"></div>Available
            </span>
            <span className="flex items-center mb-3">
              <div className="w-6 h-6 bg-acmeYellow-dark text-white rounded-lg mr-2"></div>Selected
            </span>
          </div>
        </div>

        {/* Selected Seats Summary */}
        {selectedSeats.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold">Selected Seats:</h3>
            <p>{selectedSeats.join(", ")}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/Payment"
            state={{selectedSeats, ticketPrice: mockTicketPrice}}
          >
            <button
              className="w-full p-4 bg-acmeYellow text-white rounded-lg font-bold shadow-lg hover:bg-acmeYellow-dark"
              disabled={selectedSeats.length === 0}
            >
              Confirm Booking
            </button>
          </Link>
          <Link
            to="/Showtimes"
            className="block text-center p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-lg hover:bg-gray-200"
          >
            Back to Showtimes
          </Link>
        </div>
      </div>
    </ContainerMain>
  )
}

export default AvailableSeatsPage;