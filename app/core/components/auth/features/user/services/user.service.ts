import { api } from "../../../api";
import { IUser } from "../../../api/types";
import { TypeSettingsSchema } from "../schemas";

class UserService {
	public async findProfile() {
		const response = await api.get<IUser>("users/profile");

		return response;
	}

	public async updateProfile(body: TypeSettingsSchema) {
		const response = await api.patch<IUser>("users/profile", body);

		return response;
	}
}
export const userService = new UserService();
