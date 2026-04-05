import React from "react";
import styles from "./Card.module.scss";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { Button } from "../../../../../components";
import { useRouter } from "next/navigation";

type CardProps = {
	title: string;
	theme: "dark" | "light";
	items: string[];
	price: string;
	buttonText: string;
	href: string;
	isSingle?: boolean;
};

export default function Card({
	title,
	theme = "light",
	items,
	price,
	buttonText,
	href,
	isSingle = false,
}: CardProps) {
	const router = useRouter();
	return (
		<div
			className={`${styles.card} ${theme === "dark" ? styles.dark : styles.light} ${
				isSingle ? styles.singleCard : ""
			}`}>
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
				<Button onClick={() => router.push(href)} className={styles.button}>
					{buttonText}
				</Button>
			</div>
		</div>
	);
}
