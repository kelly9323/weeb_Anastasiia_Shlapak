import shapes from '../../../assets/Shapes.png'
import styles from "../HomePage.module.scss";
import flash from "../../../assets/Flash.png";

export default function TrendsBlock() {
  return (
    <>
      <section className={styles.trends}>
        <div className={styles.trends__image}>
          <img src={shapes} alt="shapes" />
        </div>
        <div className={styles.trends__content}>
          <h3 className={styles.h3}>
            Le web, un écosystème en constante évolution
          </h3>
          <h1 className={styles.h1}>
            Restez informé des dernières{" "}
            <span className={styles.accent}>tendances </span>
          </h1>
          <p>
            Chaque semaine, nous analysons les nouveautés du web : frameworks
            émergents, bonnes pratiques SEO, accessibilité, et bien plus encore.
            Ne manquez aucune actualité du digital !
          </p>
          <div className={styles["learn__content-link"]}>
            <a className='hover'>
              Lire les articles récents
              <img src={flash} alt="flash" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
