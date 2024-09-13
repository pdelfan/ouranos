import AppearanceContainer from "@/containers/settings/AppearanceContainer/AppearanceContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Appearance",
  description: "Appearance",
};

export default function Page() {
  return <AppearanceContainer />;
}
