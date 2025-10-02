import React from "react";
import styles from "./FileCard.module.scss";
import { ArrowUpRight, Paperclip } from "lucide-react";

export type FileCardProps = {
	name: string;
};

export default function FileCard({ name }: FileCardProps) {
	return (
		<div className={styles.fileCard}>
			<Paperclip className={styles.icon} size={16} />
			<p className={styles.text}>{name}</p>
			<ArrowUpRight className={styles.arrowIcon} />
		</div>
	);
}
