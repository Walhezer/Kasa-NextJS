import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

/**
 * Reusable button component with support for multiple variants and icons.
 * 
 * @param {Object} props - The component props.
 * @param {ReactNode} [props.children] - The text or content to display inside the button.
 * @param {"primary" | "secondary"} [props.variant="primary"] - The visual style of the button (default: "primary").
 * @param {ReactNode} [props.icon] - An optional icon to display (alone or with text).
 * @param {string} [props.className] - Additional CSS classes to override styles.
 * @returns {JSX.Element} The rendered button component.
 */

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