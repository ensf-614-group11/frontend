import { useState } from "react";
import AppAPI from "./AppAPI";
import { useNavigate } from "react-router-dom";

function RegisterPage({ onSwitch }) {
  // User Details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Billing Address
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  // Payment Details
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  // Error and Loading State
  const [error, setError] = useState("");  
  const [loading, setLoading] = useState(false);  
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); 

    // Construct API payload
    const payload = {
      user: {
        email,
        password,
        firstName,
        lastName,
        countryCode: "CA", // Fixed to CA
      },
      billingAddress: {
        street,
        city,
        region,
        postalCode,
        country,
      },
      paymentType: {
        type: "CREDIT_CARD", // Fixed to CREDIT_CARD
        cardholderName,
        cardNumber,
        expirationDate: expiryDate,
        cvv,
        countryCode: "CA", // Fixed to CA
      },
    };

    try {
      console.log(payload)
      const response = await AppAPI.register(payload);

      console.log("Registration success:", response);

      if(response.success) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("email", response.data.email);

        alert("Got token: ", localStorage.getItem("authToken"))

        navigate("/")
      } else {
        setError("Invalid registration details. Please try again.")
      }
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
        <h2 className="mt-6 text-lg font-semibold">Billing Address</h2>
        <div>
          <label htmlFor="street" className="block font-medium">
            Street
          </label>
          <input
            type="text"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter street"
            required
          />
        </div>
        <div>
          <label htmlFor="postalCode" className="block font-medium">
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter postal code"
            required
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="city" className="block font-medium">
              City
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter city"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="province" className="block font-medium">
              Province
            </label>
            <input
              type="text"
              id="province"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter province"
              required
            />
          </div>
        </div>
        <div>
            <label htmlFor="country" className="block font-medium">
              Country
            </label>
            <input 
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter country"
              required
            />
          </div>

        <h2 className="mt-6 text-lg font-semibold">Payment Details</h2>
        <div>
          <label htmlFor="cardholderName" className="block font-medium">
            Cardholder Name
          </label>
          <input
            type="text"
            id="cardholderName"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter cardholder name"
            required
          />
        </div>
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
              Expiry Date (MMYY)
            </label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="MMYY"
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
      {error && <p className="mt-4 text-red-600">{error}</p>}
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