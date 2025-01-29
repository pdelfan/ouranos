import { IronSession } from "iron-session";

export interface CookieSession extends IronSession<object> {
  did: string;
}
