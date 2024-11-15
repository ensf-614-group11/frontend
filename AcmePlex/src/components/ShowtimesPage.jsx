import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ContainerMain from "./ContainerMain";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // For date picker styling

function ShowtimesPage() {
  const { state } = useLocation();
  const { selectedMovie, selectedTheatre } = state || {};

  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [selectedMovieState, setSelectedMovieState] = useState(selectedMovie?.value || "");
  const [selectedTheatreState, setSelectedTheatreState] = useState(selectedTheatre?.value || "");
  const [movies, setMovies] = useState([]); // replace with API call
  const [theatres, setTheatres] = useState([]); // replace with API call
  const [showtimes, setShowtimes] = useState([]); // replace with API call

  // Example mock data (to be replaced with API calls)
  const mockMovies = [
    { value: "", label: "Any Movie" },
    { value: "movie1", label: "Movie 1" },
    { value: "movie2", label: "Movie 2" },
    { value: "movie3", label: "Movie 3" },
  ];

  const mockTheatres = [
    { value: "", label: "Any Theatre"},
    { value: "theatre1", label: "Theatre 1" },
    { value: "theatre2", label: "Theatre 2" },
    { value: "theatre3", label: "Theatre 3" },
  ];
 
  const mockShowtimes = [
    { movie: "movie1", theatre: "theatre1", date: "2024-11-14", time: "2:00 PM" },
    { movie: "movie1", theatre: "theatre1", date: "2024-11-14", time: "5:00 PM" },
    { movie: "movie2", theatre: "theatre1", date: "2024-11-14", time: "3:00 PM" },
    // Add more mock showtimes as needed
  ];

  // Fetch data (replace with actual API calls)
  useEffect(() => {
    setMovies(mockMovies);
    setTheatres(mockTheatres);
  }, []);

  const formatDateToLocal = (date) => {
    return date.toLocaleDateString('en-CA');
  }

  // Filter showtimes based on selected criteria
  const filteredShowtimes = useMemo(() => {
    const formattedDate = formatDateToLocal(selectedDate);
    return mockShowtimes.filter(
      (showtime) =>
        showtime.date === formattedDate &&
      (!selectedTheatreState || showtime.theatre === selectedTheatreState) &&
      (!selectedMovieState || showtime.movie === selectedMovieState)
    )
  }, [selectedDate, selectedMovieState, selectedTheatreState])

  // When setting initial state based on data passed from Homepage
  useEffect(() => {
    if(selectedMovie) {
      setSelectedMovieState(selectedMovie.value);
    }
    if(selectedTheatre) {
      setSelectedTheatreState(selectedTheatre.value);
    }
  }, [selectedMovie, selectedTheatre]);

  // Update showtimes based on selected movie, theatre, and date
  useEffect(() => {
    setShowtimes(filteredShowtimes);
  }, [filteredShowtimes]);

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
              showtimes.map((showtime, index) => (
                <Link
                  key={index}
                  to={'/AvailableSeats'}
                  state={{showtime}}
                  className="block p-4 bg-white border rounded-lg shadow-lg hover:bg-acmeBlue-lighter"
                >
                  <div className='font-semibold text-lg'>{mockMovies.find(movie => movie.value === showtime.movie)?.label}</div>
                  <div>{showtime.date} - {showtime.time}</div>
                  <div className='italic'>{mockTheatres.find(theatre => theatre.value === showtime.theatre)?.label}</div>
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