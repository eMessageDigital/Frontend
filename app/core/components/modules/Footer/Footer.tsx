"use client";
import React from "react";
import styles from "./Footer.module.scss";
import Content from "./ui/Content";

export function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.sticky}>
					<Content />
				</div>
			</div>
		</footer>
	);
}
