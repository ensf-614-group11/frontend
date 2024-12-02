import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ContainerMain from "./ContainerMain";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // For date picker styling
import AppAPI from './AppAPI';

function ShowtimesPage() {
  const { state } = useLocation();
  const { selectedMovie, selectedTheatre } = state || {};

  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [selectedMovieState, setSelectedMovieState] = useState(selectedMovie?.value || "");
  const [selectedTheatreState, setSelectedTheatreState] = useState(selectedTheatre?.value || "");
  const [movies, setMovies] = useState([]); 
  const [theatres, setTheatres] = useState([]); 
  const [showtimes, setShowtimes] = useState([]); 

  const isLoggedIn = Boolean(localStorage.getItem("authToken"));
  console.log(localStorage.getItem("authToken"))

  // Fetch movies from API 
  useEffect(() => {
    AppAPI.get("movies")
      .then((response) => {
        const apiOptions = response.map((movie) => ({
          value: movie.id,
          label: movie.title,
        }));
        const options = [{ value: "", label: "Any Movie "}, ...apiOptions];
        setMovies(options);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      })
  }, []);

  // Fetch theatres from API
  useEffect(() => {
    AppAPI.get("theatres")
      .then((response) => {
        const apiOptions = response.map((theatre) => ({
          value: theatre.id,
          label: theatre.name,
        }));
        const options = [{ value: "", label: "Any Theatre" }, ...apiOptions];
        setTheatres(options);
      })
      .catch((error) => {
        console.error("Error fetching theatres:", error);
      });
  }, []);

  // Fetch showtimes from the backend API
  useEffect(() => {
    console.log(selectedDate)
    console.log(selectedMovieState)
    console.log(selectedTheatreState)
    if(selectedDate) {
      const nextDay = new Date(selectedDate);
      nextDay.setDate(nextDay.getDate() - 1);

      const formattedDate = nextDay.toISOString().split("T")[0];

      const params = {
        date: formattedDate,
      };

      if(selectedMovieState) {params.movieId = selectedMovieState}
      if(selectedTheatreState) {params.theatreId = selectedTheatreState}
      
      console.log(params)

      AppAPI.get("showtimes", params)
        .then((response) => {
          const formattedShowtimes = response
            .filter((showtime) => isLoggedIn || !showtime.earlyRelease)
            .map((showtime) => ({
              id: showtime.id,
              date: new Date(showtime.dateAndTime).toLocaleDateString(),
              time: new Date(showtime.dateAndTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'}),
              movieTitle: showtime.movieTitle,
              theatreName: showtime.theatreName,
              earlyRelease: showtime.earlyRelease,
          }));
          setShowtimes(formattedShowtimes);
        })
        .catch((error) => {
          console.error("Error fetching showtimes:", error);
        });
    }
  }, [selectedDate, selectedMovieState, selectedTheatreState]);

  // When setting initial state based on data passed from Homepage
  useEffect(() => {
    if(selectedMovie) {
      setSelectedMovieState(selectedMovie.value);
    }
    if(selectedTheatre) {
      setSelectedTheatreState(selectedTheatre.value);
    }
  }, [selectedMovie, selectedTheatre]);

  // Helper to find label for selected value
  const getLabel = (options, value) => options.find((option) => option.value === value)?.label || "Select an option";

  const formatDateLong = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  }

  return(
    <ContainerMain>
      <div className="space-y-1">
        <Link
          to="/"
          className="inline-block px-4 py-2 text-white bg-neutral-500 rounded-lg hover:bg-acmeYellow"
        >
          Back
        </Link>
        <div className="text-center border-b pb-4 mb-6">
          <h1 className="text-3xl font-extrabold text-acmeYellow-dark">Showtimes</h1>
          <p className="text-lg text-neutral-600 mt-0">Select a date, movie, or theatre to filter results:</p>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <label htmlFor="date-selector" className="block text-neutral-700">Select Date</label>
          <DatePicker
            id="date-selector"
            selected={selectedDate}
            onChange={setSelectedDate}
            dateFormat="yyyy-MM-dd"
            className="w-full border border-neutral-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-acmeBlue-lighter"
          />
        </div>

        <div>
          <label htmlFor="movie-selector" className="block text-neutral-700">Change Movie Selection</label>
          <Select
            id="movie-selector"
            options={movies}
            value={movies.find((movie) => movie.value === selectedMovieState)}
            onChange={(option) => setSelectedMovieState(option ? option.value : "")}
            className="w-full mt-1"
          />
        </div>

        <div>
          <label htmlFor="theatre-selector" className="block text-neutral-700">Change Theatre Selection</label>
          <Select
            id="theatre-selector"
            options={theatres}
            value={theatres.find((theatre) => theatre.value === selectedTheatreState)}
            onChange={(option) => setSelectedTheatreState(option ? option.value : "")}
            className="w-full mt-1"
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold">
            Here are the showtimes available for {formatDateLong(selectedDate)} at {getLabel(theatres, selectedTheatreState)}:
          </h3>
          <ul className="space-y-2 mt-4">
            {showtimes.length > 0 ? (
              showtimes.map((showtime) => (
                <Link
                  key={showtime.id}
                  to={'/AvailableSeats'}
                  state={{ showtime }}
                  className={`block p-4 border rounded-lg shadow-lg ${
                    showtime.earlyRelease && isLoggedIn
                    ? "bg-acmeYellow-lighter hover:bg-acmeYellow"
                    : "bg-white hover:bg-acmeBlue-lighter"}`}
                >
                  <div className='font-semibold text-lg'>{showtime.movieTitle}</div>
                  <div>{showtime.date} - {showtime.time}</div>
                  <div className='italic'>{showtime.theatreName}</div>
                  {showtime.earlyRelease && isLoggedIn && (
                    <div className='mt-2 text-yellow-800 font-bold'>
                      Early Release
                    </div>
                  )}
                </Link>
              ))
            ) : (
              <p>No showtimes available for the selected filters.</p>
            )}
          </ul>
        </div>
      </div>
    </ContainerMain>
  );
}

export default ShowtimesPage;