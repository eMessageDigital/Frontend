import { Metadata } from "next";
import { ResetPasswordForm } from "../../core/components/auth/components";

export const metadata: Metadata = {
	title: "Сброс пароля",
};

export default function ResetPasswordPage() {
	return <ResetPasswordForm />;
}
