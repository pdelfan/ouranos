"use server";

import { getDidFromHandle, getPDS } from "@/lib/api/bsky/identity";

export async function getService(handle: string) {
  const userDID = await getDidFromHandle(handle);
  const service = await getPDS(userDID);

  return service;
}
