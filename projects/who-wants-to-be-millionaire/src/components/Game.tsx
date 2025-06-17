import { useEffect, useState } from "react";

export function Game() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  useEffect(() => {
    fetch("http://localhost:5173/src/assets/data.json")
      .then((res) => res.json())
      .then((questions: IQuestion[]) => {
        const test = questions
          .sort(() => Math.random() - 0.5)
          .map((question) => ({ ...question, options: question.options.sort(() => Math.random() - 0.5) }))
          .slice(0, 10);
        setQuestions(test);
      });
  }, []);

  return (
    <>
      <h1>Game</h1>
      {questions &&
        questions.map((question) => (
          <div
            key={question.id}
            style={{ backgroundColor: "#555", width: "90vw", height: "500px", display: "grid", alignItems: "end", marginBottom: "30px", borderRadius: "25px" }}>
            <div style={{ backgroundColor: "#444", width: "100%", height: "150px" }}>
              <span style={{ fontSize: "x-large", padding: "10px" }}>{question.question}</span>
            </div>
            <div style={{ width: "100%", height: "150px", display: "grid", gridTemplateColumns: "auto auto", gap: "20px" }}>
              {question.options.map((opt) => (
                <div key={opt.id} style={{ backgroundColor: "#888", height: "100%", width: "100%", borderRadius: "15px", display: "flex", alignItems: "center" }}>
                  <span style={{ padding: "10px" }}>{opt.option}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
    </>
  );
}
