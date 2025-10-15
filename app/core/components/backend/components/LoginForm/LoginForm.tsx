"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./LoginForm.module.scss";
import { LoginSchema, TypeLoginSchema } from "../../schemas";
import { AuthWrapper } from "..";
import { Button, Input, Loader } from "../../..";
import { closeModal, openModal } from "../../../../store/slices/modalSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { useLoginMutation } from "../../hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), { ssr: false });

export function LoginForm() {
	const dispatch = useDispatch();
	const router = useRouter();

	const [recaptchaValue, setRecaptchaValue] = useState<string | null>();

	const form = useForm<TypeLoginSchema>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { login, isLoadingLogin } = useLoginMutation();

	const onSubmit = (values: TypeLoginSchema) => {
		if (recaptchaValue) {
			login({ values, recaptcha: recaptchaValue });
		} else {
			toast.error("Пройдите проверку reCAPTCHA!");
			return;
		}
	};

	const handleForgotPasswordClick = () => {
		dispatch(closeModal());
		router.push("/auth/reset-password");
	};

	return (
		<AuthWrapper
			heading='Войти'
			onBackButtonClick={() => dispatch(openModal("register"))}
			backButtonLabel='Еще нет аккаунта? Регистрация'
			isShowSocial
			variant='login'>
			<form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
				<div
					className={`${styles.formField} ${form.formState.errors.email ? styles.errorField : ""}`}>
					<label htmlFor='email'>Email</label>
					<Input
						disabled={isLoadingLogin}
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
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<label>Пароль</label>
						<Link
							onClick={handleForgotPasswordClick}
							style={{ textDecoration: "underline", fontSize: "14px" }}
							href={"/auth/reset-password"}>
							Забыли пароль?
						</Link>
					</div>
					<Input
						disabled={isLoadingLogin}
						placeholder='********'
						id='password'
						type='password'
						{...form.register("password")}
					/>
					{form.formState.errors.password && (
						<p className={styles.error}>{form.formState.errors.password.message}</p>
					)}
				</div>

				{typeof window !== "undefined" && (
					<div style={{ display: "flex", justifyContent: "center" }}>
						<ReCAPTCHA
							sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY!}
							onChange={setRecaptchaValue}
						/>
					</div>
				)}

				<Button disabled={isLoadingLogin} type='submit' className={styles.submitBtn}>
					{isLoadingLogin ? <Loader color='#ffffff' /> : "Войти"}
				</Button>
			</form>
		</AuthWrapper>
	);
}
