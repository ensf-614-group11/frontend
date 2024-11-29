import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from "react-select";
import ContainerMain from './ContainerMain';
import AppAPI from './AppAPI';

function Homepage() {

  const [movie, setMovie] = useState("");
  const [movieOptions, setMovieOptions] = useState([]);
  const [theatre, setTheatre] = useState("");
  const [theatreOptions, setTheatreOptions] = useState([]);

  // Fetch movies from API
  useEffect(() => {
    AppAPI.get("movies")
      .then((response) => {
        const apiOptions = response.map((movie) => ({
          value: movie.id,
          label: movie.title,
        }));

        console.log(apiOptions);

        const options = [{ value: "", label: "Any Movie"}, ...apiOptions];
        setMovieOptions(options);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      })
  }, [])

  // Fetch theatres from API
  useEffect(() => {
    AppAPI.get("theatres")
      .then((response) => {
      const apiOptions = response.map((theatre) => ({
        value: theatre.id,
        label: theatre.name,
      }));
      
      const options = [{ value: "", label: "Any Theatre"}, ...apiOptions]
      setTheatreOptions(options);
      
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      })
  }, [])

  const handleMovieSelect = (selectedOption) => {
    setMovie(selectedOption)
  }

  const handleTheatreSelect = (selectedOption) => {
    setTheatre(selectedOption)
  }

  const isLoggedIn = Boolean(localStorage.getItem("authToken"));

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
          options={movieOptions}
          onChange={handleMovieSelect}
          value={movieOptions.find((item) => item.value === movie)}
          className="w-full pb-2 mt-1 focus:outline-none focus:ring-2 focus:ring-acmeBlue-lighter"
          isSearchable
        />
      </div>

      <div>
        <label htmlFor="select-theatre" className="block text-neutral-700">Select Theatre</label>
        <Select 
          id="select-theatre"
          className='w-full pb-2 mt-1 focus:outline-none focus:ring-2 focus:ring-acmeBlue-lighter'
          placeholder="Select theatre"
          options={theatreOptions}
          onChange={handleTheatreSelect}
          value={theatreOptions.find((item) => item.value === theatre)}
        />
      </div>

      <Link to="/showtimes" state={{ selectedMovie: movie, selectedTheatre: theatre }}>
        <button className='w-full bg-acmeYellow text-neutral-100 rounded-lg p-2 mt-4 hover:bg-acmeBlue-lighter focus:outline-none focus:ring-2 focus:ring-neutral-300'>
          View Showtimes
        </button>
      </Link>

      <div className='border-t border-dotted border-neutral-300 my-4'></div>

      {!isLoggedIn && (
      <Link to="/login" state={{ isLogin: false }}>
      <button className='w-full bg-acmeBlue text-neutral-100 rounded-lg p-2 mt-4 hover:bg-acmeBlue-lighter focus:outline-none focus:ring-2 focus:ring-neutral-300'>
        Register for Premium
      </button>
    </Link>
      )}

      <Link to="/CancelTickets">
        <button className='w-full bg-acmeBlue text-neutral-100 rounded-lg p-2 mt-4 hover:bg-acmeBlue-lighter focus:outline-none focus:ring-2 focus:ring-neutral-300'>
          Cancel Tickets
        </button>
      </Link>
    </ContainerMain>
  );
}

export default Homepage;