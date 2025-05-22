// export async function getLatestGames() {
//   const LATEST_GAMES =
//     "https://internal-prod.apigee.fandom.net/v1/xapi/finder/metacritic/web?sortBy=-metaScore&productType=games&page=1&releaseYearMin=1958&releaseYearMax=2024&offset=0&limit=24&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u";

import { gamesList } from "../mocks/games";

//   const rawData = await fetch(LATEST_GAMES);
//   const json = await rawData.json();

//   const {
//     data: { items },
//   } = json;

//   return items.map((item) => {
//     const { description, slug, releaseDate, image, criticScoreSummary, title } = item;
//     const { score } = criticScoreSummary;

//     // crea la imagen
//     const { bucketType, bucketPath } = image;
//     const img = `https://www.metacritic.com/a/img/${bucketType}${bucketPath}`;

//     return {
//       description,
//       releaseDate,
//       score,
//       slug,
//       title,
//       image: img,
//     };
//   });
// }

export function getGameDetails(slug) {
  // Find the game in the mock list
  const game = gamesList.find((g) => g.slug === slug);

  if (!game) {
    throw new Error("Game not found");
  }

  // Mock reviews data
  const reviews = [
    {
      quote: "A fantastic experience!",
      score: 90,
      date: "2024-05-01",
      publicationName: "Game Reviewer",
      author: "Jane Doe",
    },
    {
      quote: "Solid gameplay and story.",
      score: 85,
      date: "2024-05-10",
      publicationName: "Another Outlet",
      author: "John Smith",
    },
  ];

  return {
    img: game.image,
    title: game.title,
    slug: game.slug,
    description: game.description,
    score: game.score,
    reviews,
  };
}

export async function getLatestGames() {
  return gamesList;
}
