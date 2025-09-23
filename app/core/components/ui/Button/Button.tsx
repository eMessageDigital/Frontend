import React from "react";
import styles from "./Button.module.scss";

type Props = {
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
	type?: "button" | "submit" | "reset" | undefined;
};

export default function Button({ children, className = "", onClick, type = "button" }: Props) {
	return <button className={`${styles.button} ${className}`}>{children}</button>;
}
