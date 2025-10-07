import React from "react";
import styles from "./Button.module.scss";

type Props = {
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
	type?: "button" | "submit" | "reset" | undefined;
	disabled?: boolean;
};

export default function Button({
	children,
	className = "",
	onClick,
	type = "button",
	disabled = false,
}: Props) {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`${styles.button} ${className}`}>
			{children}
		</button>
	);
}
