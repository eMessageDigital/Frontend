"use client";

import React from "react";
import styles from "./Contact.module.scss";
import { Button, Container } from "../../../components";
import Image from "next/image";

export default function ContactsPage() {
	return (
		<Container className={styles.container}>
			{/* Хлебные крошки */}
			<div className={styles.breadcrumbs}>
				<a href='/'>Главная</a> / <span>Контакты</span>
			</div>

			{/* Заголовок */}
			<h1 className={styles.title}>Контакты</h1>

			{/* Контактные карточки */}
			<div className={styles.cardsWrapper}>
				<div className={styles.cardSmall}>
					{/* Телефон */}
					<div className={styles.contactItem}>
						<Image src={"/ico/phone.svg"} height={48} width={48} alt='icon' />
						<div className={styles.cardText}>
							<p className={styles.contactLabel}>Номер телефона</p>
							<p className={styles.contactValue}>
								<a href='tel:+79959338372'>+7 (995) 933-83-72</a>
							</p>
						</div>
					</div>

					{/* Email */}
					<div className={styles.contactItem}>
						<Image src={"/ico/incomemail.svg"} height={48} width={48} alt='icon' />
						<div className={styles.cardText}>
							<p className={styles.contactLabel}>Электронная почта</p>
							<p className={styles.contactValue}>
								<a href='tel:+1234567890'>emessage.adt@yandex.ru</a>
							</p>
						</div>
					</div>
				</div>

				{/* Карточка 2 — 66% */}
				<div className={styles.cardLarge}>
					<div className={styles.leftIcon}>
						<Image src='/ico/paper.svg' width={48} height={48} alt='icon' />
					</div>

					<div className={styles.columns}>
						<div className={styles.column}>
							<div className={styles.text}>
								<p className={styles.columnLabel}>Индивидуальный предприниматель</p>
								<p className={styles.columnValue}>Рахимов Руслан Ренатович </p>
							</div>
							<div className={styles.text}>
								<p className={styles.columnLabel}>ИНН</p>
								<p className={styles.columnValue}>631820275200</p>
							</div>
						</div>

						<div className={styles.column}>
							<div className={styles.text}>
								<p className={styles.columnLabel}>ОГРНИП</p>
								<p className={styles.columnValue}>325632700128721</p>
							</div>
							<div className={styles.text}>
								<p className={styles.columnLabel}>Адрес</p>
								<p className={styles.columnValue}>Самарская область, город Самара</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
}
