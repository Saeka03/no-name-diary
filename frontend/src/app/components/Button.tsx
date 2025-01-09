import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  text: string;
  className: "action" | "cancel" | "delete";
  disabled?: boolean;
  onClick?: (clickHandler) => void;
};

const Button = ({
  text,
  className,
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[className]}`}
      onClick={onClick}
    >
      <div className={styles.text}>{text}</div>
    </button>
  );
};

export default Button;
