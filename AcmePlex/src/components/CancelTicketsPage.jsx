import { useState } from "react";
import ContainerMain from "./ContainerMain";
import AppAPI from "./AppAPI";

function CancelTickets() {
  const [ticketId, setTicketId] = useState("");
  const [email, setEmail] = useState("");
  const [ticketDetails, setTicketDetails] = useState("");
  const [errroMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchTicketDetails = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    setTicketDetails(null);

    try {
      const repsonse = await AppAPI.get("cancel-ticket/get", {
          ticketId: ticketId
      });

      if(repsonse.success) {
        const ticket = repsonse.data.ticket;
        if (ticket.status === "Cancelled") {
          setErrorMessage("This ticket has already been cancelled.");
        } else {
          setTicketDetails(ticket);
        }
      } else {
        setErrorMessage(repsonse.message || "Unable to retrieve ticket details.");
      }
    } catch (error) {
      setErrorMessage(error.message || "Error retrieving ticket details.");
    }
  };

  const CancelTicket = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const route = ticketDetails.belongsToRegisteredUser
        ? "cancel-ticket/post/registered"
        : "cancel-ticket/post/ordinary";

      const requestData = ticketDetails.belongsToRegisteredUser
        ? { ticketId: ticketId }
        : { ticketId: ticketId, email };

      const response = await AppAPI.post(route, requestData);

      if(response.success) {
        setSuccessMessage(response.message || "Ticket cancelled successfully.");
        setTicketDetails(null);
      } else {
        setErrorMessage(response.message || "Unable to cancel ticket.");
      } 
    } catch (error) {
      setErrorMessage(error.message || "Error cancelling ticket.");
    }
  }; 


  return(
    <ContainerMain>
      <h1>Cancel Tickets</h1>
      <div className="space-y-4">
        <label htmlFor="purchaseID" className="block font-medium">
          Enter your Ticket ID:
        </label>
        <input 
          type="text"
          id="ticketID"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Enter Ticket ID"
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
          <p><strong>Show:</strong> {ticketDetails.showtime.movieTitle}</p>
          <p><strong>Theatre:</strong> {ticketDetails.showtime.theatre}</p>
          <p><strong>Showtime:</strong> {new Date(ticketDetails.showtime.dateAndTime).toLocaleString()}</p>
          {ticketDetails.belongsToRegisteredUser ? (
            <button
              onClick={CancelTicket}
              className="mt-4 bg-red-500 text-white p-3 rounded-lg shadow-md hover:bg-red-600"
            >
              Cancel Ticket
            </button>
          ) : (
            <>
              <label htmlFor="email" className="block mt-4 font-medium">
                Enter your email:
              </label>
              <input 
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter Email"
              />
              <button
                onClick={CancelTicket}
                className="mt-4 bg-red-500 text-white p-3 rounded-lg shadow-md hover:bg-red-600"
              >
                Cancel Ticket
              </button>
            </>
          )}
        </div>
      )}
    </ContainerMain>
  )
}

export default CancelTickets;