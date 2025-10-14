"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./RegisterForm.module.scss";
import { RegisterSchema, TypeRegisterSchema } from "../../schemas";
import { AuthWrapper } from "..";
import { Button, Input, Loader } from "../../..";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../store/slices/modalSlice";
import { useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { useRegisterMutation } from "../../hooks";

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), { ssr: false });

export function RegisterForm() {
	const dispatch = useDispatch();

	const [recaptchaValue, setRecaptchaValue] = useState<string | null>();

	const form = useForm<TypeRegisterSchema>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			passwordRepeat: "",
		},
	});

	const { register, isLoadingRegister } = useRegisterMutation();

	const onSubmit = (values: TypeRegisterSchema) => {
		if (recaptchaValue) {
			register({ values, recaptcha: recaptchaValue });
		} else {
			toast.error("Пройдите проверку reCAPTCHA!");
			return;
		}
	};

	return (
		<AuthWrapper
			heading='Регистрация'
			description='Чтобы войти в личный кабинет необходимо зарегистрироваться'
			onBackButtonClick={() => dispatch(openModal("login"))}
			backButtonLabel='Уже есть аккаунт? Войти'
			isShowSocial
			variant='register'>
			<form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
				<div
					className={`${styles.formField} ${form.formState.errors.name ? styles.errorField : ""}`}>
					<label className={styles.label} htmlFor='name'>
						Имя
					</label>
					<Input
						disabled={isLoadingRegister}
						className={styles.inputField}
						placeholder='Иван'
						id='name'
						type='text'
						{...form.register("name")}
					/>
					{form.formState.errors.name && (
						<p className={styles.error}>{form.formState.errors.name.message}</p>
					)}
				</div>

				<div
					className={`${styles.formField} ${form.formState.errors.email ? styles.errorField : ""}`}>
					<label className={styles.label} htmlFor='email'>
						Email
					</label>
					<Input
						disabled={isLoadingRegister}
						className={styles.inputField}
						placeholder='ivan@example.com'
						id='email'
						type='email'
						{...form.register("email")}
					/>
					{form.formState.errors.email && (
						<p className={styles.error}>{form.formState.errors.email.message}</p>
					)}
				</div>

				<div
					className={`${styles.formField} ${
						form.formState.errors.password ? styles.errorField : ""
					}`}>
					<label className={styles.label} htmlFor='password'>
						Пароль
					</label>
					<Input
						disabled={isLoadingRegister}
						className={styles.inputField}
						placeholder='********'
						id='password'
						type='password'
						{...form.register("password")}
					/>
					{form.formState.errors.password && (
						<p className={styles.error}>{form.formState.errors.password.message}</p>
					)}
				</div>

				<div
					className={`${styles.formField} ${
						form.formState.errors.passwordRepeat ? styles.errorField : ""
					}`}>
					<label className={styles.label} htmlFor='passwordRepeat'>
						Подтверждение пароля
					</label>
					<Input
						disabled={isLoadingRegister}
						className={styles.inputField}
						placeholder='********'
						id='passwordRepeat'
						type='password'
						{...form.register("passwordRepeat")}
					/>
					{form.formState.errors.passwordRepeat && (
						<p className={styles.error}>{form.formState.errors.passwordRepeat.message}</p>
					)}
				</div>

				<ReCAPTCHA
					style={{ display: "flex", justifyContent: "center" }}
					sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY!}
					onChange={setRecaptchaValue}
				/>

				<Button type='submit' className={styles.submitBtn} disabled={isLoadingRegister}>
					{isLoadingRegister ? <Loader /> : "Зарегестрироваться"}
				</Button>
			</form>
		</AuthWrapper>
	);
}
