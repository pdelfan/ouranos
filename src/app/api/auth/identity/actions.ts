"use server";

import { getDidFromHandle } from "@/lib/api/bsky/identity/did";
import { getPDS } from "@/lib/api/bsky/identity/service";

export async function getService(handle: string) {
  const userDID = await getDidFromHandle(handle);
  const service = await getPDS(userDID);

  return service;
}
