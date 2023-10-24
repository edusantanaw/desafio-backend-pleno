import { ViaCepApi } from "../../utils/apis/cep";

export type ViaCepReponse = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

export interface IViaCepApiService {
  loadByCep: (cep: string) => Promise<ViaCepReponse | null>;
}

export class ViaCepApiService implements IViaCepApiService {
  public async loadByCep(cep: string): Promise<ViaCepReponse | null> {
    try {
      const response = await ViaCepApi.get<ViaCepReponse>(`/${cep}/json`);
      return response.data;
    } catch (error) {
      return null;
    }
  }
}
