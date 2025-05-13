export const searchMovies = async ({ search }) => {
  if (search === "") return null;

  try {
    const res = await fetch(`https://www.omdbapi.com/?s=${search}&apikey=2f744d66`);
    const json = await res.json();
    const movies = json.Search;

    return movies.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      type: movie.Type,
      poster: movie.Poster,
    }));
  } catch (error) {
    throw new Error("Error fetching movies", error);
  }
};
