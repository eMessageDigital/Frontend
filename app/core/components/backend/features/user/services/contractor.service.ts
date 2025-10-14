import { api } from "../../../api";

export interface IContractor {
	id: string;
	name: string;
	inn: string;
	kpp?: string;
	ogrn?: string;
}

class ContractorService {
	public async getContractors() {
		const response = await api.get<IContractor[]>("contractors");
		return response;
	}

	public async createContractor(body: Partial<IContractor>) {
		const response = await api.post<IContractor>("contractors", body);
		return response;
	}

	public async updateContractor(id: string, body: Partial<IContractor>) {
		const response = await api.patch<IContractor>(`contractors/${id}`, body);
		return response;
	}

	public async deleteContractor(id: string) {
		const response = await api.delete<{ id: string }>(`contractors/${id}`);
		return response;
	}
}

export const contractorService = new ContractorService();
