import type { Metadata } from "next";
import { Footer, Header } from "../app/core/components";
import "./core/styles/globals.scss";
import { ReduxProvider } from "./core/store/Providers";
import { AuthModal } from "./core/components/backend/components/AuthModal/AuthModal";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "./core/Providers/ReactQueryProvider";
import YandexMetrica from "./core/components/analytics/YandexMetrica";

export const metadata: Metadata = {
	title: "eMessage - Главная",
	description: "Сервис по продвижению в социальных сетях",
	manifest: "/favicon/site.webmanifest",
	icons: {
		icon: [
			{ url: "/favicon/favicon.ico" },
			{ url: "/favicon/favicon.svg", type: "image/svg+xml" },
			{ url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
		],
		apple: [
			{
				url: "/favicon/apple-touch-icon.png",
				sizes: "180x180",
				type: "image/png",
			},
		],
	},
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
						<main className='page-content'>{children}</main>
						<Footer />
						<AuthModal />
						<Toaster position='bottom-right' richColors duration={4000} />
						<YandexMetrica />
					</ReduxProvider>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
