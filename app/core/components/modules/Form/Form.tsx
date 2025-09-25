"use client";

import React, { useState } from "react";
import styles from "./Form.module.scss";
import { Button, Container, Input } from "../..";

const extraServicesOptions = ["Таргетинг", "Сегментация", "Дизайн баннеров", "Копирайтинг"];

export default function Form({ plan }: { plan: string | null }) {
	const showExtraService = plan?.includes("стандарт");

	const [selectedServices, setSelectedServices] = useState<string[]>([]);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggleService = (service: string) => {
		setSelectedServices((prev) =>
			prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
		);
	};

	return (
		<Container className={styles.container}>
			<form className={styles.form} action=''>
				{/* Верхний блок */}
				<div className={styles.formHeader}>
					<h1 className={styles.left}>Хотите обсудить проект?</h1>
					<div className={styles.right}>
						<h1 className={styles.rightTitle}>Заполните анкету</h1>
						<p className={styles.rightSubtitle}>
							Гарантируем конфиденциальность информации о вашем проекте.
						</p>
					</div>
				</div>

				{/* Первая секция */}
				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>Ваши данные</h2>
					<div className={styles.inputs}>
						<Input type='text' placeholder='Имя' />
						<Input type='email' placeholder='Телефон' />
						<Input type='tel' placeholder='Telegram' />
						<Input type='text' placeholder='Компания' />
					</div>
				</div>

				{/* Вторая секция */}
				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>Информация о проекте</h2>
					<div className={styles.inputs}>
						<Input type='text' placeholder='База' />
						<Input type='text' placeholder='Оффер' />

						<div className={styles.fileInputWrapper}>
							<label className={styles.fileLabel}>
								<span>Загрузить файл</span>
								<input type='file' className={styles.fileInput} />
								<span className={styles.icon}>📎</span>
							</label>
						</div>

						<select className={styles.select}>
							<option value=''>Желаемое время запуска</option>
							<option value='1'>1 неделя</option>
							<option value='2'>2 недели</option>
							<option value='3'>1 месяц</option>
							<option value='4'>Другой</option>
						</select>

						<textarea className={styles.textarea} placeholder='Расскажите о вашем проекте' />
					</div>
				</div>

				{/* Секция дополнительных услуг */}
				{showExtraService && (
					<div className={styles.section}>
						<h2 className={styles.sectionTitle}>Дополнительные услуги</h2>
						<div className={styles.extraService}>
							<div className={styles.selectBox} onClick={() => setDropdownOpen(!dropdownOpen)}>
								{selectedServices.length > 0 ? selectedServices.join(", ") : "Выберите услуги"}
								<span className={styles.arrow}>{dropdownOpen ? "▲" : "▼"}</span>
							</div>
							{dropdownOpen && (
								<div className={styles.dropdownList}>
									{extraServicesOptions.map((service) => (
										<label key={service} className={styles.checkboxLabel}>
											<input
												type='checkbox'
												checked={selectedServices.includes(service)}
												onChange={() => toggleService(service)}
											/>
											{service}
										</label>
									))}
								</div>
							)}
						</div>
					</div>
				)}

				{/* Кнопка */}
				<div className={styles.endSection}>
					<Button className={styles.formBtn}>Заказать рассылку</Button>
				</div>
			</form>
		</Container>
	);
}
