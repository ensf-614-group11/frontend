import { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from "react-select";

function Homepage() {

  const [theatre, setTheatre] = useState("");

  //replace with API call to retrieve theatres in database
  const theatres = [
    { value: "", label: "Any Theatre"},
    { value: "Chinook Movie Theatre", label: "Chinook Movie Theatre"},
    { value: "Westhills Movie Theatre", label: "Westhills Movie Theatre"},
    { value: "Market Mall Movie Theatre", label: "Market Mall Movie Theatre"},
  ]

  const handleTheatreSelect = (selectedOption) => {
    setTheatre(selectedOption)
  }

  return(
    <main className="flex justify-center items-center bg-neutral-100 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-10 mb-10">
      <div className="bg-neutral-200 rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-lg lg:max-w-2xl xl:max-w-3xl space-y-6 border border-neutral-300">
        <img 
          src="./acmeplex-logo-popcorn-above.png" 
          alt="AcmePlex Logo"
          className="h-auto w-32 sm:w-36 md:w-40 mx-auto"
        />

        <div>
          <label htmlFor="search-movies" className="block text-neutral-700">Search Movies</label>
          <input 
            type="text"
            id="search-movies"
            placeholder="Enter movie name"
            className="w-full border border-neutral-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-acmeBlue-lighter"
          />
        </div>

        <div>
          <label htmlFor="select-theatre" className="block text-neutral-700">Select Theatre</label>
          <Select 
            id="select-theatre"
            className='w-full pb-2 mt-1 focus:outline-none focus:ring-2 focus:ring-acmeBlue-lighter'
            placeholder="Select theatre"
            options={theatres}
            onChange={handleTheatreSelect}
          />
        </div>

        <Link to="/showtimes">
          <button className='w-full bg-acmeYellow text-neutral-100 rounded-lg p-2 mt-4 hover:bg-acmeBlue-lighter focus:outline-none focus:ring-2 focus:ring-neutral-300'>
            View Showtimes
          </button>
        </Link>

        <div className='border-t border-dotted border-neutral-300 my-4'></div>

        <Link to="/login">
          <button className='w-full bg-acmeBlue text-neutral-100 rounded-lg p-2 mt-4 hover:bg-acmeBlue-lighter focus:outline-none focus:ring-2 focus:ring-neutral-300'>
            Register for Premium
          </button>
        </Link>

        <Link to="/CancelTickets">
          <button className='w-full bg-acmeBlue text-neutral-100 rounded-lg p-2 mt-4 hover:bg-acmeBlue-lighter focus:outline-none focus:ring-2 focus:ring-neutral-300'>
            Cancel Tickets
          </button>
        </Link>
      </div>
    </main>
  );
}

export default Homepage;