import { AtpSessionData } from "@atproto/api";
import { jwtDecode } from "jwt-decode";

export const isSessionExpired = (session: AtpSessionData) => {
  try {
    if (session.accessJwt) {
      const decoded = jwtDecode(session.accessJwt);
      if (decoded.exp) {
        const didExpire = Date.now() >= decoded.exp * 1000;
        return didExpire;
      }
    }
  } catch (e) {
    throw new Error("Could not decode JWT");
  }
  return true;
};
