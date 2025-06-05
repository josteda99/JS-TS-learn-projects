import { useEffect, useState } from "react";

export function Game() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  useEffect(() => {
    fetch("http://localhost:5173/src/assets/data.json")
      .then((res) => res.json())
      .then((questions: IQuestion[]) => {
        questions.map((question) => question.options.sort(() => Math.random() - 0.5));
        setQuestions(questions);
      });
  }, []);

  return (
    <>
      <h1>Game</h1>
      {questions &&
        questions.map((question) => (
          <div key={question.id} style={{ backgroundColor: "#555", width: "90vw", height: "500px", display: "grid", alignItems: "end", marginBottom: "30px" }}>
            <div style={{ backgroundColor: "#444", width: "100%", height: "150px" }}>{question.question}</div>
            <div style={{ backgroundColor: "#333", width: "100%", height: "150px", display: "grid", gridTemplateColumns: "auto auto", gap: "20px" }}>
              {question.options.map((opt) => (
                <div key={opt.id} style={{ backgroundColor: "#888", height: "100%", width: "100%" }}>
                  {opt.option}
                </div>
              ))}
            </div>
          </div>
        ))}
    </>
  );
}
