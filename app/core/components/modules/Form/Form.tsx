"use client";

import React, { useState } from "react";
import styles from "./Form.module.scss";
import { Booking, Button, Container, Input } from "../..";
import { IMaskInput } from "react-imask";

const extraServicesOptions = ["Таргетинг", "Сегментация", "Дизайн баннеров", "Копирайтинг"];

export default function Form({ plan }: { plan: string | null }) {
	const showExtraService = plan?.includes("стандарт");

	const [selectedServices, setSelectedServices] = useState<string[]>([]);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [phone, setPhone] = useState<string>("");

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

						<div className={styles.wrapper}>
							<IMaskInput
								mask='+{7} (000) 000 00-00'
								placeholder='Телефон'
								value={phone}
								onAccept={(value: string) => setPhone(value)}
								overwrite
								className={styles.input} // стили как у обычного input
							/>
						</div>

						<Input type='email' placeholder='Telegram' />
						<Input type='tel' placeholder='Компания' />
					</div>
				</div>

				{/* Вторая секция */}
				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>Информация о проекте</h2>
					<div className={styles.inputs}>
						<Input type='text' placeholder='База / информация для её сбора' />
						<Input type='text' placeholder='Оффер / Черновик сообщения' />

						<div className={styles.fileInputWrapper}>
							<label className={styles.fileLabel}>
								<span>Загрузить файл</span>
								<input type='file' className={styles.fileInput} />
								<span className={styles.icon}>📎</span>
							</label>
						</div>

						<Booking />

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
