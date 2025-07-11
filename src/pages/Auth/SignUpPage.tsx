import Button from "../../components/Button/Button";
import styles from "./Auth.module.scss";

export default function SignUpPage() {

  return (
    <section className={styles.container}>
      <h1 className={styles.h1}>S'inscrire</h1>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="firstName">Prénom</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Votre prénom"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="lastName">Nom</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Votre nom"
            required
          />
        </div>

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
            minLength={8}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="••••••••"
            minLength={8}
            required
          />
        </div>

        <div className={styles.submit}>
          <Button variant="primary" size="md">
            S'inscrire
          </Button>
        </div>

        <div className={styles.loginLink}>
          Déjà un compte? <a href="/login">Se connecter</a>
        </div>
      </form>
    </section>
  );
}
