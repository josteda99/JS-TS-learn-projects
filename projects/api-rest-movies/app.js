const express = require("express");
const crypto = require("node:crypto");
const movies = require("./movies.json");
const z = require("zod");
const cors = require("cors");
const { validateMovie, validatePartialMovie } = require("./schemas/movies");

const app = express();

app.disable("x-powered-by");
app.use(express.json());
app.use(cors());

app.get("/movies", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter((movie) => movie.genre.some((g) => g.toLocaleLowerCase() === genre.toLocaleLowerCase()));
    return res.json(filteredMovies);
  }
  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);
  res.status(404).json({ message: "movieNotFound" });
});

app.post("/movies", (req, res) => {
  const result = validateMovie(req.body);
  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const newMovie = { id: crypto.randomUUID, ...result.data };

  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.patch("/movies/:id", (req, res) => {
  const { id } = req.params;
  const result = validatePartialMovie(req.body);

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) return res.status(404).json({ message: "movie not found" });

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data,
  };

  movies[movieIndex] = updateMovie;

  return res.json(updateMovie);
});

app.options("/movies", (res) => {
  res.header("Access-Control-Allow-Origin", "*");
});

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log("server listenentd: ", PORT);
});
