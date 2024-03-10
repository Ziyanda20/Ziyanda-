import { NextFunction, Request, Response } from "express";

import Jwt from "./helpers/Jwt";

// Implement this properly
export const loadUserInfo = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.get("Authorization");

  if (!auth) return next();

  const tokenArr = auth.split(" ");

  if (tokenArr.length != 2) return next();

  const jwtPair = JSON.parse(decodeURIComponent(tokenArr[1]));

  Jwt.verify(jwtPair.jwtAccess, (userInfo: object, isExpired: boolean) => {
    if (!req["locals"]) req["locals"] = {};

    req["locals"].userInfo = userInfo;

    if (isExpired) {
      Jwt.verify_refresh(jwtPair.jwtRefresh, (userInfo) => {
        delete userInfo.iat;

        const tokens = Jwt.get_cookie_tokens(userInfo);

        req["locals"].userInfo = userInfo;
      });
    }
  });

  next();
};
