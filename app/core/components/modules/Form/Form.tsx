import React from "react";

import styles from "./Form.module.scss";
import { Container, Input } from "../..";

export default function Form() {
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

						{/* Загрузка файла */}
						<div className={styles.fileInputWrapper}>
							<label className={styles.fileLabel}>
								<span>Загрузить файл</span>
								<input type='file' className={styles.fileInput} />
								<span className={styles.icon}>📎</span>
							</label>
						</div>

						{/* Dropdown */}
						<select className={styles.select}>
							<option value=''>Желаемое время запуска</option>
							<option value='1'>1 неделя</option>
							<option value='2'>2 недели</option>
							<option value='3'>1 месяц</option>
							<option value='4'>Другой</option>
						</select>

						{/* Textarea на всю ширину */}
						<textarea className={styles.textarea} placeholder='Расскажите о вашем проекте' />
					</div>
				</div>
			</form>
		</Container>
	);
}
