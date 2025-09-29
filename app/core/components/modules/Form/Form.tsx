"use client";

import React, { useState } from "react";
import styles from "./Form.module.scss";
import { Booking, Button, Container, Input } from "../..";
import { IMaskInput } from "react-imask";
import { Download, Paperclip, X } from "lucide-react";
import { ServiceData } from "../../../data/services/types";
import { FormExtraOptions } from "../FormExtraOptions/FormExtraOptions";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../../store";
import { addFiles, removeFiles } from "../../../store/slices/formSlice";

interface FormProps {
	plan: string | null;
	serviceData: ServiceData & {
		extraServices: { id: string; name: string; dependsOn?: string }[];
	};
}

export default function Form({ plan, serviceData }: FormProps) {
	const dispatch = useDispatch();
	const files = useSelector((state: rootState) => state.form.files);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			dispatch(addFiles(Array.from(e.target.files)));
		}
	};

	const showExtraService = plan?.includes("стандарт");

	const [selectedServices, setSelectedServices] = useState<string[]>([]);
	const [phone, setPhone] = useState<string>("");

	const toggleService = (serviceId: string) => {
		setSelectedServices((prev) =>
			prev.includes(serviceId) ? prev.filter((s) => s !== serviceId) : [...prev, serviceId]
		);
	};

	const extraServicesOptions = serviceData.extraServices || [];
	return (
		<Container className={styles.container}>
			<form className={styles.form}>
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
						<Input className={styles.input} type='text' placeholder='Имя' />
						<div className={styles.wrapper}>
							<IMaskInput
								mask='+{7} (000) 000 00-00'
								placeholder='Телефон'
								value={phone}
								onAccept={(value: string) => setPhone(value)}
								overwrite
								className={styles.input}
							/>
						</div>
						<Input className={styles.input} type='email' placeholder='Telegram' />
						<Input className={styles.input} type='tel' placeholder='Компания' />
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
								<span>Прикрепить файлы</span>
								<input
									type='file'
									className={styles.fileInput}
									multiple
									onChange={handleFileChange}
								/>
								<span className={styles.icon}>
									<Download size={18} />
								</span>
							</label>
						</div>

						<Booking />

						{files.length > 0 && (
							<ul className={styles.filesList}>
								{files.map((file, index) => (
									<li key={index} className={styles.fileItem}>
										<Paperclip size={16} />
										<span>{file.name}</span>
										<button
											type='button'
											onClick={() => dispatch(removeFiles(index))}
											className={styles.removeFileBtn}>
											<X size={14} />
										</button>
									</li>
								))}
							</ul>
						)}

						<textarea className={styles.textarea} placeholder='Расскажите о вашем проекте' />
					</div>
				</div>

				{/* Секция дополнительных услуг */}
				{showExtraService && (
					<FormExtraOptions
						extraServices={extraServicesOptions}
						selectedServices={selectedServices}
						toggleService={toggleService}
					/>
				)}

				{/* Кнопка */}
				<div className={styles.endSection}>
					<Button className={styles.formBtn}>Заказать рассылку</Button>
					<p className={styles.policyText}>
						Нажимая на кнопку, вы соглашаетесь с <br />
						<a href='/privacy' target='_blank' rel='noopener noreferrer'>
							политикой конфиденциальности
						</a>
					</p>
				</div>
			</form>
		</Container>
	);
}
