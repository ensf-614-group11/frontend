import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import ContainerMain from "./ContainerMain";
import AppAPI from "./AppAPI";

function PaymentPage() {
  const { state } = useLocation();
  const { showtime, selectedSeats, ticketPrice } = state || {};
  const [totalCost, setTotalCost] = useState((selectedSeats?.length || 0) * (ticketPrice || 0));
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    postalCode: "",
    city: "",
    province: "",
    country: "",
    cardHolderName: "",
    creditCardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [creditCode, setCreditCode] = useState("");
  const [creditError, setCreditError] = useState("");
  const [creditDiscount, setCreditDiscount] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("authToken") !== null);
  const [formErrors, setFormErrors] = useState({});
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if(token) {
          const response = await AppAPI.get("user/profile/get");
          console.log(response.data)
          const { id, firstName, lastName, email} = response.data;
          setUserId(id)
          const { street, city, province, postalCode, country } = response.data.savedBillingAddress || {};
          // const { cardHolderName, cardNumber, expiryDate } = response.data.paymentTypes[0] || {};

          const paymentResponse = await AppAPI.get("user/profile/payment-type/list");
          console.log(paymentResponse.data)

          const activePayment = paymentResponse.data.find(
            (payment) => payment.status === "Active"
          )
          
          const { cardHolderName, cardNumber, expiryDate } = activePayment;

          // if(activePayment) {
          //   const { cardHolderName, cardNumber, expiryDate } = activePayment;
          //   // setPaymentInfo({cardHolderName, cardNumber, expiryDate});
          // } else {
          //   console.log("No active payment types found.")
          // }

          setFormData({firstName, lastName, email, street, city, province, postalCode, country, cardHolderName, creditCardNumber: cardNumber, expiryDate});
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchProfileData();
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prev) => ({ ...prev, [name]: value}));
  };

  const handleCreditCodeChange = (e) => {
    setCreditCode(e.target.value);
  }
  
  const applyCreditCode = async () => {
    try {
      console.log("Credit Code: ", creditCode, "Amount: ", totalCost)
      const response = await AppAPI.post("validate-credit", {creditSecretCode: creditCode, amount: totalCost});
      console.log(response)
      if(response.valid) {
        const discount = totalCost - response.newAmount < 0 ? 0 : totalCost - response.newAmount;
        const newTotalCost = response.newAmount < 0 ? totalCost : response.newAmount;
        setCreditDiscount(discount)
        setTotalCost(newTotalCost)
        setCreditError("");
      } else {
        setCreditError("Invalid credit code");
      }
    } catch (error) {
      setCreditError("Failed to validate the credit code.")
    }
  }

  const validateForm = () => {
    const errors = {};

    // Ensure all fields are filled in
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        errors[key] = `${key} is required`;
      }
    });

    // Validate Credit Card Number (16 digits)
    const creditCardNumberRegex = /^\d{16}$/;
    if (formData.creditCardNumber && !creditCardNumberRegex.test(formData.creditCardNumber)) {
      errors.creditCardNumber = "Credit card number must be 16 digits";
    }

    // Validate Expiry Date (MMYY format)
    const expiryDateRegex = /^(0[1-9]|1[0-2])\d{2}$/;
    if (formData.expiryDate && !expiryDateRegex.test(formData.expiryDate)) {
      errors.expiryDate = "Expiry date must be in MM/YY format";
    }

    // Validate CVV (3 or 4 digits)
    const cvvRegex = /^\d{3,4}$/;
    if (formData.cvv && !cvvRegex.test(formData.cvv)) {
      errors.cvv = "CVV must be a 3 or 4 digit number";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirmPayment = async () => {

    if(totalCost < 0) {
      alert("Total cost cannot be negative.");
      return
    }

    if (isLoggedIn) {
      const paymentData = {
        amount: totalCost,
        seatId: selectedSeats[0],
        showtimeId: showtime.id,
        userId: userId,
        cvv: formData.cvv
      }

      console.log(paymentData)

      try {
        await AppAPI.post("payment/registered", paymentData)
        navigate("/Confirmation", { state: { totalCost: totalCost, selectedSeats, showtime,  } });
      } catch (error) {
        console.error("Payment failed", error)
        alert("Payment failed, please try again.")
      }
      return
    } else {
      if (!validateForm()) {
        return; // If validation fails, do not proceed with payment
      }

      const paymentData = {
        ...formData,
        amount: totalCost,
        countryCode: "CA", // Hardcoded for now
        showtimeId: showtime.id,
        seatId: selectedSeats[0]
      }
  
      delete paymentData.cardHolderName;
      delete paymentData.creditCode;
  
      console.log(paymentData)
  
      try {
        await AppAPI.post("payment/unregistered", paymentData)
        navigate("/Confirmation", { state: { totalCost: totalCost, selectedSeats, showtime,  } });
      } catch (error) {
        console.error("Payment failed", error)
        alert("Payment failed, please try again.")
      }
    }
  };

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
      <div className="container mx-auto p-6">
        <Link
          to="/Showtimes"
          className="inline-block px-4 py-2 text-white bg-neutral-500 rounded-lg hover:bg-acmeYellow mb-5"
        >
          Back
        </Link>
        <h2 className="text-2xl font-bold text-center">
          Payment for{" "}
          <span className="text-acmeYellow-dark">{selectedSeats?.length || ""}</span> seats for{" "}
          <span className="text-acmeYellow-dark">{showtime?.movieTitle || "Movie"}</span> at{" "}
          <span className="text-acmeYellow-dark">{showtime?.theatreName || "Theatre"}</span> on{" "}
          <span className="text-acmeYellow-dark">{formatDateLong(showtime?.date) || "Date"}</span> at{" "} 
          <span className="text-acmeYellow-dark">{showtime?.time || "Time"}</span>
        </h2>
        <div className='border-t border-dotted border-neutral-300 my-4'></div>
        <h1 className="text-2xl font-bold mb-4">Payment Information</h1>
        <form className="space-y-4">
        {isLoggedIn ? (
            <>
              <h3 className="text-lg font-semibold">User Details</h3>
              <p>
                Name: {formData.firstName} {formData.lastName}
              </p>
              <p>Email: {formData.email}</p>
              <h3 className="text-lg font-semibold">Billing Address</h3>
              <p>Street: {formData.street}</p>
              <p>
                City: {formData.city}, {formData.province} {formData.postalCode}
              </p>
              <p>Country: {formData.country}</p>
              <h3 className="text-lg font-semibold">Payment Information</h3>
              <p>Cardholder Name: {formData.cardHolderName}</p>
              <p>Card Number: {formData.creditCardNumber}</p>
              <p>Expiry Date: {formData.expiryDate}</p>
              <input 
                type="text"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
              {formErrors.cvv && (
                <p className="text-red-500 text-xs">{formErrors.cvv}</p>
              )}
              <Link
                to="/profile"
                className="mt-4 inline-block px-4 py-2 bg-acmeBlue text-white rounded-lg hover:bg-acmeBlue-lighter"
              >
                Edit Payment Information
              </Link>
            </>
          ) : (
            <>
              <h3>User Details</h3>
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
              {/* Billing Address */}
              <h3>Billing Address</h3>
              <input 
                type="text"
                name="street"
                placeholder="Street"
                value={formData.street}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="p-2 border rounded-lg"
                />
                <input 
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="p-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text"
                  name="province"
                  placeholder="Province"
                  value={formData.province}
                  onChange={handleChange}
                  className="p-2 border rounded-lg"
                />
                <input 
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              {/* Payment Info */}
              <h3>Payment Information</h3>
              <input 
                type="text"
                name="cardHolderName"
                placeholder="CardHolder Name"
                value={formData.cardHolderName}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
              <input 
                type="text"
                name="creditCardNumber"
                placeholder="Credit Card Number"
                value={formData.creditCardNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
              {formErrors.creditCardNumber && (
                <p className="text-red-500 text-xs">{formErrors.creditCardNumber}</p>
              )}
              <input 
                type="text"
                name="expiryDate"
                placeholder="Expiry Date"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
              {formErrors.expiryDate && (
                <p className="text-red-500 text-xs">{formErrors.expiryDate}</p>
              )}
              <input 
                type="text"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
              {formErrors.cvv && (
                <p className="text-red-500 text-xs">{formErrors.cvv}</p>
              )}
            </>
          )}

          {/* Acmeplex Credit Code */}
          <div className='border-t border-dotted border-neutral-300 my-4'></div>
          <h3 className="text-lg font-semibold">Enter AcmePlex Credit Code (optional)</h3>
          <div>
            <input 
              type="text"
              placeholder="Enter Acmeplex Credit Code"
              value={creditCode}
              onChange={handleCreditCodeChange}
              className="w-full p-2 border rounded-lg"
            />
            <button
              type="button"
              onClick={applyCreditCode}
              className="mt-2 bg-acmeBlue text-white rounded-lg p-2 hover:bg-acmeBlue-lighter"
            >
              Apply
            </button>
            {creditError && <p className="text-red-500">{creditError}</p>}
          </div>
          <div className="text-lg font-semibold">
            Total Cost: ${totalCost.toFixed(2)}
          </div>
          {(formErrors.firstName || formErrors.lastName || formErrors.email || formErrors.street || formErrors.postalCode || formErrors.city || formErrors.province || formErrors.country) && (
            <p className="text-red-500 text-xs">All fields are required to be filled.</p>
          )}
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