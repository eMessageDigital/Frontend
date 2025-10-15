import { type PropsWithChildren } from "react";
import Button from "../../../ui/Button/Button";
import Link from "next/link";
import { AuthSocial } from "../AuthSocial/AuthSocial";
import styles from "./AuthWrapper.module.scss";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../../store/slices/modalSlice";

interface AuthWrapperProps {
	heading: string;
	description?: string;
	backButtonLabel?: string;
	onBackButtonClick?: () => void;
	onClose?: () => void;
	isShowSocial?: boolean;
	variant?: "login" | "register";
}

export function AuthWrapper({
	children,
	heading,
	description,
	onBackButtonClick,
	backButtonLabel,
	onClose,
	isShowSocial = false,
	variant = "login",
}: PropsWithChildren<AuthWrapperProps>) {
	const dispatch = useDispatch();
	const heroStyle = variant === "register" ? styles.heroRegister : styles.heroLogin;
	const planeSrc =
		variant === "register" ? "/img/assets/planepurple.svg" : "/img/assets/planeblue.svg";
	return (
		<div>
			<div className={`${styles.hero} ${heroStyle}`}>
				<h1 className={styles.heroTitle}>{heading}</h1>
				<Image width={40} height={40} className={styles.heroPlane} src={planeSrc} alt='plane' />
				<button className={styles.closeBtn} onClick={() => dispatch(closeModal())}>
					✕
				</button>
			</div>
			<div>
				{isShowSocial && <AuthSocial />}
				{children}
			</div>
			<div className={styles.footer}>
				{backButtonLabel && onBackButtonClick && (
					<Button className={styles.btn} onClick={onBackButtonClick}>
						{backButtonLabel}
					</Button>
				)}
			</div>
		</div>
	);
}
