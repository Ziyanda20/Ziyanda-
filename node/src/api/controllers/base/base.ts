import { Request, Response } from "express";
import { IAny, IResponse } from "../../../interfaces";

export default class BaseController {
  constructor(private resWrap: (c: Function, r: Response) => void) {
    this.resWrap = resWrap;
  }

  wrap =
    (serviceMethod: (b: IAny) => Promise<IResponse> | IResponse) =>
    (req: Request, res: Response) => {
      this.resWrap(async (response: IResponse) => {
        return await serviceMethod.call(response, req.body);
      }, res);
    };

  wrapWithUser =
    (serviceMethod: (b: IAny, u: IAny) => Promise<IResponse> | IResponse) =>
    (req: any, res: Response) => {
      this.resWrap(async (response: IResponse) => {
        return await serviceMethod.call(
          response,
          req.body,
          req["locals"]?.userInfo
        );
      }, res);
    };

  // wrap_with_request = (service_method: (r: IResponse, b: IAny, rq: Request) => Promise<IResponse> | IResponse) => (req: Request, res: Response) => {
  //     this.resWrap(async (response: IResponse) => {
  //         return await service_method(response, req.body, req)
  //     }, res)
  // }
}
