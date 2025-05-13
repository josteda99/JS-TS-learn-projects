import { useEffect, useState } from "react";
import "./App.css";
import { getRandomFact } from "./services/facts";
import { userCatImage } from "./hooks/useCatImage";

const useCatFact = () => {
  const [fact, setFact] = useState();
  const refrestFact = () => {
    getRandomFact().then((newFact) => setFact(newFact));
  };

  useEffect(refrestFact, []);

  return { fact, refrestFact };
};

export function App() {
  const { fact, refrestFact } = useCatFact();
  const { imageUrl } = userCatImage({ fact });

  const handleClick = () => {
    refrestFact();
  };

  return (
    <main>
      <h1>app de gatitaos</h1>
      <button onClick={handleClick}>Get new fact</button>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={imageUrl} alt="iamge extractes using the first word" />}
    </main>
  );
}
