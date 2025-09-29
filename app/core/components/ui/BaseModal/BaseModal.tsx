"use client";

import React from "react";
import ReactDOM from "react-dom";
import styles from "./BaseModal.module.scss";

interface BaseModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	const modalRoot = document.getElementById("modal-root-notes");
	if (!modalRoot) return null;

	return ReactDOM.createPortal(
		<div className={styles.overlay} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<button className={styles.closeBtn} onClick={onClose}>
					✕
				</button>
				{children}
			</div>
		</div>,
		modalRoot
	);
};

export default BaseModal;
