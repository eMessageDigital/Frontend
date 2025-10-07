import { Metadata } from "next";
import React, { Suspense } from "react";
import { NewPasswordForm } from "../../core/components/auth/components";

export const metadata: Metadata = {
	title: "Новый пароль",
};

export default function NewPasswordPage() {
	return (
		<Suspense fallback={<div>Загрузка формы нового пароля...</div>}>
			<NewPasswordForm />
		</Suspense>
	);
}
