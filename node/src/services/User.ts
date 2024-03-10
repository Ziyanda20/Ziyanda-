import v from "../helpers/Validation";
import hasher from "../helpers/Hasher";
import jwt from "../helpers/Jwt";

import { IAny, IResponse } from "../interfaces";

export function saveSession(user: any) {
  const tokens = jwt.get_cookie_tokens(user);

  // pharma ression
  this.set_cookie("_pharma_sesh", JSON.stringify(tokens));
}

export function removePassword(user: any) {
  delete user.password;

  return user;
}


async function getUserSession(_, user: IAny): Promise<IResponse> {
  this.user = user;

  return this;
}

export default { getUserSession };
