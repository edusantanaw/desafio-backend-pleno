## ROTEAMENTO
O modelo de rotas seguem o seguinte padrão '/api/{model}' ou '/api/{model}/:id'\
Exemplo:
```ts
  router.post("/clients", expressAdapter(createClientControllerFactory()));
  router.get("/clients", expressAdapter(loadClientWithPaginationController()));
  router.delete("/clients/:id", expressAdapter(deleteClientControllerFactory()));
  router.get(
    "/clients/:id",
    expressAdapter(loadClientByIdControllerFactory())
  );
```

## Padrões de projetos
Foi utilizado como principal padrão de projetos o Adapter e o Factory:
* Adapter: O adapter busca desacoplar a nossa aplicação do framework utilizado, facilitando a mudança do mesmo.
```ts
export default (controller: IController<any>) => {
  return async (req: Request, res: Response) => {
    try {
      const { statusCode, body } = await controller.handle({
        ...req.body,
        ...req.params,
        ...req.query,
      });
      return res.status(statusCode).json(body);
    } catch (error) {
      const { statusCode, body } = ServerError();
      return res.status(statusCode).json(body);
    }
  };
};
```
* Factory: O factory é utilizado para facilitar a criação das nossas clasess.
```ts
export function authUsecaseFactory() {
  const userRepository = new UserRepository();
  const encrypter = new Encrypter();
  const jwtService = new JwtService();
  return new AuthUsecase(userRepository, encrypter, jwtService);
}
```

### Como posso executar o projeto?
* Utilizando o Docker:
```sh
docker-compose up
```
