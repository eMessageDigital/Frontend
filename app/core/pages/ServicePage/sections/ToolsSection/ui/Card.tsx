import React from "react";

import styles from "./Card.module.scss";
import Image from "next/image";

type CardProps = {
	title: string;
	description: string;
	imageSrc: string;
};

export default function Card({ title, description, imageSrc }: CardProps) {
	return (
		<div className={styles.card}>
			<Image className={styles.image} src={imageSrc} width={48} height={48} alt={"icon"} />
			<h1 className={styles.title}>{title}</h1>
			<p className={styles.description}>{description}</p>
		</div>
	);
}
