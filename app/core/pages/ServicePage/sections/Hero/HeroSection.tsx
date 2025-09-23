import { Button, Container } from "../../../../components";
import styles from "./HeroSection.module.scss";

type Props = {
	title: string;
	subtitle: string;
	about?: string;
	buttonText: string;
	theme?: "telegram" | "whatsapp" | "vk";
};

export default function Hero({ title, subtitle, about, buttonText, theme }: Props) {
	return (
		<div className={`${styles.bgGrid} ${theme ? styles[theme] : ""}`}>
			<Container className={styles.container}>
				<h1 className={styles.title}>{title}</h1>
				<p className={styles.subtitle}>{subtitle}</p>
				<p className={styles.about}>{about}</p>
				<div>
					<Button className={styles.button}>{buttonText}</Button>
				</div>
			</Container>
		</div>
	);
}
