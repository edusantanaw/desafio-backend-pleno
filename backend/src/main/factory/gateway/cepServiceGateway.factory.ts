import { CepGateway } from "../../../infra/gateway/cep.gateway";
import { CacheRepository } from "../../../infra/repositories/cache";
import { ApiCepService } from "../../../infra/service/apiCep.service";
import { ViaCepApiService } from "../../../infra/service/viaCep.service";

export function cepServiceGatewayFactory() {
  const viaCepService = new ViaCepApiService();
  const apiCepService = new ApiCepService();
  const cacheRepository = new CacheRepository();
  return new CepGateway(apiCepService, viaCepService, cacheRepository);
}
