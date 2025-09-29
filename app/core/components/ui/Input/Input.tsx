import React, { InputHTMLAttributes, ReactNode } from "react";
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	children?: ReactNode;
	variant?: "light" | "primary";
}

export default function Input({
	children,
	className = "",
	variant = "light",
	...props
}: InputProps) {
	return (
		<div className={`${styles.wrapper} ${styles[variant]} ${className}`}>
			{children && <div className={styles.icon}>{children}</div>}
			<input className={`${styles.input} ${styles.className}`} {...props} />
		</div>
	);
}
