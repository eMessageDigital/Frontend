import React from "react";
import styles from "./Card.module.scss";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import { Button } from "../../../../../components";

type Props = {
	src: string;
	title: string;
	description: string;
	buttonText: string;
	buttonLink: string;
};

export default function Card({ src, title, description, buttonText, buttonLink }: Props) {
	return (
		<div className={styles.card}>
			<Image className={styles.image} src={src} width={48} height={48} alt='icon'></Image>
			<h1 className={styles.title}>{title}</h1>
			<p className={styles.description}>{description}</p>
			<Link href={buttonLink}>
				<Button className={styles.button}>
					{buttonText}
					<FiArrowRight className={styles.icon} />
				</Button>
			</Link>
		</div>
	);
}
