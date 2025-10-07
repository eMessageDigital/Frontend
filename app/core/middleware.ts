import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
	const { cookies, nextUrl } = request;
	const pathname = nextUrl.pathname;

	const session = cookies.get("session")?.value;

	// Если это страницы авторизации
	if (pathname.startsWith("/auth")) {
		if (session) {
			// Уже авторизован — редирект на dashboard
			return NextResponse.redirect(new URL("/dashboard/profile", nextUrl.origin));
		}
		return NextResponse.next();
	}

	// Если это защищённые страницы (например, /dashboard)
	if (pathname.startsWith("/dashboard")) {
		if (!session) {
			// Нет сессии — редирект на главную или страницу логина
			return NextResponse.redirect(new URL("/", nextUrl.origin));
		}
		return NextResponse.next();
	}

	// Для всех остальных страниц
	return NextResponse.next();
}

export const config = {
	matcher: ["/auth/:path*", "/dashboard/:path*"],
};
