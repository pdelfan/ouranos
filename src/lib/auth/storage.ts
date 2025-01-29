import {
  NodeSavedSession,
  NodeSavedSessionStore,
  NodeSavedState,
  NodeSavedStateStore,
} from "@atproto/oauth-client-node";
import { eq } from "drizzle-orm";
import { db as database } from "./db";
import * as schema from "@/lib/auth/db/schema";

export class StateStore implements NodeSavedStateStore {
  constructor(private db: typeof database) {}

  async get(key: string): Promise<NodeSavedState | undefined> {
    const result = await this.db.query.BskyAuthState.findFirst({
      where: eq(schema.BskyAuthState.key, key),
    });

    if (!result) return;
    return result.state as NodeSavedState;
  }

  async set(key: string, val: NodeSavedState) {
    const state = JSON.stringify(val);
    await this.db
      .insert(schema.BskyAuthState)
      .values({ key, state })
      .onConflictDoUpdate({
        target: schema.BskyAuthState.key,
        set: { state },
      });
  }

  async del(key: string) {
    await this.db
      .delete(schema.BskyAuthState)
      .where(eq(schema.BskyAuthState.key, key));
  }
}

export class SessionStore implements NodeSavedSessionStore {
  constructor(private db: typeof database) {}

  async get(key: string): Promise<NodeSavedSession | undefined> {
    const result = await this.db.query.BskyAuthSession.findFirst({
      where: eq(schema.BskyAuthSession.key, key),
    });

    if (!result) return;
    return result.session as NodeSavedSession;
  }

  async set(key: string, val: NodeSavedSession) {
    const session = JSON.stringify(val);
    await this.db
      .insert(schema.BskyAuthSession)
      .values({ key, session })
      .onConflictDoUpdate({
        target: schema.BskyAuthSession.key,
        set: { session },
      });
  }

  async del(key: string) {
    await this.db
      .delete(schema.BskyAuthSession)
      .where(eq(schema.BskyAuthSession.key, key));
  }
}
