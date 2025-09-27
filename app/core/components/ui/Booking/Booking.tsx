"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Booking.module.scss";

export default function Booking() {
	const [startDate, setStartDate] = useState<Date | null>(null);

	const minDate = new Date(Date.now() + 3 * 60 * 60 * 1000);

	return (
		<div className={styles.bookingWrapper}>
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
				minTime={minDate}
				maxTime={new Date(new Date().setHours(23, 59, 59))}
				placeholderText='Выберите дату и время'
			/>
		</div>
	);
}
