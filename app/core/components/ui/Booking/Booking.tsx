"use client";

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Booking.module.scss";
import { ChevronDown } from "lucide-react";

interface BookingProps {
	onChange: (dateTime: string) => void;
}

export default function Booking({ onChange }: BookingProps) {
	const [startDate, setStartDate] = useState<Date | null>(null);

	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const minDate = today;

	const filterPassedTime = (time: Date) => {
		const now = new Date();
		const selected = startDate ? new Date(startDate) : new Date();
		selected.setHours(0, 0, 0, 0);

		if (selected.getTime() === today.getTime()) {
			const minSelectable = new Date();
			minSelectable.setHours(now.getHours() + 3, 0, 0, 0);
			return time.getTime() >= minSelectable.getTime();
		}
		return true;
	};

	useEffect(() => {
		if (startDate) {
			// Переводим в московское время (UTC+3)
			const moscowTime = new Date(startDate.getTime() + 3 * 60 * 60 * 1000);

			const day = String(moscowTime.getUTCDate()).padStart(2, "0");
			const month = String(moscowTime.getUTCMonth() + 1).padStart(2, "0");
			const year = moscowTime.getUTCFullYear();

			const hours = String(moscowTime.getUTCHours()).padStart(2, "0");
			const minutes = String(moscowTime.getUTCMinutes()).padStart(2, "0");

			const formatted = `${day}.${month}.${year} ${hours}:${minutes}`;
			onChange(formatted);
		} else {
			onChange("");
		}
	}, [startDate, onChange]);

	return (
		<div className={styles.bookingWrapper}>
			<div className={styles.dateInputWrapper}>
				<DatePicker
					className={styles.dateInput}
					wrapperClassName={styles.fullWidthWrapper}
					selected={startDate}
					onChange={(date) => setStartDate(date)}
					showTimeSelect
					timeFormat='HH:mm'
					timeIntervals={30}
					dateFormat='dd.MM.yyyy HH:mm'
					minDate={minDate}
					filterTime={filterPassedTime}
					placeholderText='Желаемое время запуска'
				/>
				<ChevronDown size={18} className={styles.icon} />
			</div>
		</div>
	);
}
