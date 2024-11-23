import { HandleResolver } from "@atproto/identity";

export const getDidFromHandle = async (handle: string) => {
  const handleResolver = new HandleResolver({});
  const did = await handleResolver.resolve(handle);
  if (!did) {
    throw new Error("Could not get DID");
  }

  return did;
};
