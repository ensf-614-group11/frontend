import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import ContainerMain from "./ContainerMain";

function PaymentPage() {
  const { state } = useLocation();
  const { selectedSeats, ticketPrice } = state || {};
  const totalCost = (selectedSeats?.length || 0) * (ticketPrice || 0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    creditCard: "",
    creditID: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value}));
  };

  const handleConfirmPayment = () => {
    // Placeholder for payment handling logic
    console.log("Payment Details Submitted: ", formData, totalCost);
    navigate("/Confirmation", { state: {totalCost, selectedSeats}});
  };

  return (
    <ContainerMain>
      <div className="container mx-auto p-6">
        <Link
          to="/AvailableSeats"
          className="inline-block px-4 py-2 text-white bg-neutral-500 rounded-lg hover:bg-acmeYellow mb-5"
        >
          Back
        </Link>
        <h1 className="text-2xl font-bold mb-4">Payment Information</h1>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="p-2 border rounded-lg"
            />
            <input 
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="p-2 border rounded-lg"
            />
          </div>
          <input 
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          <input 
          type="text"
          name="creditCard"
          placeholder="Credit Card Number"
          value={formData.creditCard}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          />
          <input 
            type="text"
            name="creditID"
            placeholder="Credit ID (optional)"
            value={formData.creditID}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          <div className="text-lg font-semibold">
            Total Cost: ${totalCost.toFixed(2)}
          </div>
          <button
            type="button"
            className="w-full p-4 bg-acmeYellow text-white rounded-lg font-bold shadow-lg hover:bg-acmeYellow-dark"
            onClick={handleConfirmPayment}
          >
            Confirm Payment
          </button>
        </form>
      </div>
    </ContainerMain>

  )
}

export default PaymentPage;