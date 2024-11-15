import { Routes, Route } from "react-router-dom"
import Home from "./pages/home";
import Login from "./pages/Login";
import CancelTickets from "./pages/CancelTickets";
import Showtimes from "./pages/Showtimes";
import AvailableSeats from "./pages/AvailableSeats"
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Showtimes" element={<Showtimes />} />
      <Route path="/AvailableSeats" element={<AvailableSeats />} />
      <Route path="/Payment" element={<Payment />} />
      <Route path="/Confirmation" element={<Confirmation />} />
      <Route path="/CancelTickets" element={<CancelTickets />} />
    </Routes>
  )
}

export default App
