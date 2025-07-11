import styles from "../HomePage.module.scss";

const logos = import.meta.glob(
  "../../../assets/icons/companies-logos/*.{png,jpg,jpeg,svg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

export default function CompaniesBlock() {
  const logoUrls: string[] = Object.values(logos) as string[];

  return (
    <section className={styles.companies}>
      <h2 className={styles.companies__title}>Ils nous font confiance</h2>
      <div>
        <ul className={styles.companies__logos}>
          {logoUrls.map((logoUrl, index) => (
            <li key={index}>
              <img src={logoUrl} alt={`company logo ${index + 1}`} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
