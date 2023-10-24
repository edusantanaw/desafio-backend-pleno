import express from "express";
import dotenv from "./config/dotenv";
import router from "./routes";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc'; 
import * as swaggerDocument from './swagger-file.json';


dotenv();

const PORT = process.env.PORT ?? 3000;

class Server {
  private app = express(); 
  

  private middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  private start() {
    const cb = () => console.log(`Server running at ${PORT}`);
    this.app.listen(PORT, cb);
  }

  public async bootstrap() {
    this.middlewares();
    this.app.use("/api/v1", router()) 

  /*   const options = {
      swaggerDefinition: {
        openapi: '3.0.0',
        info: {
          title: 'Client backend',
          version: '1.0.0',
          description: 'My API with Swagger test client backend',
        },
      },
      apis: ['./routes/client.routes'],  
    };

    const swaggerSpec = swaggerJSDoc(options); */
  
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    this.start();
  }
}

void new Server().bootstrap();
