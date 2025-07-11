import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Button from "../Button/Button";
import burgerIcon from "../../assets/Burger-menu.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.header__container}>
          <Link
            to="/"
            className={`${styles.header__logo} ${styles.logoMobile}`}
          >
            weeb
          </Link>
          <button className={styles.burger} onClick={toggleMenu}>
            <img src={burgerIcon} alt="Menu" />
          </button>

          <ul
            className={`${styles.header__group} ${isOpen ? styles.open : ""}`}
          >
            <Link
              to="/"
              className={`${styles.header__logo} ${styles.logoDesktop}`}
            >
              weeb
            </Link>
            <li>
              <Link className="hover" to="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link
                className="hover"
                to="/contact"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>

          <ul
            className={`${styles.header__group} ${isOpen ? styles.open : ""}`}
          >
            <li>
              <Button variant="primary-no-bg" size="sm">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  Log in
                </Link>
              </Button>
            </li>
            <li>
              <Button variant="primary" size="sm">
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  Join us
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
