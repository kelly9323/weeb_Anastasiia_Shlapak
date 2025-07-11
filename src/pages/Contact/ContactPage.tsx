import Button from "../../components/Button/Button";
import styles from "./ContactPage.module.scss";

export default function ContactPage() {
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

          <form className={styles.form}>
            <div className={styles.row}>
              <input type="text" name="lastName" placeholder="Nom" />
              <input type="text" name="firstName" placeholder="Prénom" />
            </div>

            <div className={styles.row}>
              <input
                type="tel"
                name="phone"
                placeholder="Téléphone"
                pattern="^(\+33|0)[67]\d{8}$"
                required
              />
              <input type="email" name="email" placeholder="Email" />
            </div>

            <div className={styles.messageGroup}>
              <textarea name="message" rows={1} placeholder="Message" />
            </div>
            <div className={styles.contactBtn}>
              <Button variant="primary" size="sm">
                Contact
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
