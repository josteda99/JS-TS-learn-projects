import type { MovieI } from "../interfaces/movie";

interface PropsI {
  movie: MovieI;
  handleClick: (movie: MovieI) => void;
}

export function MovieCard({ movie, handleClick }: PropsI) {
  return (
    <div style={{ margin: 10 }} className="movie" onClick={() => handleClick(movie)}>
      <img style={{ width: "200px", aspectRatio: "auto" }} src={movie.images["Poster Art"].url} alt="movie"></img>
      <h4>{movie.title}</h4>
    </div>
  );
}
