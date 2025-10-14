import { Metadata } from "next";
import { ResetPasswordForm } from "../../core/components/backend/components";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Сброс пароля",
};

export default function ResetPasswordPage() {
	return (
		<Suspense fallback={<div>Загрузка формы восстановления...</div>}>
			<ResetPasswordForm />
		</Suspense>
	);
}
