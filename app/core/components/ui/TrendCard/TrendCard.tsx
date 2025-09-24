"use client";

import React, { useRef, useState, useEffect } from "react";
import {
	LineChart,
	Line,
	AreaChart,
	Area,
	ResponsiveContainer,
	CartesianGrid,
	XAxis,
	YAxis,
	ReferenceLine,
} from "recharts";
import { motion, useInView } from "framer-motion";
import styles from "./TrendCard.module.scss";

export interface TrendCardProps {
	title: string;
	number: string;
	stats?: string;
	description: string;
	data: { value: number }[];
	strokeColor?: string; // цвет линии
	gradientColor?: string; // цвет градиента (начальный)
}

const TrendCard: React.FC<TrendCardProps> = ({
	title,
	number,
	description,
	stats,
	data,
	strokeColor = "#00B055",
	gradientColor = "#A6F4C5", // светлый зеленый для градиента
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const inView = useInView(containerRef, { once: true });
	const [pathLength, setPathLength] = useState(0);

	useEffect(() => {
		if (inView) {
			const timer = setTimeout(() => {
				const path = containerRef.current?.querySelector("path");
				if (path) {
					setPathLength((path as SVGPathElement).getTotalLength());
				}
			}, 50);
			return () => clearTimeout(timer);
		}
	}, [inView, data]);

	return (
		<motion.div
			ref={containerRef}
			className={styles.innerCard}
			whileHover={{ scale: 1.02 }}
			initial={{ opacity: 0, y: 20 }}
			animate={inView ? { opacity: 1, y: 0 } : {}}
			transition={{ type: "spring", stiffness: 200, damping: 20 }}>
			<p>{title}</p>
			<h1>{number}</h1>
			<div className={styles.descContainer}>
				{stats && <p className={styles.stats}>{stats}</p>}
				<p>{description}</p>
			</div>
			<div className={styles.chartWrapper}>
				{inView && (
					<ResponsiveContainer className={styles.responsiveChart} width='100%' height='100%'>
						<AreaChart data={data.length ? data : [{ value: 0 }, { value: 0 }]}>
							<defs>
								<linearGradient id='gradient' x1='0' y1='0' x2='0' y2='1'>
									<stop offset='0%' stopColor={strokeColor} stopOpacity={0.6} />
									<stop offset='50%' stopColor={strokeColor} stopOpacity={0.3} />
									<stop offset='100%' stopColor={gradientColor} stopOpacity={0} />
								</linearGradient>
							</defs>

							{data.map((entry, index) => (
								<ReferenceLine
									key={index}
									x={index} // для категориальной оси индекс = точка
									stroke='#cccccc'
									strokeDasharray='8 8'
									ifOverflow='extendDomain'
								/>
							))}

							{/* линия сверху */}
							<Line
								type='linear'
								dataKey='value'
								stroke={strokeColor}
								strokeWidth={3}
								dot={false}
								isAnimationActive={true}
								strokeDasharray={pathLength}
								strokeDashoffset={pathLength}
							/>

							{/* градиент под линией */}
							<Area type='linear' dataKey='value' stroke='none' fill='url(#gradient)' />
						</AreaChart>
					</ResponsiveContainer>
				)}
			</div>
		</motion.div>
	);
};

export default TrendCard;
