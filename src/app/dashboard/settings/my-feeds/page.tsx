import MyFeedsContainer from "@/containers/settings/myFeedsContainer/MyFeedsContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Feeds",
  description: "My Feeds",
};

export default function Page() {
  return <MyFeedsContainer />;
}
