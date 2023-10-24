import axios from "axios";

const VIA_CEP_URL = "https://viacep.com.br/ws";
const API_CEP_URL = "https://cdn.apicep.com/file/apicep/";

export const ViaCepApi = axios.create({
  baseURL: VIA_CEP_URL,
});

export const ApiCepApi = axios.create({
  baseURL: API_CEP_URL,
});
