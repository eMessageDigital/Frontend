"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
	interface Window {
		ym?: (...args: any[]) => void;
	}
}

const YM_ID = process.env.NEXT_PUBLIC_YM_ID;

const getPageUrl = (pathname: string, searchParams: URLSearchParams | null) => {
	if (!searchParams) return pathname;
	const query = searchParams.toString();
	return query ? `${pathname}?${query}` : pathname;
};

export default function YandexMetrica() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (!YM_ID || typeof window === "undefined" || !window.ym) return;
		window.ym(Number(YM_ID), "hit", getPageUrl(pathname, searchParams));
	}, [pathname, searchParams]);

	if (!YM_ID) return null;

	return (
		<>
			<Script id='yandex-metrica' strategy='afterInteractive'>
				{`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"); ym(${YM_ID}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });`}
			</Script>
			<noscript>
				<div>
					<img
						src={`https://mc.yandex.ru/watch/${YM_ID}`}
						style={{ position: "absolute", left: "-9999px" }}
						alt=''
					/>
				</div>
			</noscript>
		</>
	);
}
