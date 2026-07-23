import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "primary" | "secondary";
  icon?: ReactNode;
}

export default function Button({
  children,
  variant = "primary",
  icon,
  className = "",
  ...props
}: ButtonProps) {
  
  let paddingClass = styles.textOnly;
  if (icon && !children) paddingClass = styles.iconOnly;
  if (icon && children) paddingClass = styles.withIcon;

  return (
    <button
      className={`${styles.baseButton} ${styles[variant]} ${paddingClass} ${className}`}
      {...props}
    >
      {icon && <span className={styles.iconWrapper}>{icon}</span>}
      {children}
    </button>
  );
}