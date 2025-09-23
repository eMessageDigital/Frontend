import { Container } from "@/app/core/components";
import styles from "./HeroSection.module.scss";
import { Button } from "@/ui";

type Props = {
	title: string;
	subtitle: string;
	about?: string;
	buttonText: string;
};

export default function Hero({ title, subtitle, about, buttonText }: Props) {
	return (
		<div className={styles.bgGrid}>
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
