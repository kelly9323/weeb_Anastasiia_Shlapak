import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import Button from "../Button/Button";
import burgerIcon from "../../assets/Burger-menu.png";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // no await here to navigate immediately and handle logout in background
  const handleLogout = () => {
    logout().catch(console.error);
    navigate("/");
    setIsOpen(false);
  };

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
                Accueil
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
            {isAuthenticated ? (
              <>
                <li>
                  <span>
                    {user?.first_name} {user?.last_name}
                  </span>
                </li>
                <li>
                  <Button variant="primary-no-bg" size="sm" onClick={handleLogout}>
                    Déconnexion
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Button variant="primary-no-bg" size="sm">
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      Se connecter
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button variant="primary" size="sm">
                    <Link to="/signup" onClick={() => setIsOpen(false)}>
                      Nous rejoindre
                    </Link>
                  </Button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
