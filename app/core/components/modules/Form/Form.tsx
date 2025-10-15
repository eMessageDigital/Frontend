"use client";

import React, { useCallback, useState } from "react";
import styles from "./Form.module.scss";
import { Booking, Button, Container, Input } from "../..";
import { IMaskInput } from "react-imask";
import { Download, Paperclip, X } from "lucide-react";
import { ServiceData } from "../../../data/services/types";
import { FormExtraOptions } from "../FormExtraOptions/FormExtraOptions";
import {
	SubmitFormSchema,
	TypeSubmitForm,
} from "../../backend/features/user/schemas/submitForm.schema";
import { toastMessageHandler } from "../../backend/utils/toast-message-handler";

interface FormProps {
	plan: string | null;
	serviceData: ServiceData & {
		extraServices: { id: string; name: string; dependsOn?: string }[];
	};
}

export default function Form({ plan, serviceData }: FormProps) {
	const [form, setForm] = useState({
		name: "",
		phone: "",
		telegram: "",
		company: "",
		baseInfo: "",
		offer: "",
		launchTime: "",
		description: "",
		selectedServices: [] as string[],
		files: [] as File[],
	});

	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleFieldChange = (field: string, value: string) => {
		setForm((prev) => ({ ...prev, [field]: value }));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files) return;

		setForm((prev) => ({
			...prev,
			files: [...prev.files, ...Array.from(files)],
		}));
	};

	const handleLaunchTimeChange = useCallback(
		(dateTime: string) => handleFieldChange("launchTime", dateTime),
		[]
	);

	const removeFile = (index: number) => {
		setForm((prev) => ({
			...prev,
			files: prev.files.filter((_, i) => i !== index),
		}));
	};

	const toggleService = (serviceId: string) => {
		setForm((prev) => ({
			...prev,
			selectedServices: prev.selectedServices.includes(serviceId)
				? prev.selectedServices.filter((s) => s !== serviceId)
				: [...prev.selectedServices, serviceId],
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

		const dataToValidate: TypeSubmitForm = {
			type: "full",
			client: {
				name: form.name,
				phone: form.phone,
				telegram: form.telegram,
				company: form.company,
			},
			project: {
				base: form.baseInfo,
				offer: form.offer,
				launchTime: form.launchTime,
				description: form.description,
			},
			extraServices: form.selectedServices,
		};

		try {
			setErrors({});
			SubmitFormSchema.parse(dataToValidate);

			setIsSubmitting(true);

			const textResponse = await fetch(`${SERVER_URL}/forms/submit-text`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(dataToValidate),
			});

			if (!textResponse.ok) {
				const error = await textResponse.json().catch(() => ({}));
				throw new Error(error?.message || "Ошибка отправки текстовой части формы");
			}

			if (form.files.length > 0) {
				const formData = new FormData();
				form.files.forEach((file) => formData.append("files", file));

				const fileResponse = await fetch(`${SERVER_URL}/forms/submit-files`, {
					method: "POST",
					body: formData,
				});

				if (!fileResponse.ok) {
					const error = await fileResponse.json().catch(() => ({}));
					throw new Error(error?.message || "Ошибка отправки файлов");
				}
			}

			toastMessageHandler({ message: "Форма успешно отправлена!", status: "success" });

			setForm({
				name: "",
				phone: "",
				telegram: "",
				company: "",
				baseInfo: "",
				offer: "",
				launchTime: "",
				description: "",
				selectedServices: [],
				files: [],
			});
			setIsSubmitting(false);
		} catch (err: any) {
			setIsSubmitting(false);

			if (err?.issues) {
				const newErrors: { [key: string]: string } = {};
				err.issues.forEach((issue: any) => {
					const fieldKey = issue.path.join(".");
					newErrors[fieldKey] = issue.message;
				});
				setErrors(newErrors);
			} else {
				toastMessageHandler(err);
			}
		}
	};

	const showExtraService = plan?.includes("стандарт");
	const extraServicesOptions = serviceData.extraServices || [];

	return (
		<Container className={styles.container}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.formHeader}>
					<h1 className={styles.left}>Хотите обсудить проект?</h1>
					<div className={styles.right}>
						<h1 className={styles.rightTitle}>Заполните анкету</h1>
						<p className={styles.rightSubtitle}>
							Гарантируем конфиденциальность информации о вашем проекте.
						</p>
					</div>
				</div>

				{/* Данные клиента */}
				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>Ваши данные</h2>
					<div className={styles.inputs}>
						<Input
							type='text'
							placeholder='Имя'
							value={form.name}
							onChange={(e) => handleFieldChange("name", e.target.value)}
							error={!!errors["client.name"]}
							errorMessage={errors["client.name"]}
						/>

						<div className={styles.inputWrapper}>
							<div
								className={`${styles.inputPhoneWrapper} ${
									errors["client.phone"] ? styles.inputError : ""
								}`}>
								<IMaskInput
									mask='+{7} (000) 000 00-00'
									placeholder='Телефон'
									value={form.phone}
									onAccept={(value: string) => handleFieldChange("phone", value)}
									overwrite
									className={styles.inputPhoneInner}
								/>
							</div>
							{errors["client.phone"] && (
								<div className={styles.errorText}>{errors["client.phone"]}</div>
							)}
						</div>

						<Input
							type='text'
							placeholder='Telegram'
							value={form.telegram}
							onChange={(e) => handleFieldChange("telegram", e.target.value)}
							error={!!errors["client.telegram"]}
							errorMessage={errors["client.telegram"]}
						/>

						<Input
							type='text'
							placeholder='Компания'
							value={form.company}
							onChange={(e) => handleFieldChange("company", e.target.value)}
							error={!!errors["client.company"]}
							errorMessage={errors["client.company"]}
						/>
					</div>
				</div>

				{/* Информация о проекте */}
				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>Информация о проекте</h2>
					<div className={styles.inputs}>
						<Input
							type='text'
							placeholder='База / информация для её сбора'
							value={form.baseInfo}
							onChange={(e) => handleFieldChange("baseInfo", e.target.value)}
							error={!!errors["project.base"]}
							errorMessage={errors["project.base"]}
						/>

						<Input
							type='text'
							placeholder='Оффер / Черновик сообщения'
							value={form.offer}
							onChange={(e) => handleFieldChange("offer", e.target.value)}
							error={!!errors["project.offer"]}
							errorMessage={errors["project.offer"]}
						/>

						{/* Файлы */}
						<div className={styles.fileInputWrapper}>
							<label className={styles.fileLabel}>
								<span>Прикрепить файлы</span>
								<input
									type='file'
									className={styles.fileInput}
									multiple
									onChange={handleFileChange}
								/>
								<Download size={18} />
							</label>
						</div>

						<Booking onChange={handleLaunchTimeChange} />

						{form.files.length > 0 && (
							<ul className={styles.filesList}>
								{form.files.map((file, index) => (
									<li key={index} className={styles.fileItem}>
										<Paperclip size={16} />
										<span>{file.name}</span>
										<button
											type='button'
											onClick={() => removeFile(index)}
											className={styles.removeFileBtn}>
											<X size={14} />
										</button>
									</li>
								))}
							</ul>
						)}

						<textarea
							className={`${styles.textarea} ${
								errors["project.description"] ? styles.inputError : ""
							}`}
							placeholder='Расскажите о вашем проекте'
							value={form.description}
							onChange={(e) => handleFieldChange("description", e.target.value)}></textarea>
						{errors["project.description"] && (
							<div className={styles.errorText}>{errors["project.description"]}</div>
						)}
					</div>
				</div>

				{/* Доп. услуги */}
				{showExtraService && (
					<FormExtraOptions
						extraServices={extraServicesOptions}
						selectedServices={form.selectedServices}
						toggleService={toggleService}
					/>
				)}

				{/* Кнопка */}
				<div className={styles.endSection}>
					<Button className={styles.formBtn} type='submit' disabled={isSubmitting}>
						{isSubmitting ? "Отправка..." : "Заказать рассылку"}
					</Button>
				</div>
			</form>
		</Container>
	);
}
