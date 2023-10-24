import { ApiCepApi } from "../../utils/apis/cep";

export type ApiCepReponse = {
  status: string;
  code: string;
  state: string;
  city: string;
  district: string;
  address: string;
};

export interface IApiCepService {
  loadByCep: (cep: string) => Promise<ApiCepReponse | null>;
}

export class ApiCepService implements IApiCepService {
  public async loadByCep(cep: string): Promise<ApiCepReponse | null> {
    try {
      const response = await ApiCepApi.get(`${cep}.json`);
      return response.data;
    } catch (error) {
      return null;
    }
  }
}
