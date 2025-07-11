import classNames from "classnames";
import styles from "./Button.module.scss";

type ButtonProps = {
  variant?: "primary" | "secondary" | "primary-no-bg";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={classNames(styles.button, styles[variant], styles[size])}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
