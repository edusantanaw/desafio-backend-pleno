import { Request, Response } from "express";
import { ServerError } from "../../presentational/helpers/httpStatus.helper";

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
      console.log(error);
      const { statusCode, body } = ServerError();
      return res.status(statusCode).json(body);
    }
  };
};
