import { Metadata } from "next";
import React from "react";
import { NewPasswordForm } from "../../core/components/auth/components";

export const metadata: Metadata = {
	title: "Новый пароль",
};

export default function NewPasswordPage() {
	return <NewPasswordForm />;
}
