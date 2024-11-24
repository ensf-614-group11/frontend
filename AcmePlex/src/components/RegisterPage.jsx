import { useState } from "react";
import AppAPI from "./AppAPI";

function RegisterPage({ onSwitch }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");  // To hold any errors
  const [loading, setLoading] = useState(false);  // To show loading state



  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add registration logic here (API call)
    console.log("Register form submitted: ", {firstName, lastName, email, password, cardNumber, expiryDate, cvv})

    setLoading(true);
    setError(""); // Reset error state

    // Collecting the form data
    const registrationData = {
      firstName,
      lastName,
      email,
      password,
      cardNumber,
      expiryDate,
      cvv
    };

    try {
      const response = await AppAPI.register(registrationData, "defaultRegistration");

      console.log("Registration success:", response);
      // If registration is successful, you could redirect the user or show a success message.
      // Optionally, store user info or token in localStorage or state.
      // localStorage.setItem("authToken", response.data.token); // Example if a token is returned
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Error during registration. Please try again later."); // Display error to user
    } finally {
      setLoading(false); // Stop loading state
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block font-medium">
            First Name
          </label>
          <input 
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter your first name"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block font-medium">
            Last Name
          </label>
          <input 
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter your last name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter your password"
            required
          />
        </div>
        <h2 className="mt-6 text-lg font-semibold">Credit Card Information</h2>
        <div>
          <label htmlFor="cardNumber" className="block font-medium">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter card number"
            required
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="expiryDate" className="block font-medium">
              Expiry Date (MM/YY)
            </label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="cvv" className="block font-medium">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="CVV"
              required
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-full p-3 mt-6 bg-acmeYellow text-white font-bold rounded-lg shadow-md hover:bg-acmeYellow-dark"
      >
        Register
      </button>
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-acmeYellow hover:underline"
        >
          Login
        </button>
      </p>
    </form>
  )
}

export default RegisterPage;