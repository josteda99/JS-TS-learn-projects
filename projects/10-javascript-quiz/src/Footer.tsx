import { Button } from "@mui/material";
import { useQuestionsStore } from "./store/questions";

export function Footer() {
  const questions = useQuestionsStore((state) => state.questions);
  const reset = useQuestionsStore((state) => state.reset);
  let correct = 0;
  let incorrect = 0;
  let unaswered = 0;

  questions.forEach((q) => {
    const { userSelectedAnswer, correctAnswer } = q;
    if (userSelectedAnswer == null) unaswered++;
    else if (userSelectedAnswer === correctAnswer) correct++;
    else incorrect++;
  });
  return (
    <footer style={{ marginTop: "16px" }}>
      <strong>{`✅ ${correct} - ❌ ${incorrect} - ❓ ${unaswered}`}</strong>
      <Button onClick={() => reset()}> Resetear</Button>
    </footer>
  );
}
