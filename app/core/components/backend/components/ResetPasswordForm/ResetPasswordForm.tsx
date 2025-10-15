"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./ResetPasswordForm.module.scss";
import { ResetPasswordSchema, TypeResetPasswordSchema } from "../../schemas";
import { AuthWrapper } from "..";
import { Button, Input, Loader } from "../../..";
import { openModal } from "../../../../store/slices/modalSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { useResetPasswordMutation } from "../../hooks";

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), { ssr: false });

export function ResetPasswordForm() {
	const dispatch = useDispatch();

	const [recaptchaValue, setRecaptchaValue] = useState<string | null>();

	const form = useForm<TypeResetPasswordSchema>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	const { reset, isLoadingReset } = useResetPasswordMutation();

	const onSubmit = (values: TypeResetPasswordSchema) => {
		if (recaptchaValue) {
			reset({ values, recaptcha: recaptchaValue });
		} else {
			toast.error("Пройдите проверку reCAPTCHA!");
			return;
		}
	};

	return (
		<div className={styles.container}>
			<AuthWrapper
				heading='Сброс пароля'
				onBackButtonClick={() => dispatch(openModal("login"))}
				backButtonLabel='Войти в аккаунт'
				variant='login'>
				<form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
					<div
						className={`${styles.formField} ${
							form.formState.errors.email ? styles.errorField : ""
						}`}>
						<label htmlFor='email'>Email</label>
						<Input
							disabled={isLoadingReset}
							placeholder='ivan@example.com'
							id='email'
							type='email'
							{...form.register("email")}
						/>
						{form.formState.errors.email && (
							<p className={styles.error}>{form.formState.errors.email.message}</p>
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

					<Button disabled={isLoadingReset} type='submit' className={styles.submitBtn}>
						{isLoadingReset ? <Loader color='#ffffff' /> : "Сбросить пароль"}
					</Button>
				</form>
			</AuthWrapper>
		</div>
	);
}
