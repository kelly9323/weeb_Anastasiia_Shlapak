import Button from "../../../components/Button/Button";
import styles from "../HomePage.module.scss";
import desktop from "../../../assets/desktop.png";
import { Link } from "react-router-dom";

export default function HeroBlock() {
  return (
    <>
      <section className={styles.section}>
        <h1 className={styles.section__title}>
          Explorez le <span className={styles.highlight}>Web</span> sous toutes
          ses <span className={styles.underline}>facettes</span>
        </h1>
        <p className={styles.section__paragraph}>
          Le monde du web évolue constamment, et nous sommes là pour vous guider
          à travers ses tendances, technologies et meilleures pratiques. Que
          vous soyez développeur, designer ou passionné du digital, notre blog
          vous offre du contenu de qualité pour rester à la pointe.
        </p>
        <div className={styles.section__buttons}>
          <Link to="/articles" style={{ textDecoration: "none" }}>
            <Button variant="primary" size="lg">
              Découvrir les articles
            </Button>
          </Link>
          <Button variant="secondary" size="lg">
            S'abonner à la newsletter
          </Button>
        </div>
        <img
          src={desktop}
          alt="desktop-img"
          className={styles.section__image}
        />
      </section>
    </>
  );
}
