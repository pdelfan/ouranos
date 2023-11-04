import { AtpSessionData, AtpSessionEvent, BskyAgent } from "@atproto/api";

const at = new BskyAgent({
  service: "https://bsky.social",
  persistSession: (evt: AtpSessionEvent, sess?: AtpSessionData) => {
    if (!sess) return;

    localStorage.setItem("sessionData", JSON.stringify(sess));

    // if (
    //   !loggedInAccounts?.map((s: { did: string }) => s.did).includes(sess.did)
    // ) {
    //   localStorage.setItem(
    //     "loggedInAccounts",
    //     JSON.stringify([...loggedInAccounts, sess])
    //   );
    // }
  },
});

// async function agent(): Promise<BskyAgent> {
//   const sessionData = localStorage.getItem("sessionData");

//   if (!sessionData || sessionData === "undefined") {
//     if (window.location.pathname !== "/auth/login") {
//       window.location.assign("/auth/login");
//     }

//     return at;
//   }

//   try {
//     await at.resumeSession(JSON.parse(sessionData));
//     localStorage.removeItem("NETWORK_ISSUES");
//   } catch {
//     // empty
//   }

//   return at;
// }
