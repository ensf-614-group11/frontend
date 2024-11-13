import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ContainerMain from "./ContainerMain";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // For date picker styling

function ShowtimesPage() {
  const { state } = useLocation();
  const { selectedMovie, selectedTheatre } = state || {};

  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [selectedMovieState, setSelectedMovieState] = useState(selectedMovie || "");
  const [selectedTheatreState, setSelectedTheatreState] = useState(selectedTheatre || "");
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
    { value: "theatre1", label: "Theatre 1" },
    { value: "theatre2", label: "Theatre 2" },
    { value: "theatre3", label: "Theatre 3" },
  ];

  const mockShowtimes = [
    { movie: "movie1", theatre: "theatre1", date: "2024-11-13", time: "2:00 PM" },
    { movie: "movie1", theatre: "theatre1", date: "2024-11-13", time: "5:00 PM" },
    { movie: "movie2", theatre: "theatre1", date: "2024-11-13", time: "3:00 PM" },
    // Add more mock showtimes as needed
  ];

    // Fetch data (replace with actual API calls)
    useEffect(() => {
      setMovies(mockMovies);
      setTheatres(mockTheatres);
    }, []);

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
      const filteredShowtimes = mockShowtimes.filter(
        (showtime) =>
          showtime.date === selectedDate.toISOString().split('T')[0] &&
          showtime.theatre === selectedTheatreState &&
          showtime.movie === selectedMovieState
      );
      setShowtimes(filteredShowtimes);

    }, [selectedDate, selectedMovieState, selectedTheatreState]);

  return(
    <ContainerMain>
      <div className="space-y-6">
        <div>
          <label htmlFor="date-selector" className="block text-neutral-700">Select Date</label>
          <DatePicker
            id="date-selector"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
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
            onChange={(selectedOption) => setSelectedMovieState(selectedOption ? selectedOption.value : "")}
            className="w-full mt-1"
          />
        </div>

        <div>
          <label htmlFor="theatre-selector" className="block text-neutral-700">Change Theatre Selection</label>
          <Select
            id="theatre-selector"
            options={theatres}
            value={theatres.find((theatre) => theatre.value === selectedTheatreState)}
            onChange={(selectedOption) => setSelectedTheatreState(selectedOption ? selectedOption.value : "")}
            className="w-full mt-1"
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold">Here are the showtimes available for {selectedDate.toLocaleDateString()} at {selectedTheatreState ? theatres.find(theatre => theatre.value === selectedTheatreState)?.label : "Select a Theatre"}:</h3>
          <ul className="space-y-2 mt-4">
            {showtimes.length > 0 ? (
              showtimes.map((showtime, index) => (
                <li key={index} className="flex justify-between border-t pt-2 text-neutral-700">
                  <span>{showtime.movie} - {showtime.time}</span>
                </li>
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