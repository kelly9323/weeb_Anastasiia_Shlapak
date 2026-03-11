import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { ApiError } from "../../api/authApi";
import styles from "./Auth.module.scss";
import { useAuth } from "../../context/AuthContext";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    try {
      await register({
        email,
        first_name: firstName,
        last_name: lastName,
        password,
        password_confirm: confirmPassword,
      });
      setSuccessMessage(
        "Compte créé avec succès. Votre compte est en attente d'activation par un administrateur."
      );
    } catch (err) {
      if (err instanceof ApiError) {
        // django keys for validation - { email: ["already exists"] }
        const data = err.data;
        const firstFieldError = Object.values(data)
          .flat()
          .find((v) => typeof v === "string") as string | undefined;
        setError(
          firstFieldError ||
            (data.detail as string) ||
            "Une erreur est survenue. Veuillez réessayer."
        );
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (successMessage) {
    return (
      <section className={styles.container}>
        <h1 className={styles.h1}>Inscription réussie</h1>
        <p className={styles.successMessage}>{successMessage}</p>
        <div className={styles.loginLink} style={{ marginTop: "2rem" }}>
          <Link to="/login">Se connecter</Link>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.h1}>S'inscrire</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="firstName">Prénom</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Votre prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
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
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <div className={styles.submit}>
          <Button variant="primary" size="md" disabled={loading}>
            {loading ? "Inscription..." : "S'inscrire"}
          </Button>
        </div>

        <div className={styles.loginLink}>
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </div>
      </form>
    </section>
  );
}
