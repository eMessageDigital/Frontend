import React from "react";
import styles from "./Card.module.scss";
import { BsFillPatchCheckFill } from "react-icons/bs";
import Link from "next/link";
import { Button } from "../../../../../components";

type CardProps = {
	title: string;
	theme: "dark" | "light";
	items: string[];
	price: string;
	buttonText: string;
	href: string;
};

export default function Card({
	title,
	theme = "light",
	items,
	price,
	buttonText,
	href,
}: CardProps) {
	return (
		<div className={`${styles.card} ${theme === "dark" ? styles.dark : styles.light}`}>
			<h1 className={styles.title}>{title}</h1>
			<ul className={styles.list}>
				{items.map((item, idx) => (
					<li key={idx} className={styles.list__item}>
						<span className={styles.iconWrapper}>
							<BsFillPatchCheckFill className={styles.icon} />
						</span>
						{item}
					</li>
				))}
			</ul>
			<div className={styles.bottom}>
				<h2 className={styles.price}>{price}</h2>
				<Link href={href}>
					<Button className={styles.button}>{buttonText}</Button>
				</Link>
			</div>
		</div>
	);
}
