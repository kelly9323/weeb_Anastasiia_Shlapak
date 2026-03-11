import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import { confirmPasswordReset, ApiError } from "../../api/authApi";
import styles from "./Auth.module.scss";

export default function PasswordResetConfirmPage() {
  const { uid, token } = useParams<{ uid: string; token: string }>();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!uid || !token) {
      setError("Lien de réinitialisation invalide.");
      return;
    }

    setLoading(true);
    try {
      await confirmPasswordReset(uid, token, newPassword, confirmPassword);
      setSuccess(true);
    } catch (err) {
      if (err instanceof ApiError) {
        const detail =
          (err.data.detail as string) ||
          (err.data.token as string[])?.join(" ") ||
          "Lien invalide ou expiré.";
        setError(detail);
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
        <h1 className={styles.h1}>Mot de passe réinitialisé</h1>
        <p className={styles.successMessage}>
          Votre mot de passe a été modifié avec succès.
        </p>
        <div className={styles.loginLink} style={{ marginTop: "2rem" }}>
          <Link to="/login">Se connecter</Link>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.h1}>Nouveau mot de passe</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="newPassword">Nouveau mot de passe</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="••••••••"
            minLength={8}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
            {loading ? "Enregistrement..." : "Réinitialiser le mot de passe"}
          </Button>
        </div>
      </form>
    </section>
  );
}
