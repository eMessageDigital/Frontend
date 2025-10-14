import React from "react";
import styles from "../../modules/Profile/Profile.module.scss";
import { PenLine, Trash } from "lucide-react";
import { IContractor } from "../../backend/features/user/services";

interface ContractorCardProps {
	contractor: IContractor;
	onDelete: () => void;
}

export const ContractorCard: React.FC<ContractorCardProps> = ({ contractor, onDelete }) => {
	return (
		<div className={styles.contractorCard}>
			<div className={styles.contractorCardHeader}>
				<h3>
					{contractor.name} <PenLine className={styles.iconBtnSecondary} />
				</h3>
				<Trash className={styles.iconBtn} onClick={onDelete} />
			</div>
			<div className={styles.contractorCardText}>
				<p>
					ИНН: <span>{contractor.inn}</span>
				</p>
				<p>
					КПП: <span>{contractor.kpp}</span>
				</p>
				<p>
					ОГРН(ОГРНИП): <span>{contractor.ogrn}</span>
				</p>
			</div>
		</div>
	);
};
