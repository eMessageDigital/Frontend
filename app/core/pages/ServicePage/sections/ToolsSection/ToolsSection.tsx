import React from "react";
import styles from "./ToolsSection.module.scss";
import { Container } from "@/app/core/components";
import Card from "./ui/Card";

type Tool = {
	title: string;
	description: string;
	imageSrc: string;
};

type ToolsSectionProps = {
	title: string;
	tools?: Tool[]; // теперь опционально
};

export default function ToolsSection({ title, tools = [] }: ToolsSectionProps) {
	return (
		<Container className={styles.container}>
			<h1 style={{ whiteSpace: "pre-line" }} className={styles.sectionTitle}>
				{title}
			</h1>
			<div className={styles.cards}>
				{tools.map((tool, idx) => (
					<Card
						key={idx}
						title={tool.title}
						description={tool.description}
						imageSrc={tool.imageSrc}
					/>
				))}
			</div>
		</Container>
	);
}
