"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Booking.module.scss";
import { ChevronDown } from "lucide-react";

export default function Booking() {
	const [startDate, setStartDate] = useState<Date | null>(null);

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const minDate = today;

	const filterPassedTime = (time: Date) => {
		const currentDate = new Date();
		const selectedDate = startDate || currentDate;

		const isToday = selectedDate.setHours(0, 0, 0, 0) === currentDate.setHours(0, 0, 0, 0);

		if (isToday) {
			const minSelectable = new Date();
			minSelectable.setHours(currentDate.getHours() + 3, currentDate.getMinutes(), 0, 0);

			return time.getTime() >= minSelectable.getTime();
		}

		// если другой день → всё доступно
		return true;
	};

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
