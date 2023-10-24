import express from "express";
import dotenv from "./config/dotenv";
import router from "./routes";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./config/swagger-file.json";

dotenv();

const PORT = process.env.PORT ?? 3000;

class Server {
  private app = express();

  private middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use("/api/v1", router());
    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  private start() {
    const cb = () => console.log(`Server running at ${PORT}`);
    this.app.listen(PORT, cb);
  }

  public async bootstrap() {
    this.middlewares();
    this.start();
  }
}

void new Server().bootstrap();
