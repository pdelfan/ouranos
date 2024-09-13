import HomeFeedContainer from "@/containers/settings/homeFeedContainer/HomeFeedContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Feed Preferences",
  description: "Home Feed Preferences",
};

export default function Page() {
  return <HomeFeedContainer />;
}
