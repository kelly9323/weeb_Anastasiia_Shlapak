import Button from "../../components/Button/Button";
import styles from "./Auth.module.scss";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <section className={styles.container}>
      <h1 className={styles.h1}>Se connecter</h1>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="votre@email.com"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            required
          />
        </div>

        <div className={styles.forgotPassword}>
          <Link to="/">Mot de passe oublié ?</Link>
        </div>

        <div className={styles.submit}>
          <Button variant="primary" size="md">
            Se connecter
          </Button>
        </div>

        <div className={styles.signupLink}>
          Vous n'avez pas de compte ? <Link to="/signup">Créer un compte</Link>
        </div>
      </form>
    </section>
  );
}
