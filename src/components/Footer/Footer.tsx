import styles from "./Footer.module.scss";
import facebook from "../../assets/icons/social-icons/facebook.png";
import twitter from "../../assets/icons/social-icons/twitter.png";
import instagram from "../../assets/icons/social-icons/instagram.png";
import linkedin from "../../assets/icons/social-icons/linkedin.png";
import youtube from "../../assets/icons/social-icons/youtube.png";

export default function Footer() {
  const socialIcons = [
    { src: youtube, alt: "YouTube" },
    { src: facebook, alt: "Facebook" },
    { src: twitter, alt: "Twitter" },
    { src: instagram, alt: "Instagram" },
    { src: linkedin, alt: "LinkedIn" },
  ];
  return (
    <>
      <footer className={styles.footer}>
          <p className={styles.description}>
            @ 2025 Weeb, Inc. All rights reserved.
          </p>
        <div className={styles.socialIcons}>
          {socialIcons.map(({ src, alt }) => (
            <img key={alt} src={src} alt={alt} />
          ))}
        </div>
      </footer>
    </>
  );
}
