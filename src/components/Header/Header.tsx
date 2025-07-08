import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <p>Header</p>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/login">Log in</Link>
            </li>
            <li>
              <Link to="/signup">Join us</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
