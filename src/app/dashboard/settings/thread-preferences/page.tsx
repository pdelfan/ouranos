import ThreadPreferencesContainer from "@/containers/settings/threadPreferencesContainer/ThreadPreferencesContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thread Preferences",
  description: "Thread Preferences",
};

export default function Page() {
  return <ThreadPreferencesContainer />;
}
