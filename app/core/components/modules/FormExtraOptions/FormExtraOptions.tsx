"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import styles from "../Form/Form.module.scss";

export interface ExtraService {
	id: string;
	name: string;
	dependsOn?: string;
}

interface Props {
	extraServices: ExtraService[];
	selectedServices: string[];
	toggleService: (id: string) => void;
}

export function FormExtraOptions({ extraServices, selectedServices, toggleService }: Props) {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
				setDropdownOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className={styles.section}>
			<h2 className={styles.sectionTitle}>Дополнительные услуги</h2>
			<div className={styles.extraService} ref={wrapperRef}>
				<div className={styles.selectBox} onClick={() => setDropdownOpen(!dropdownOpen)}>
					{selectedServices.length > 0
						? selectedServices.map((id) => extraServices.find((s) => s.id === id)?.name).join(", ")
						: "Выберите услуги"}
					<span className={styles.icon}>
						{dropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
					</span>
				</div>

				{dropdownOpen && (
					<div className={styles.dropdownList}>
						{extraServices.map((service) => {
							const isDisabled =
								!!service.dependsOn && !selectedServices.includes(service.dependsOn);

							return (
								<label
									key={service.id}
									className={styles.checkboxLabel}
									style={{
										opacity: isDisabled ? 0.5 : 1,
										pointerEvents: isDisabled ? "none" : "auto",
									}}>
									<input
										type='checkbox'
										checked={selectedServices.includes(service.id)}
										onChange={() => toggleService(service.id)}
										disabled={isDisabled}
									/>
									{service.name}
								</label>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
