import { Router } from "express";
import clientRoutes from "./client.routes";

const router = Router();
export default () => {
  clientRoutes(router);
  return router;
};
