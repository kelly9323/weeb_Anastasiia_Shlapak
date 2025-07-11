import flash from "../../../assets/Flash.png";
import desktop from "../../../assets/Desktop.png";
import styles from "../HomePage.module.scss";

export default function LearnBlock() {
  return (
    <>
      <section className={styles.learn}>
        <div className={styles.learn__content}>
          <h3 className={styles.h3}>Des ressources pour tous les niveaux</h3>
          <h1 className={styles.h1}>
            <span className={styles.accent}>Apprenez</span> et
            <span className={styles.accent}> progressez</span>
          </h1>
          <p>
            Que vous débutiez en développement web ou que vous soyez un expert
            cherchant à approfondir vos connaissances, nous vous proposons des
            tutoriels, guides et bonnes pratiques pour apprendre efficacement.
          </p>
          <div className={styles["learn__content-link"]}>
            <a className="hover">
              Explorer les ressources
              <img src={flash} alt="flash" />
            </a>
          </div>
        </div>
        <div className={styles.learn__image}>
          <img src={desktop} alt="desktop" />
        </div>
      </section>
    </>
  );
}
