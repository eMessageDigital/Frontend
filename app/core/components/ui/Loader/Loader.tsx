"use client";

import React from "react";
import styled from "styled-components";

interface LoaderProps {
	color?: string;
	size?: string;
	center?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ color = "#53bbff", size = "3.25em", center = false }) => {
	return (
		<StyledWrapper $color={color} $size={size} $center={center}>
			<svg viewBox='0 0 100 100' width='100' height='100'>
				<circle
					cx='50'
					cy='50'
					r='20'
					fill='none'
					stroke={color}
					strokeWidth='4'
					strokeLinecap='round'
				/>
			</svg>
		</StyledWrapper>
	);
};

const StyledWrapper = styled.div<{ $color: string; $size: string; $center: boolean }>`
	display: ${({ $center }) => ($center ? "flex" : "inline-flex")};
	align-items: ${({ $center }) => ($center ? "center" : "unset")};
	justify-content: ${({ $center }) => ($center ? "center" : "unset")};
	min-height: ${({ $center }) => ($center ? "50px" : "auto")};

	svg {
		width: ${({ $size }) => $size};
		height: ${({ $size }) => $size};
		transform-origin: center;
		animation: rotate 2s linear infinite;
	}

	circle {
		stroke-dasharray: 1, 200;
		stroke-dashoffset: 0;
		animation: dash 1.5s ease-in-out infinite;
	}

	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes dash {
		0% {
			stroke-dasharray: 1, 200;
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dasharray: 90, 200;
			stroke-dashoffset: -35px;
		}
		100% {
			stroke-dashoffset: -125px;
		}
	}
`;

export default Loader;
