import { useState } from "react";
import ContainerMain from "./ContainerMain";

function CancelTickets() {
  const [purchaseID, setPurchaseID] = useState("");
  const [ticketDetails, setTicketDetails] = useState("");
  const [errroMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Mock Data for Ticket Details
  const mockTicketData = {
    "123456789": {
      showName: "Avengers: Endgame",
      showtime: "2024-11-25T19:00:00Z",
      seat: "A12",
      price: 20.0,
      isCancellable: true,
    },
  };

  const fetchTicketDetails = () => {
    setErrorMessage("");
    setSuccessMessage("");

    // Mock fetching logic 
    const ticket = mockTicketData[purchaseID];
    if (ticket) {
      if(new Date(ticket.showtime) - new Date() < 72 * 60 * 60 * 1000) {
        // If within 72 hourss, mark as non-cancellable
        setErrorMessage("Tickets can only be cancelled at least 72 hours before the showtime.")
        setTicketDetails(null);
      } else {
        setTicketDetails(ticket);
      }
    } else {
      setErrorMessage("Unable to find ticket details. Please check your Purchase ID.")
      setTicketDetails(null)
    }

    // Replace the above with an actual API call in the future
    // Example:
    // fetch(`/api/tickets/${purchaseID}`)
    //   .then((response) => {
    //     if (!response.ok) throw new Error("Unable to find ticket details.");
    //     return response.json();
    //   })
    //   .then(setTicketDetails)
    //   .catch((error) => setErrorMessage(error.message));
  }

  const CancelTicket = () => {
    // Mock cancel logic
    if(ticketDetails.isCancellable) {
      setSuccessMessage(`Your ticket for "${ticketDetails.showName}" has been cencelled. A confirmation email has been sent. You have received a credit of $${(ticketDetails.price * 0.85).toFixed(2)}.`)
      setTicketDetails(null);
    } else {
      setErrorMessage("This ticket is no longer cancellable.")
    }

    // Replace the above with an actual API call in the future
    // Example:
    // fetch(`/api/tickets/cancel`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ purchaseID }),
    // })
    //   .then((response) => {
    //     if (!response.ok) throw new Error("Unable to cancel ticket.");
    //     return response.json();
    //   })
    //   .then((data) =>
    //     setSuccessMessage(`Your ticket has been cancelled. Credit: $${data.creditAmount}.`)
    //   )
    //   .catch((error) => setErrorMessage(error.message));
  }

  return(
    <ContainerMain>
      <h1>Cancel Tickets</h1>
      <div className="space-y-4">
        <label htmlFor="purchaseID" className="block font-medium">
          Enter your Purchase ID:
        </label>
        <input 
          type="text"
          id="purchaseID"
          value={purchaseID}
          onChange={(e) => setPurchaseID(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Enter Purchase ID"
        />
        <button 
          onClick={fetchTicketDetails} 
          className="mt-4 bg-acmeYellow text-white p-3 rounded-lg shadow-md hover:bg-acmeYellow-dark"
        >
          Find Ticket
        </button>
      </div>

      {errroMessage && <p className="text-red-500 mt-4">{errroMessage}</p>}
      {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}

      {ticketDetails && (
        <div className="mt-6 border border-gray-300 rounded-lg p-4">
          <h2 className="font-bold">Ticket Details:</h2>
          <p><strong>Show:</strong> {ticketDetails.showName}</p>
          <p><strong>Showtime:</strong> {ticketDetails.showtime}</p>
          <p><strong>Seat:</strong> {ticketDetails.seat}</p>
          <p><strong>Price:</strong> {ticketDetails.price}</p>
          <button
            onClick={CancelTicket}
            className="mt-4 bg-red-500 text-white p-3 rounded-lg shadow-md hover:bg-red-600"
          >
            Cancel Ticket
          </button>
        </div>
      )}
    </ContainerMain>
  )
}

export default CancelTickets;