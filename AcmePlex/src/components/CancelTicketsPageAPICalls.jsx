// import { useState } from "react";

// function CancelTickets() {
//   const [purchaseID, setPurchaseID] = useState("");
//   const [ticketDetails, setTicketDetails] = useState(null);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const fetchTicketDetails = async () => {
//     setErrorMessage("");
//     setSuccessMessage("");
//     try {
//       const response = await fetch(`/api/tickets/${purchaseID}`);
//       if (!response.ok) {
//         throw new Error("Unable to find ticket details.");
//       }
//       const data = await response.json();
//       setTicketDetails(data);
//     } catch (error) {
//       setErrorMessage(error.message);
//       setTicketDetails(null);
//     }
//   };

//   const cancelTicket = async () => {
//     try {
//       const response = await fetch(`/api/tickets/cancel`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ purchaseID }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Unable to cancel ticket.");
//       }

//       const result = await response.json();
//       setSuccessMessage(
//         `Your ticket has been cancelled successfully. A confirmation email has been sent. You have received a credit of ${result.creditAmount}.`
//       );
//       setTicketDetails(null); // Clear the ticket details after cancellation
//     } catch (error) {
//       setErrorMessage(error.message);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Cancel Tickets</h1>
//       <div className="space-y-4">
//         <label htmlFor="purchaseID" className="block font-medium">
//           Enter your Purchase ID:
//         </label>
//         <input
//           type="text"
//           id="purchaseID"
//           value={purchaseID}
//           onChange={(e) => setPurchaseID(e.target.value)}
//           className="w-full p-3 border border-gray-300 rounded-lg"
//           placeholder="Enter Purchase ID"
//         />
//         <button
//           onClick={fetchTicketDetails}
//           className="mt-4 bg-acmeYellow text-white p-3 rounded-lg shadow-md hover:bg-acmeYellow-dark"
//         >
//           Find Ticket
//         </button>
//       </div>

//       {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
//       {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}

//       {ticketDetails && (
//         <div className="mt-6 border border-gray-300 rounded-lg p-4">
//           <h2 className="font-bold">Ticket Details:</h2>
//           <p><strong>Show:</strong> {ticketDetails.showName}</p>
//           <p><strong>Showtime:</strong> {ticketDetails.showtime}</p>
//           <p><strong>Seat:</strong> {ticketDetails.seat}</p>
//           <p><strong>Price:</strong> ${ticketDetails.price}</p>
//           <button
//             onClick={cancelTicket}
//             className="mt-4 bg-red-500 text-white p-3 rounded-lg shadow-md hover:bg-red-600"
//           >
//             Cancel Ticket
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CancelTickets;
