import { useEffect, useState } from "react";
import { fetchData } from "../hooks/fetchData";
import { useMovieStore } from "../store/useMovieStore";
import type { MovieI } from "../interfaces/movie";
import { Modal } from "@mui/material";
import { MovieCard } from "./MovieCard";

export function Movies({ programType = "movie" }) {
  const addMovies = useMovieStore((state) => state.addMovies);
  const changeSelectedMovie = useMovieStore((state) => state.changeSelectedMovide);
  const movies = useMovieStore((state) => state.movies);
  const selectedMovie = useMovieStore((state) => state.selectedMovie);
  const changeLoading = useMovieStore((state) => state.changeLoading);
  const loading = useMovieStore((state) => state.loading);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = (movie: MovieI) => {
    changeSelectedMovie(movie);
    handleOpen();
  };

  useEffect(() => {
    changeLoading(true);
    fetchData(programType).then((movies) => {
      addMovies(movies);
    });
  }, []);

  return (
    <>
      {loading && <h1>loading...</h1>}
      {!loading && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
            {movies.length > 0 && movies.slice(0, 20).map((movie) => <MovieCard key={movie.title} movie={movie} handleClick={handleClick}></MovieCard>)}
          </div>

          {selectedMovie && (
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <div style={{ display: "grid", margin: 100, backgroundColor: "#333", padding: 50 }}>
                <h3>{selectedMovie.title}</h3>
                <span>{selectedMovie.description}</span>
                <span>{selectedMovie.releaseYear}</span>
                <img style={{ width: 300 }} src={selectedMovie.images["Poster Art"].url} alt="..." />
              </div>
            </Modal>
          )}
        </>
      )}
    </>
  );
}
