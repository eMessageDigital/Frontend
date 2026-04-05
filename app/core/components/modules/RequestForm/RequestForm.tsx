"use client";

import React, { useState } from "react";
import styles from "./RequestForm.module.scss";
import { FaTelegramPlane } from "react-icons/fa";
import { MdPhoneInTalk } from "react-icons/md";
import { Container } from "../../ui/Container/Container";
import { BaseModal, Button, Input, Loader } from "../..";
import Link from "next/link";
import Image from "next/image";
import { IMaskInput } from "react-imask";
import {
	SimpleSubmitFormSchema,
	SimpleSubmitForm,
} from "../../backend/features/user/schemas/simpleSubmitForm.schema";
import { toastMessageHandler } from "../../backend/utils/toast-message-handler";
import { useRouter } from "next/navigation";

export const RequestForm: React.FC = () => {
	const MAX_LINK =
		"https://max.ru/u/f9LHodD0cOJ8hbNzSUB1LpUdBTJ0tAAGGUsVJKchLw4F9AkCVjBvMOPSKbY";

	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form, setForm] = useState({
		topic: "",
		email: "",
		phone: "",
		messengerContact: "",
		tasks: "",
	});
	const [errors, setErrors] = useState<{
		topic?: string;
		email?: string;
		phone?: string;
		messengerContact?: string;
		tasks?: string;
	}>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const handleFieldChange = (field: keyof typeof form, value: string) => {
		setForm((prev) => ({ ...prev, [field]: value }));
		setErrors((prev) => ({ ...prev, [field]: undefined }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			setErrors({});

			const dataToValidate: SimpleSubmitForm = {
				type: "simple",
				client: {
					phone: form.phone,
					email: form.email,
					telegram: form.messengerContact,
				},
				project: {
					base: form.topic,
					description: form.tasks,
				},
			};

			SimpleSubmitFormSchema.parse(dataToValidate);

			const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
			const response = await fetch(`${SERVER_URL}/forms/submit-text`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(dataToValidate),
			});

			if (!response.ok) {
				const error = await response.json().catch(() => ({}));
				throw new Error(error?.message || "Ошибка отправки формы");
			}

			toastMessageHandler({ message: "Форма успешно отправлена!", status: "success" });
			setForm({ topic: "", email: "", phone: "", messengerContact: "", tasks: "" });
			closeModal();
		} catch (err: any) {
			if (err?.issues) {
				const newErrors: {
					topic?: string;
					email?: string;
					phone?: string;
					messengerContact?: string;
					tasks?: string;
				} = {};
				err.issues.forEach((issue: any) => {
					const fieldKey = issue.path[1];
					if (fieldKey === "phone") newErrors.phone = issue.message;
					if (fieldKey === "email") newErrors.email = issue.message;
					if (fieldKey === "telegram") newErrors.messengerContact = issue.message;
					if (fieldKey === "base") newErrors.topic = issue.message;
					if (fieldKey === "description") newErrors.tasks = issue.message;
				});
				setErrors(newErrors);
			} else {
				toastMessageHandler(err);
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Container className={styles.sectionContainer}>
			<div className={styles.requestWrapper}>
				{/* Левая часть */}
				<div className={styles.left}>
					<h1>
						Начните управлять <br />
						бизнесом, <br /> <span>а не рутинными задачами</span>
					</h1>
				</div>

				<div className={styles.right}>
					<h1>
						Оставьте заявку, <br /> и мы свяжемся с вами!
					</h1>
					<p>
						Выясним ваши бизнес-задачи, определим, <br /> с чего начать, и ответим на все ваши
						вопросы
					</p>
					<div className={styles.buttons}>
						<Button className={styles.mainButton} onClick={openModal}>
							Оставить заявку
						</Button>
						<div className={styles.smallButtons}>
							<Button onClick={() => router.push("/contact")} className={styles.iconButton}>
								<MdPhoneInTalk />
							</Button>
							<Link href='https://t.me/emessage_advt'>
								<Button className={styles.iconButton}>
									<FaTelegramPlane />
								</Button>
							</Link>
								<Link href={MAX_LINK} target='_blank' rel='noopener noreferrer'>
									<Button className={styles.iconButton} aria-label='MAX'>
										<Image
											src='/ico/companies/max-mark.svg'
											width={20}
											height={20}
											alt='MAX'
											className={styles.maxIcon}
										/>
									</Button>
								</Link>
						</div>
					</div>
				</div>
			</div>

			<BaseModal isOpen={isModalOpen} onClose={closeModal}>
				<h2 className={styles.modalTitle}>
					Оставьте заявку, <br />и мы свяжемся с вами!
				</h2>
				<form className={styles.modalForm} onSubmit={handleSubmit}>
					<div className={styles.inputWrapper}>
						<label htmlFor='topic'>Тематика</label>
						<Input
							id='topic'
							type='text'
							placeholder='Введите тематику'
							value={form.topic}
							onChange={(e) => handleFieldChange("topic", e.target.value)}
							error={!!errors.topic}
							errorMessage={errors.topic}
						/>
					</div>

					<div className={styles.inputWrapper}>
						<label htmlFor='phone'>Ваш номер телефона</label>
						<div className={`${styles.inputPhoneWrapper} ${errors.phone ? styles.inputError : ""}`}>
							<IMaskInput
								mask='+{7} (000) 000 00-00'
								placeholder='+7 (000) 000 00-00'
								value={form.phone}
								onAccept={(value: string) => handleFieldChange("phone", value)}
								overwrite
								className={styles.inputPhoneInner}
							/>
						</div>
						{errors.phone && <div className={styles.errorText}>{errors.phone}</div>}
					</div>

					<div className={styles.inputWrapper}>
						<label htmlFor='email'>Email</label>
						<Input
							id='email'
							type='email'
							placeholder='your@email.com'
							value={form.email}
							onChange={(e) => handleFieldChange("email", e.target.value)}
							error={!!errors.email}
							errorMessage={errors.email}
						/>
					</div>

					<div className={styles.inputWrapper}>
						<label htmlFor='messengerContact'>Где с вами связаться?</label>
						<Input
							id='messengerContact'
							type='text'
							placeholder='Оставьте контакт удобного вам мессенджера'
							value={form.messengerContact}
							onChange={(e) => handleFieldChange("messengerContact", e.target.value)}
							error={!!errors.messengerContact}
							errorMessage={errors.messengerContact}
						/>
					</div>

					<div className={styles.inputWrapper}>
						<label htmlFor='tasks'>Задачи</label>
						<Input
							id='tasks'
							placeholder='Опишите задачи'
							value={form.tasks}
							onChange={(e) => handleFieldChange("tasks", e.target.value)}
							error={!!errors.tasks}
							errorMessage={errors.tasks}
						/>
					</div>

					<div className={styles.formFooter}>
						<Button type='submit' className={styles.submitButton} disabled={isSubmitting}>
							{isSubmitting ? <Loader color='#ffffff' /> : "Отправить"}
						</Button>
						<span className={styles.agreementText}>
							Нажимая на кнопку, Вы принимаете условия{" "}
							<span className={styles.agreementTextHyper}>пользовательского соглашения</span>
						</span>
					</div>
				</form>
			</BaseModal>
		</Container>
	);
};
