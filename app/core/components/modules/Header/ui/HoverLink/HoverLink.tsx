import Link from "next/link";
import styles from "./HoverLink.module.scss";

interface HoverLinkProps {
	href: string;
	children: string;
	onClick?: () => void;
}

export const HoverLink = ({ href, children, onClick }: HoverLinkProps) => {
	const letters = children.split("");

	return (
		<Link onClick={onClick} href={href} className={styles.hoverLink}>
			<span className={styles.textOriginal}>
				{letters.map((char, idx) => (
					<span key={idx} style={{ transitionDelay: `${idx * 50}ms` }}>
						{char}
					</span>
				))}
			</span>
			<span className={styles.textHover}>
				{letters.map((char, idx) => (
					<span key={idx} style={{ transitionDelay: `${idx * 50}ms` }}>
						{char}
					</span>
				))}
			</span>
		</Link>
	);
};
