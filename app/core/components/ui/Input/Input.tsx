import React, { InputHTMLAttributes, ReactNode } from "react";
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	children?: ReactNode;
	variant?: "light" | "primary";
	label?: string;
	error?: boolean;
	errorMessage?: string;
}

export default function Input({
	children,
	className = "",
	variant = "light",
	label,
	error = false,
	errorMessage,
	...props
}: InputProps) {
	return (
		<div className={styles.wrapper}>
			{label && <label className={styles.label}>{label}</label>}
			<div className={`${styles.inputContainer} ${styles[variant]} ${error ? styles.error : ""}`}>
				{children && <div className={styles.icon}>{children}</div>}
				<input className={className} {...props} />
			</div>
			{errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
		</div>
	);
}
