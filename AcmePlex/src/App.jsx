import { Routes, Route } from "react-router-dom"
import Home from "./pages/home";
import Login from "./pages/Login";
import CancelTickets from "./pages/CancelTickets";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/CancelTickets" element={<CancelTickets />} />
    </Routes>
  )
}

export default App
