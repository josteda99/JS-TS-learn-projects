import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useStore } from "./hooks/useStore";
import { Container, Row, Col, Stack } from "react-bootstrap";
import { AUTO_LANGUAGE } from "./constants";
import { LanguageSelector } from "./components/LanguageSelector";
import { TextArea } from "./components/TextArea";
import { useEffect } from "react";
import { translate } from "./services/translate";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const { fromLanguage, setFromLanguage, toLanguage, interchangeLanguages, fromText, result, setFromText, setToLanguage, loading, setResult } = useStore();

  const debouncedFromText = useDebounce(fromText);

  useEffect(() => {
    if (debouncedFromText === "") return;
    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then((result) => {
        if (result == null) return;
        setResult(result);
      })
      .catch(() => {
        setResult("Error");
      });
  }, [debouncedFromText, fromLanguage]);

  return (
    <Container fluid>
      <h1>Google Translate</h1>
      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector type="from" value={fromLanguage} onChange={setFromLanguage} />
            <TextArea type={"From"} value={fromText} onChange={setFromText} loading={loading} />
          </Stack>
        </Col>
        <Col xs="auto">
          <button disabled={fromLanguage === AUTO_LANGUAGE} onClick={() => interchangeLanguages()}>
            Interchange
          </button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LanguageSelector type="to" value={toLanguage} onChange={setToLanguage} />
            <TextArea type={"to"} value={result} onChange={setToLanguage} loading={loading} />
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
