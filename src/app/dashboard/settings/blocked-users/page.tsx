import BlockedUsersContainer from "@/containers/settings/blockedUsersContainer/BlockedUsersContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blocked Users",
  description: "Blocked Users",
};


export default function Page() {
  return <BlockedUsersContainer />;
}
