import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { requestPasswordReset, ApiError } from "../../api/authApi";
import styles from "./Auth.module.scss";

export default function PasswordResetPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await requestPasswordReset(email);
      setSuccess(true);
    } catch (err) {
      if (err instanceof ApiError) {
        const detail = err.data.detail as string | undefined;
        setError(detail || "Une erreur est survenue. Veuillez réessayer.");
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className={styles.container}>
        <h1 className={styles.h1}>Réinitialisation du mot de passe</h1>
        <p className={styles.successMessage}>
          Si un compte actif existe avec cet email, un lien de réinitialisation
          a été envoyé.
        </p>
        <div className={styles.loginLink} style={{ marginTop: "2rem" }}>
          <Link to="/login">Retour à la connexion</Link>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.h1}>Mot de passe oublié ?</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
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

        {error && <p className={styles.errorMessage}>{error}</p>}

        <div className={styles.submit}>
          <Button variant="primary" size="md" disabled={loading}>
            {loading ? "Envoi en cours..." : "Envoyer le lien"}
          </Button>
        </div>

        <div className={styles.loginLink}>
          <Link to="/login">Retour à la connexion</Link>
        </div>
      </form>
    </section>
  );
}
