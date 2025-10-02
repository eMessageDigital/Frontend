import type { Metadata } from "next";
import { Footer, Header, Modal } from "../app/core/components";
import "./core/styles/globals.scss";
import { ReduxProvider } from "./core/store/Providers";

export const metadata: Metadata = {
	title: "eMessage - Главная",
	description: "Сервис по продвижению в социальных сетях",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>
				<div id='modal-root-auth'></div>
				<div id='modal-root-notes'></div>
				<ReduxProvider>
					<Header />
					{children}
					<Modal />
					<Footer />
				</ReduxProvider>
			</body>
		</html>
	);
}
