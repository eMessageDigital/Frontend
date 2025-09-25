import styles from "./Hero.module.scss";
import Link from "next/link";
import clsx from "clsx";
import { Button, Container } from "../..";

type Props = {
	title: string;
	subtitle: string;
	about?: string;
	buttonText: string;
	buttonLink?: string;
	variant?: "default" | "telegram" | "whatsapp" | "vk"; // добавляем разные варианты оформления
};

export default function Hero({
	title,
	subtitle,
	about,
	buttonText,
	buttonLink = "/services",
	variant = "default",
}: Props) {
	return (
		<div className={clsx(styles.bgGrid, styles[variant])}>
			{/* Самолетики */}
			<div className={clsx(styles.planes, styles[`${variant}Planes`])}>
				{[...Array(4)].map((_, i) => (
					<svg key={i} className={styles.plane} viewBox='0 0 24 24'>
						<path d='M9.999 16.2l-.367 4.085c.524 0 .751-.226 1.029-.497l2.466-2.356 5.111 3.689c.938.517 1.603.246 1.836-.87l3.326-15.576c.339-1.366-.493-1.916-1.41-1.56L2.48 9.463c-1.343.537-1.326 1.292-.243 1.633l4.947 1.544 11.475-7.233c.54-.327 1.034-.146.628.182' />
					</svg>
				))}
			</div>

			<Container className={styles.container}>
				<h1 className={styles.title}>{title}</h1>
				<p className={styles.subtitle}>{subtitle}</p>
				{about && <p className={styles.about}>{about}</p>}
				<div>
					<Link href={buttonLink}>
						<Button className={styles.button}>{buttonText}</Button>
					</Link>
				</div>
			</Container>
		</div>
	);
}
