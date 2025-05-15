import { Link } from "../Link";

export default function HomePage() {
  return (
    <>
      <h1>home</h1>
      <p>esta es una pagina der ejemplo</p>
      <Link to="/about">Ir a sobre nosotros</Link>
    </>
  );
}
