import { Button } from "@mui/material";
import { useQuestionsStore } from "./store/questions";

const LIMIT_QUESTION = 10;

export const Start = () => {
  const fetchQuestions = useQuestionsStore((store) => store.fetchQuestions);
  const handleClick = () => {
    fetchQuestions(LIMIT_QUESTION);
  };
  return (
    <Button onClick={handleClick} variant="contained">
      Empezar
    </Button>
  );
};
