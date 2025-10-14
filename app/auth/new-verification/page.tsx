import type { Metadata } from "next";
import NewVerificationForm from "../../core/components/backend/components/NewVerificationForm/NewVerificationForm";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Подтверждение почты",
};

export default function Page() {
	return (
		<Suspense fallback={<div>Загрузка формы подтверждения...</div>}>
			<NewVerificationForm />
		</Suspense>
	);
}
