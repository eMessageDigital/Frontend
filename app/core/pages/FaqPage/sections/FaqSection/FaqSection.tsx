"use client";
import React, { useState } from "react";
import styles from "./FaqSection.module.scss";
import { FiPlus, FiX } from "react-icons/fi";
import { Container } from "@/app/core/components";

type FAQItem = {
	question: string;
	answer: string;
};

const faqData: FAQItem[] = [
	{
		question: "Преимущества работы с нами",
		answer:
			"Мы создаём персонализированные рассылки, которые цепляют внимание, вызывают отклик и приводят клиентов. Бережное отношение к вашей базе клиентов, без спама и блокировок.",
	},
	{
		question: "Как мы работаем?",
		answer:
			"Мы создаём персонализированные рассылки, которые цепляют внимание, вызывают отклик и приводят клиентов. Бережное отношение к вашей базе клиентов, без спама и блокировок.",
	},
	{
		question: "Какие гарантии я получаю?",
		answer:
			"Мы создаём персонализированные рассылки, которые цепляют внимание, вызывают отклик и приводят клиентов. Бережное отношение к вашей базе клиентов, без спама и блокировок.",
	},
	{
		question: "Поддержка после выполнения заказа",
		answer:
			"Мы создаём персонализированные рассылки, которые цепляют внимание, вызывают отклик и приводят клиентов. Бережное отношение к вашей базе клиентов, без спама и блокировок.",
	},
];

export default function FAQSection() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggle = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<Container className={styles.container}>
			<div className={styles.breadcrumbs}>Главная / FAQ</div>
			<h1 className={styles.title}>Часто задаваемые вопросы</h1>
			<div className={styles.faqList}>
				{faqData.map((item, index) => (
					<div
						key={index}
						className={`${styles.faqCard} ${openIndex === index ? styles.open : ""}`}
						onClick={() => toggle(index)}>
						<div className={styles.question}>
							<span>{item.question}</span>
							<span className={styles.icon}>
								{openIndex === index ? <FiX size={20} /> : <FiPlus size={20} />}
							</span>
						</div>
						<div className={styles.answer}>{item.answer}</div>
					</div>
				))}
			</div>
		</Container>
	);
}
