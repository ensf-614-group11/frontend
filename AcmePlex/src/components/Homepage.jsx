import { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from "react-select";
import ContainerMain from './ContainerMain';

function Homepage() {

  const [movie, setMovie] = useState("");
  const [theatre, setTheatre] = useState("");

  //replace with APR call to retrieve movies in database
  const movies = [
    { value: "", label: "Any Movie" },
    { value: "movie1", label: "Movie 1" },
    { value: "movie2", label: "Movie 2" },
    { value: "movie3", label: "Movie 3" },
  ];

  //replace with API call to retrieve theatres in database
  const theatres = [
    { value: "", label: "Any Theatre"},
    { value: "theatre1", label: "Theatre 1" },
    { value: "theatre2", label: "Theatre 2" },
    { value: "theatre3", label: "Theatre 3" },
  ]

  const handleMovieSelect = (selectedOption) => {
    setMovie(selectedOption)
  }

  const handleTheatreSelect = (selectedOption) => {
    setTheatre(selectedOption)
  }

  return(
    <ContainerMain>
      <img 
        src="./acmeplex-logo-popcorn-above.png" 
        alt="AcmePlex Logo"
        className="h-auto w-32 sm:w-36 md:w-40 mx-auto"
      />

      <div>
        <label htmlFor="search-movies" className="block text-neutral-700">Search Movies</label>
        <Select
          id="search-movies"
          options={movies}
          onChange={handleMovieSelect}
          value={movies.find((item) => item.value === movie)}
          className="w-full pb-2 mt-1 focus:outline-none focus:ring-2 focus:ring-acmeBlue-lighter"
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
          value={theatres.find((item) => item.value === theatre)}
        />
      </div>

      <Link to="/showtimes" state={{ selectedMovie: movie, selectedTheatre: theatre }}>
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
    </ContainerMain>
  );
}

export default Homepage;