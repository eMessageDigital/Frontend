import type { Metadata } from "next";
import NewVerificationForm from "../../core/components/auth/components/NewVerificationForm/NewVerificationForm";

export const metadata: Metadata = {
	title: "Подтверждение почты",
};

export default function Page() {
	return <NewVerificationForm />;
}
