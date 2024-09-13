import type { Metadata } from "next";
import ProfileHeader from "@/components/contentDisplay/profileHeader/ProfileHeader";
import { getProfile } from "@/lib/api/bsky/actor";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const profile = await getProfile(params.handle);
  const title = profile?.displayName
    ? `${profile.displayName} (@${params.handle})`
    : params.handle;

  return {
    title: title,
    description: "Profile",
  };
}

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
