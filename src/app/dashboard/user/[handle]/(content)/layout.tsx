import type { Metadata } from "next";
import ProfileHeader from "@/components/contentDisplay/profileHeader/ProfileHeader";

export const metadata: Metadata = {
  title: "Ouranos — Profile",
  description: "Profile",
};

interface Props {
  params: { handle: string };
  children: React.ReactNode;
}

export default function ProfileLayout(props: Props) {
  const { params, children } = props;
  return (
    <>
      <ProfileHeader handle={params.handle} />
      {children}
    </>
  );
}
