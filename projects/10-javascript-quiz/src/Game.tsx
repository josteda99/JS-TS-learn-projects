import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import { useQuestionsStore } from "./store/questions";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { type Question as QuestionType } from "./types";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Footer } from "./Footer";

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);
  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex);
  };
  const getBackgroundColor = (index: number) => {
    const { userSelectedAnswer, correctAnswer } = info;
    if (userSelectedAnswer == null) return "transparent";
    if (index !== correctAnswer && index !== userSelectedAnswer) return "transparent";
    if (index === correctAnswer) return "green";
    if (index === userSelectedAnswer) return "red";
    return "transparent";
  };

  return (
    <Card variant="outlined" sx={{ bgColor: "#222", p: 2, textAlign: "left", marginTop: 4 }}>
      <Typography variant="h5">{info.question}</Typography>
      <SyntaxHighlighter language="javaascript" style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>
      <List sx={{ bgcolor: "#333" }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton disabled={info.userSelectedAnswer != null} sx={{ backgroundColor: getBackgroundColor(index) }} onClick={createHandleClick(index)}>
              <ListItemText primary={answer} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export const Game = () => {
  const questions = useQuestionsStore((store) => store.questions);
  const currentQuestion = useQuestionsStore((store) => store.currentQuestion);
  const goNextQuestion = useQuestionsStore((store) => store.goNextQuestion);
  const goPreviousQuestion = useQuestionsStore((store) => store.goPreviousQuestion);

  const questionInfo = questions[currentQuestion];
  return (
    <>
      <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  );
};
