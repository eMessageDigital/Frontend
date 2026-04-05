import Card from "./ui/Card";
import styles from "./PlansSection.module.scss";
import { Container } from "../../../../components";
import { useSelector } from "react-redux";
import { rootState } from "../../../../store";

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
};

export default function PlansSection({ title, plans = [] }: PlansSectionProps) {
	const serviceKey = useSelector((state: rootState) => state.service.selected);
	const hasSinglePlan = plans.length === 1;

	return (
		<div className={styles.one}>
			<Container className={styles.container}>
				<h1
					style={{ whiteSpace: "pre-line" }}
					className={`${styles.title} ${hasSinglePlan ? styles.singlePlanTitle : ""}`}>
					{title}
				</h1>
				<div className={`${styles.cards} ${hasSinglePlan ? styles.singlePlan : ""}`}>
					{plans.map((plan, idx) => (
						<Card
							href={`/request/${serviceKey}?plan=${encodeURIComponent(plan.title.toLowerCase())}`}
							key={idx}
							isSingle={hasSinglePlan}
							{...plan}
						/>
					))}
				</div>
			</Container>
		</div>
	);
}
