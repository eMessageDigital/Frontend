"use client";

import { FaGoogle, FaYandex } from "react-icons/fa";
import Button from "../../../ui/Button/Button";
import styles from "./AuthSocial.module.scss";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services";

export function AuthSocial() {
	const router = useRouter();

	const { mutateAsync } = useMutation({
		mutationKey: ["oauth by provider"],
		mutationFn: async (provider: "google" | "yandex") =>
			await authService.oauthByProvider(provider),
	});

	const onClick = async (provider: "google" | "yandex") => {
		const response = await mutateAsync(provider);

		if (response) {
			router.push(response.url);
		}
	};

	return (
		<div className={styles.authSocial}>
			<div className={styles.socialGrid}>
				<Button onClick={() => onClick("google")} className={styles.btn}>
					<FaGoogle className={styles.icon} />
					Google
				</Button>
				<Button onClick={() => onClick("yandex")} className={styles.btn}>
					<FaYandex className={styles.icon} />
					Yandex
				</Button>
			</div>

			<div className={styles.divider}>
				<div className={styles.lineWrapper}>
					<span className={styles.line}></span>
				</div>
				<div className={styles.orText}>
					<span>Или</span>
				</div>
			</div>
		</div>
	);
}
