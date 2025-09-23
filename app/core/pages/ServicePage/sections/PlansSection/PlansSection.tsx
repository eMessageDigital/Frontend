import Card from "./ui/Card";
import styles from "./PlansSection.module.scss";
import { Container } from "../../../../components";

type Plan = {
	title: string;
	items: string[];
	price: string;
	buttonText: string;
	theme: "light" | "dark";
};

type PlansSectionProps = {
	title: string;
	plans?: Plan[];
	href: string;
};

export default function PlansSection({ title, plans = [], href }: PlansSectionProps) {
	return (
		<Container className={styles.container}>
			<h1 style={{ whiteSpace: "pre-line" }} className={styles.title}>
				{title}
			</h1>
			<div className={styles.cards}>
				{plans.map((plan, idx) => (
					<Card href={"/request"} key={idx} {...plan} />
				))}
			</div>
		</Container>
	);
}
