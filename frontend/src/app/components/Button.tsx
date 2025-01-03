import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  text: string;
  className: "action" | "cancel" | "delete";
  disabled?: boolean;
};

const Button = ({ text, className, disabled = false }: ButtonProps) => {
  return (
    <button className={`${styles.button} ${styles[className]}`}>
      <div className={styles.text}>{text}</div>
    </button>
  );
};

export default Button;
