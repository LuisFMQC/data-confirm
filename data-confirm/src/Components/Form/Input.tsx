import React from "react";
import styles from "./Input.module.css";

type InputType = {
  label: string;
  type: string;
  name: string;
  value: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error: string | null;
  onBlur: React.FocusEventHandler<HTMLInputElement> | undefined;
  placeholder: string | undefined;
  maxLength?: number | undefined;
};

const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  onBlur,
  placeholder,
  maxLength,
}: InputType) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        placeholder={placeholder}
        id={name}
        name={name}
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={maxLength}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
