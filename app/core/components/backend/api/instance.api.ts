import { FetchClient } from "./fetch-client";

export const api = new FetchClient({
	baseUrl:
		(process.env.NEXT_PUBLIC_SERVER_URL as string) ||
		(process.env.SERVER_URL as string),
	options: {
		credentials: "include",
	},
});
