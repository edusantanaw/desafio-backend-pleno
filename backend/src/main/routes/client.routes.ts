import { Router } from "express";
import expressAdapter from "../adapter/express.adapter";
import { createClientControllerFactory } from "../factory/controller/createClient.factory";
import { loadClientWithPaginationController } from "../factory/controller/loadClientWithPagination.factory";
import { deleteClientControllerFactory } from "../factory/controller/deleteClient.factory";
import { loadClientByIdControllerFactory } from "../factory/controller/loadClientById.factory";

export default (router: Router) => {
  router.post("/clients", expressAdapter(createClientControllerFactory()));
  router.get("/clients", expressAdapter(loadClientWithPaginationController()));
  router.delete("/clients/:id", expressAdapter(deleteClientControllerFactory()));
  router.get(
    "/clients/:id",
    expressAdapter(loadClientByIdControllerFactory())
  );
};
