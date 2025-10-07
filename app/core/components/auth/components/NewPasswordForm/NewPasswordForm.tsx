"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./NewPasswordForm.module.scss";
import {
	NewPasswordSchema,
	ResetPasswordSchema,
	TypeNewPasswordSchema,
	TypeResetPasswordSchema,
} from "../../schemas";
import { AuthWrapper } from "..";
import { Button, Input, Loader } from "../../..";
import { openModal } from "../../../../store/slices/modalSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { useNewPasswordMutation } from "../../hooks";

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), { ssr: false });

export function NewPasswordForm() {
	const dispatch = useDispatch();

	const [recaptchaValue, setRecaptchaValue] = useState<string | null>();

	const form = useForm<TypeNewPasswordSchema>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			password: "",
		},
	});

	const { newPassword, isLoadingNew } = useNewPasswordMutation();

	const onSubmit = (values: TypeNewPasswordSchema) => {
		if (recaptchaValue) {
			newPassword({ values, recaptcha: recaptchaValue });
		} else {
			toast.error("Пройдите проверку reCAPTCHA!");
			return;
		}
	};

	return (
		<div className={styles.container}>
			<AuthWrapper heading='Новый пароль' variant='login'>
				<form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
					<div
						className={`${styles.formField} ${
							form.formState.errors.password ? styles.errorField : ""
						}`}>
						<label htmlFor='password'>Пароль</label>
						<Input
							disabled={isLoadingNew}
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

					<Button disabled={isLoadingNew} type='submit' className={styles.submitBtn}>
						{isLoadingNew ? <Loader /> : "Сбросить пароль"}
					</Button>
				</form>
			</AuthWrapper>
		</div>
	);
}
