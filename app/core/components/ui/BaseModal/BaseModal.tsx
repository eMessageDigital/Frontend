"use client";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./BaseModal.module.scss";

interface BaseModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	showCloseBtn?: boolean;
}

const BaseModal: React.FC<BaseModalProps> = ({
	isOpen,
	onClose,
	children,
	showCloseBtn = true,
}) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!isOpen || !mounted) return null;

	const modalRoot = document.getElementById("modal-root-notes");
	if (!modalRoot) return null;

	return ReactDOM.createPortal(
		<div className={styles.overlay} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				{showCloseBtn && (
					<button className={styles.closeBtn} onClick={onClose}>
						✕
					</button>
				)}
				{children}
			</div>
		</div>,
		modalRoot
	);
};

export default BaseModal;
