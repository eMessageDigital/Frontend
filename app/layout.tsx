import type { Metadata } from "next";
import { Footer, Header } from "../app/core/components";
import "./core/styles/globals.scss";
import { ReduxProvider } from "./core/store/Providers";
import { AuthModal } from "./core/components/backend/components/AuthModal/AuthModal";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "./core/Providers/ReactQueryProvider";

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
				<ReactQueryProvider>
					<ReduxProvider>
						<Header />
						{children}
						<Footer />
						<AuthModal />
						<Toaster position='bottom-right' richColors duration={4000} />
					</ReduxProvider>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
