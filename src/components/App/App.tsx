import { useState } from "react";
import "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import fetchMovies from "../../services/movieService";
import type { Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const notify = () => toast("No movies found for your request");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [isSelectMovie, setSelectMovie] = useState<Movie | null>(null);
  const closeModale = () => setSelectMovie(null);

  const handleOrder = async (search: string) => {
    try {
      setLoader(true);
      setMovies([]);
      setErrorMessage(false);

      const { results } = await fetchMovies(search);
      if (results.length > 0) {
        setMovies(results);
      } else {
        setMovies([]);
        notify();
      }

      console.log("Order received from:", results);
    } catch (error) {
      setErrorMessage(true);
      console.log(error);
    } finally {
      setLoader(false);
      console.log("fin");
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleOrder} />
      <MovieGrid movies={movies} onSelect={setSelectMovie} />
      {loader && <Loader />}
      {errorMessage && <ErrorMessage />}
      <Toaster />
      {isSelectMovie && (
        <MovieModal onClose={closeModale} movie={isSelectMovie} />
      )}
    </>
  );
}

export default App;
