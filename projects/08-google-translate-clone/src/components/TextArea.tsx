import { Form } from "react-bootstrap";

interface Props {
  type: string;
  loading?: boolean;
  value: string;
  onChange: (value: string) => void;
}

const commonStyles = { border: 0, height: "150px", resize: "none" };
const getPlaceholder = ({ type, loading }: { type: string; loading?: boolean }) => {
  if (type === "From") return "Introducir texto";
  if (loading === true) return "Cargando...";
  return "Traduccion";
};

export const TextArea = ({ type, loading, value, onChange }: Props) => {
  const styles = type === "From" ? commonStyles : { ...commonStyles, background: "#f5f5f5" };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return <Form.Control as="textarea" disabled={type === "To"} placeholder={getPlaceholder({ type, loading })} style={styles} value={value} onChange={handleChange} />;
};
