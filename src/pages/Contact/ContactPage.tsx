import { useState } from "react";
import Button from "../../components/Button/Button";
import styles from "./ContactPage.module.scss";
import { submitContactForm } from "../../api/articlesApi";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const contactData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone || null, 
        email: formData.email,
        message: formData.message,
      };

      await submitContactForm(contactData);
      setSuccess(true);
      // Reset form
      setFormData({
        lastName: "",
        firstName: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors de l'envoi du formulaire"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <section>
        <div>
          <h1 className={styles.h1}>Votre avis compte !</h1>
          <p className={styles.content}>
            Votre retour est essentiel pour nous améliorer ! Partagez votre
            expérience, dites-nous ce que vous aimez et ce que nous pourrions
            améliorer. Vos suggestions nous aident à faire de ce blog une
            ressource toujours plus utile et enrichissante.
          </p>

          {error && (
            <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
          )}

          {success && (
            <div style={{ color: "green", marginBottom: "1rem", textAlign: "center" }}>
              Message envoyé avec succès !
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <input
                type="text"
                name="lastName"
                placeholder="Nom"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
              />
              <input
                type="text"
                name="firstName"
                placeholder="Prénom"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
            </div>

            <div className={styles.row}>
              <input
                type="tel"
                name="phone"
                placeholder="Téléphone"
                pattern="^(\+33|0)[67]\d{8}$"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className={styles.messageGroup}>
              <textarea
                name="message"
                rows={1}
                placeholder="Message"
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>
            <div className={styles.contactBtn}>
              <Button
                variant="primary"
                size="sm"
                type="submit"
                disabled={loading}
              >
                {loading ? "Envoi..." : "Contact"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
