import { api } from "../../../api";
import { TypeSubmitForm } from "../schemas/submitForm.schema";

class FormService {
	public async submitForm(body: TypeSubmitForm) {
		return api.post("/forms/submit", body);
	}
}

export const formService = new FormService();
