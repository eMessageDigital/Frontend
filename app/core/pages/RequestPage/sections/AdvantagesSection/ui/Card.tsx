import React from "react";
import styles from "./Card.module.scss";
import Image from "next/image";

interface CardProps {
	title: string;
	text: string;
	src: string;
	variant?: "light" | "primary";
}

export default function Card({ title, text, src, variant = "light" }: CardProps) {
	return (
		<div className={`${styles.card} ${styles[variant]}`}>
			<Image src={src} alt={title} width={70} height={70} className={styles.image} />
			<h1 className={styles.title}>{title}</h1>
			<p className={styles.text}>{text}</p>
		</div>
	);
}
