import type { Metadata } from "next";

import { getProfile } from "@/lib/atproto/bsky/actor";
import { Fragment } from "react";
import ProfileHeader from "@/features/profile/components/profileHeader/ProfileHeader";
import TopBar from "@/components/navigation/topBar/TopBar";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const profile = await getProfile({ handleOrDid: handle });
  const title = profile?.displayName
    ? `${profile.displayName} (@${handle})`
    : handle;

  return {
    title: title,
    description: "Profile",
  };
}

interface Props {
  params: { handle: string };
  children: React.ReactNode;
}

export default async function Layout(props: Props) {
  const { handle } = await props.params;
  const profile = await getProfile({ handleOrDid: handle });

  const BREAD_CRUMBS = [
    { label: "Home", href: "/dashboard" },
    { label: "Profile", href: "" },
    {
      label: handle,
      href: `/dashboard/profile/${handle}`,
    },
  ];

  return (
    <Fragment>
      <TopBar breadcrumbs={BREAD_CRUMBS} />
      <ProfileHeader profile={profile} />
      {props.children}
    </Fragment>
  );
}
