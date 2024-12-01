import { useState, useEffect } from "react";
import AppAPI from "./AppAPI";
import { useNavigate, Link } from "react-router-dom";
import ContainerMain from "./ContainerMain";

function ProfilePage() {
  // const [isEditing, setIsEditing] = useState(false); // Track whether in edit mode
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "", // optional, depending on if you allow password editing
  });
  const [isEditingUserDetails, setIsEditingUserDetails] = useState(false);

  const [billingAddress, setBillingAddress] = useState({
    street: "",
    city: "",
    province: "",
    postalCode: "",
    country: "",
  });
  const [isEditingBillingAddress, setIsEditingBillingAddress] = useState(false);

  const [paymentInfo, setPaymentInfo] = useState({
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [isEditingPaymentInfo, setIsEditingPaymentInfo] = useState(false);

  const [errorMessages, setErrorMessages] = useState({
    userDetails: "",
    billingAddress: "",
    paymentInfo: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if(token) {
          const userResponse = await AppAPI.get("user/profile/get");
          console.log(userResponse.data);
          const { firstName, lastName, email} = userResponse.data;
          const { street, city, province, postalCode, country } = userResponse.data.savedBillingAddress || {};

          setUserDetails({firstName, lastName, email});
          setBillingAddress({street, city, province, postalCode, country})

          const paymentResponse = await AppAPI.get("user/profile/payment-type/list");
          console.log(paymentResponse.data)

          const activePayment = paymentResponse.data.find(
            (payment) => payment.status === "Active"
          )

          if(activePayment) {
            const { cardHolderName, cardNumber, expiryDate } = activePayment;
            setPaymentInfo({cardHolderName, cardNumber, expiryDate});
          } else {
            console.log("No active payment types found.")
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchProfileData();
  }, []);

  const validateUserDetails = () => {
    if (!userDetails.firstName || !userDetails.lastName || !userDetails.email) {
      return "Please fill in all fields.";
    }
    return "";
  };

  const validateBillingAddress = () => {
    if (!billingAddress.street || !billingAddress.city || !billingAddress.postalCode || !billingAddress.province || !billingAddress.country) {
      return "Please fill in all billing address fields.";
    }
    return "";
  };

  const validatePaymentInfo = () => {
    if (!paymentInfo.cardHolderName || !paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv) {
      return "Please fill in all payment information fields.";
    }

    // Validate credit card number (16 digits)
    const cardNumberRegex = /^\d{16}$/;
    if (!cardNumberRegex.test(paymentInfo.cardNumber)) {
      return "Credit card number must be 16 digits.";
    }

    // Validate expiry date (MM/YY format)
    const expiryDateRegex = /^(0[1-9]|1[0-2])\d{2}$/;
    if (!expiryDateRegex.test(paymentInfo.expiryDate)) {
      return "Expiry date must be in MMYY format.";
    }

    // Validate CVV (3 or 4 digits)
    const cvvRegex = /^\d{3,4}$/;
    if (!cvvRegex.test(paymentInfo.cvv)) {
      return "CVV must be 3 or 4 digits.";
    }
    return "";
  };

  const handleSaveUserDetails = async () => {
    const error = validateUserDetails();
    if (error) {
      setErrorMessages((prev) => ({...prev, userDetails: error}));
      return;
    }
    
    try {
      await AppAPI.put("user/profile/update", userDetails);
      localStorage.setItem("firstName", userDetails.firstName)
      setIsEditingUserDetails(false);
      setErrorMessages((prev) => ({ ...prev, userDetails: "" }));
      console.log("User Info saved");
    } catch (error) {
      console.error("Error saving user info:", error);
    }
  }

  const handleSaveBillingAddress = async () => {
    const error = validateBillingAddress();
    if (error) {
      setErrorMessages((prev) => ({...prev, billingAddress: error}));
      return;
    }
    try {
      await AppAPI.put("user/profile/billing-address", billingAddress);
      setIsEditingBillingAddress(false);
      setErrorMessages((prev) => ({ ...prev, billingAddress: "" }));
      console.log("Billing address saved");
    } catch (error) {
      console.error("Error saving billing address:", error);
    }
  }

  const handleSavePaymentInfo = async () => {
    const error = validatePaymentInfo();
    if (error) {
      setErrorMessages((prev) => ({ ...prev, paymentInfo: error }));
      return;
    }
    try {
      const paymentInfoToSend = {
        type: "CREDIT_CARD",
        countryCode: "CA",
        cardholderName: paymentInfo.cardHolderName,
        cardNumber: paymentInfo.cardNumber,
        expirationDate: paymentInfo.expiryDate,
        cvv: paymentInfo.cvv,
      }
      console.log(paymentInfoToSend)

      const response = await AppAPI.put("user/profile/payment-type/manage", paymentInfoToSend);

      if(response.success) {
        setIsEditingPaymentInfo(false);
        setPaymentInfo({
          cardHolderName: response.data.cardHolderName,
          cardNumber: response.data.cardNumber,
          expiryDate:response.data.expiryDate,
          cvv: "", // reset cvv for security
        })
        setErrorMessages((prev) => ({ ...prev, paymentInfo: "" }));
      } else {
        console.error("Failed to update payment info:", response.data.message);
      }
    } catch (error) {
      console.error("Error saving payment info:", error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    // await AppAPI.post("auth/logout")// Add the API call to the logout
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
    localStorage.removeItem("firstName");
    // setFirstName(null);// will removing from local storage be enough?
    navigate("/");
  };

  return(
    <ContainerMain>
      <Link
        to="/"
        className="inline-block px-4 py-2 text-white bg-neutral-500 rounded-lg hover:bg-acmeYellow"
      >
        Back
      </Link>
    <div>
      <h1 className="text-3xl font-semibold mb-1 text-center text-acmeYellow-dark">Profile</h1>
      <p className="text-neutral-600 mb-5 text-center">View or Edit your profile details</p>

      <div className="space-y-6">
        {/* User Details Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">User Details</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={userDetails.firstName}
                onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                disabled={!isEditingUserDetails}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={userDetails.lastName}
                onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                disabled={!isEditingUserDetails}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={userDetails.email}
                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                disabled={!isEditingUserDetails}
              />
            </div>
            {errorMessages.userDetails && (
              <p className="text-red-500 text-sm">{errorMessages.userDetails}</p>
            )}
            {isEditingUserDetails ? (
              <button
                onClick={handleSaveUserDetails}
                className="bg-acmeYellow text-white p-2 px-6 rounded"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditingUserDetails(true)}
                className="bg-acmeBlue-lighter text-white p-2 px-6 rounded"
              >
                Edit
              </button>
            )}
          </div>
        </section>

        {/* Billing Address Section */}
        <h2 className="text-xl font-semibold mt-6 mb-4">Billing Address</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="street" className="block text-sm font-medium text-gray-700">
              Street
            </label>
            <input
              type="text"
              id="street"
              value={billingAddress.street}
              onChange={(e) => setBillingAddress({ ...billingAddress, street: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              disabled={!isEditingBillingAddress}
            />
          </div>
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              value={billingAddress.postalCode}
              onChange={(e) => setBillingAddress({ ...billingAddress, postalCode: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              disabled={!isEditingBillingAddress}
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                value={billingAddress.city}
                onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                disabled={!isEditingBillingAddress}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="province" className="block text-sm font-medium text-gray-700">
                Province
              </label>
              <input
                type="text"
                id="province"
                value={billingAddress.province}
                onChange={(e) => setBillingAddress({ ...billingAddress, province: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                disabled={!isEditingBillingAddress}
              />
            </div>
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              id="country"
              value={billingAddress.country}
              onChange={(e) => setBillingAddress({ ...billingAddress, country: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              disabled={!isEditingBillingAddress}
            />
          </div>
          {errorMessages.billingAddress && (
            <p className="text-red-500 text-sm">{errorMessages.billingAddress}</p>
          )}
          {isEditingBillingAddress ? (
            <button
            onClick={handleSaveBillingAddress}
            className="bg-acmeYellow text-white p-2 px-6 rounded"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditingBillingAddress(true)}
              className="bg-acmeBlue-lighter text-white p-2 px-6 rounded"
            >
              Edit
            </button>
          )}
        </div>

        {/* Payment Info Section */}
        <h2 className="text-xl font-semibold mt-6 mb-4">Payment Information</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="cardHolderName" className="block text-sm font-medium text-gray-700">
              Cardholder Name
            </label>
            <input
              type="text"
              id="cardHolderName"
              value={paymentInfo.cardHolderName}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, cardHolderName: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              disabled={!isEditingPaymentInfo}
            />
          </div>
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              disabled={!isEditingPaymentInfo}
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                Expiry Date (MMYY)
              </label>
              <input
                type="text"
                id="expiryDate"
                value={paymentInfo.expiryDate}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                disabled={!isEditingPaymentInfo}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                value={paymentInfo.cvv}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                disabled={!isEditingPaymentInfo}
              />
            </div>
          </div>
          {errorMessages.paymentInfo && (
            <p className="text-red-500 text-sm">{errorMessages.paymentInfo}</p>
          )}
          {isEditingPaymentInfo ? (
            <button
              onClick={handleSavePaymentInfo}
              className="bg-acmeYellow text-white p-2 px-6 rounded"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditingPaymentInfo(true)}
              className="bg-acmeBlue-lighter text-white p-2 px-6 rounded"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Log Out Button */}
      <button
        className="mt-6 w-full bg-red-500 text-white px-4 py-2 rounded-lg"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  </ContainerMain>
  )
}


export default ProfilePage;