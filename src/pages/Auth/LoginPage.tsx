import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { ApiError } from "../../api/authApi";
import styles from "./Auth.module.scss";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      if (err instanceof ApiError) {
        const detail = err.data.detail as string | undefined;
        setError(detail || "Identifiants incorrects.");
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.h1}>Se connecter</h1>
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

        <div className={styles.inputGroup}>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className={styles.forgotPassword}>
          <Link to="/password-reset">Mot de passe oublié ?</Link>
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <div className={styles.submit}>
          <Button variant="primary" size="md" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </div>

        <div className={styles.signupLink}>
          Vous n'avez pas de compte ? <Link to="/signup">Créer un compte</Link>
        </div>
      </form>
    </section>
  );
}
