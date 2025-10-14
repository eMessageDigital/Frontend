"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useVerificationMutation } from "../../hooks";
import { AuthWrapper } from "../AuthWrapperModal/AuthWrapper";
import Loader from "../../../ui/Loader/Loader";
import styles from "./NewVerificationForm.module.scss";

export default function NewVerificationForm() {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const { verification } = useVerificationMutation();

	useEffect(() => {
		verification(token);
	}, [token]);

	return (
		<div
			style={{
				maxWidth: "500px",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				textAlign: "center",
				margin: "0 auto",
			}}>
			<AuthWrapper heading='Подтверждение почты'>
				<Loader center color='#53bbff' />
			</AuthWrapper>
		</div>
	);
}
