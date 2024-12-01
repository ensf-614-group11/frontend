import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import ContainerMain from "./ContainerMain";
import AppAPI from "./AppAPI";

function AvailableSeatsPage() {
  const { state } = useLocation();
  const { showtime } = state || {}
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [earlyReleaseSeatsTaken, setEarlyReleaseSeatsTaken] = useState(0);

  const ticketPrice = 15;

  useEffect(() => {
    if(showtime?.id) {
      const fetchSeats = async () => {
        try {
          const seatData = await AppAPI.get(`availableSeats/${showtime.id}`);
          const enrichedSeats = seatData.map((seat, index) => ({
            ...seat,
            row: Math.floor(index / 8) + 1,
            number: (index % 8) + 1,
          }));
          console.log('Fetched seat data:', enrichedSeats)
          setSeats(enrichedSeats);
        } catch (error) {
          setError("Failed to load seat availability:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchSeats();
    }
  }, [showtime?.id])

  useEffect(() => {
    if(showtime?.earlyRelease && seats.length > 0) {
      const soldSeats = seats.filter((seat) => !seat.available).length;
      setEarlyReleaseSeatsTaken(soldSeats);
      // console.log(earlyReleaseSeatsTaken);
    }
  }, [showtime?.earlyRelease, seats])

  const maxEarlyReleaseSeats = Math.ceil(seats.filter(seat => seat.available).length * 0.1)


  // Toggle seat selection
  const toggleSeatSelection = (seatID) => {
    if (
      showtime?.earlyRelease && 
      selectedSeats.length >= maxEarlyReleaseSeats
    ) {
      return;
    }

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

  const canSelectSeats = !showtime?.earlyRelease || earlyReleaseSeatsTaken + selectedSeats.length < maxEarlyReleaseSeats

  const totalPrice = selectedSeats.length * ticketPrice;

  // Group seats by row
  const seatsByRow = seats.reduce((rows, seat, index) => {
    const rowIndex = Math.floor(index / 8);
    if (!rows[rowIndex]) rows[rowIndex] = [];
    rows[rowIndex].push(seat);
    return rows;
  }, []);

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
          <span className="text-acmeYellow-dark">{showtime?.movieTitle || "Movie"}</span> at{" "}
          <span className="text-acmeYellow-dark">{showtime?.theatreName || "Theatre"}</span> on{" "}
          <span className="text-acmeYellow-dark">{formatDateLong(showtime?.date) || "Date"}</span> at{" "} 
          <span className="text-acmeYellow-dark">{showtime?.time || "Time"}</span>
        </h2>

        {showtime?.earlyRelease && earlyReleaseSeatsTaken + selectedSeats.length >= maxEarlyReleaseSeats && (
          <div className="text-red-500 text-center">
            All early release seats have been purchased. Please select a different movie.
          </div>

        )}

        {loading ? (
          <div className="text-center text-lg">Loading seat availability...</div>
        ) : error ? (
          <div className="text-center text-lg text-red-600">{error}</div>
        ) : (
          <div className="space-y-4">
            {/* Screen Indicator */}
            <div className="flex justify-center items-center mb-4">
              <div className="w-full h-8 bg-acmeBlue-lighter text-white text-center font-bold rounded-t-lg">
                SCREEN
              </div>
            </div>
            <div className="flex">
              <div className="mr-2 font-bold text-acmeBlue-lighter">Row</div>
              <div className="w-px h-6 bg-neutral-400 mx-2 mr-4"></div>
              <div className="font-bold text-acmeBlue-lighter">Seats</div>
            </div>
            {/* Seat Selection Grid */}
            <div className="space-y-2">
              {seatsByRow.map((row, rowIndex) => (
                <div key={`row-${rowIndex}`} className="flex items-center">
                  {/* Row Label */}
                  <div className="w-10 text-center font-bold">
                    {rowIndex + 1}
                  </div>
                  {/* Vertical Line */}
                  <div className="w-px h-6 bg-neutral-400 mx-2 mr-4"></div>
                  {/* Seats in Row */}
                  <div className="grid grid-cols-8 gap-2 flex-1">
                    {row.map((seat, seatIndex) => (
                      <button
                      key={seat.seatId}
                      className={`w-10 h-10 text-center rounded-lg ${
                        earlyReleaseSeatsTaken + selectedSeats.length >= maxEarlyReleaseSeats
                        ? "bg-gray-300 cursor-not-allowed hover:bg-gray-300"
                        : seat.available
                          ? selectedSeats.includes(seat.seatId)
                            ? "bg-acmeYellow-dark text-white"
                            : "bg-white border border-neutral-300 hover:bg-acmeYellowlight"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                      onClick={() => seat.available && toggleSeatSelection(seat.seatId)}
                      disabled={!seat.available || showtime?.earlyRelease && !canSelectSeats}
                    >
                      {seatIndex + 1}
                    </button>
                    ))}
                  </div>
                </div>
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
        )}

        {showtime?.earlyRelease && earlyReleaseSeatsTaken + selectedSeats.length >= maxEarlyReleaseSeats && (
          <div className="text-red-500 text-center">
            All early release seats have been purchased. Please select a different movie.
          </div>

        )}

        {/* Selected Seats Summary */}
        {selectedSeats.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold">Selected Seats:</h3>
            <div>
              {selectedSeats
                .map(seatId => {
                  const seat = seats.find(seat => seat.seatId === seatId);
                  return seat ? (
                    <div key={seatId}>
                      Row: {seat.row}, Seat: {seat.number}
                    </div>
                  ) : null;
                })
                .filter(Boolean)}
            </div>
          </div>
        )}

        {/* Total Price Display */}
        <div className="text-center text-xl font-semibold mt-4">
          Total Price: ${totalPrice}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/Payment"
            state={{showtime, selectedSeats, ticketPrice}}
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