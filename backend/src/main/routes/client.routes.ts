import { Router } from "express";
import expressAdapter from "../adapter/express.adapter";
import { createClientControllerFactory } from "../factory/controller/createClient.factory";
import { loadClientWithPaginationController } from "../factory/controller/loadClientWithPagination.factory";
import { deleteClientControllerFactory } from "../factory/controller/deleteClient.factory";
import { loadClientByIdControllerFactory } from "../factory/controller/loadClientById.factory";

export default (router: Router) => {
  
  /**
 * @swagger
 * /clients:
 *   post:
 *     summary: Cria um novo cliente
 *     description: Crie um novo cliente com os detalhes fornecidos.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: client
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             phone:
 *               type: string
 *             cep:
 *               type: string
 *     responses:
 *       200:
 *         description: Cliente criado com sucesso
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             phone:
 *               type: string
 *             address:
 *               type: object
 *               properties:
 *                 cep:
 *                   type: string
 *                 street:
 *                   type: string
 *                 neighborhood:
 *                   type: string
 *                 city:
 *                   type: string
 *                 state:
 *                   type: string
 */
  router.post("/clients", expressAdapter(createClientControllerFactory()));
  router.get("/clients", expressAdapter(loadClientWithPaginationController()));
  router.delete("/clients/:id", expressAdapter(deleteClientControllerFactory()));
  router.get(
    "/clients/:id",
    expressAdapter(loadClientByIdControllerFactory())
  );
};
