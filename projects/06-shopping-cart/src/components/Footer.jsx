import { useCart } from "../hooks/useCart";
import "./Footer.css";
export function Footer() {
  const { cart } = useCart();
  return <footer className="footer">{/* <span> {JSON.stringify(cart, null, 2)}</span> */}</footer>;
}
