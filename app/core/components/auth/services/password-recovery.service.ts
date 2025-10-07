import { api } from "../api";
import { IUser } from "../api/types";
import { TypeNewPasswordSchema, TypeResetPasswordSchema } from "../schemas";

class PasswordRecoveryService {
	public async reset(body: TypeResetPasswordSchema, recaptcha?: string) {
		const headers = recaptcha ? { recaptcha } : undefined;

		const response = await api.post<IUser>("auth/password-recovery/reset-password", body, {
			headers,
		});

		return response;
	}

	public async newpass(body: TypeNewPasswordSchema, token: string | null, recaptcha?: string) {
		const headers = recaptcha ? { recaptcha } : undefined;

		const response = await api.post<IUser>(`auth/password-recovery/new-password/${token}`, body, {
			headers,
		});

		return response;
	}
}

export const passwordRecoveryService = new PasswordRecoveryService();
