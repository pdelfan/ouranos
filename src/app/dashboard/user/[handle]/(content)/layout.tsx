import ProfileHeader from "@/components/contentDisplay/profileHeader/ProfileHeader";
import ProfileHeaderSkeleton from "@/components/contentDisplay/profileHeader/ProfileHeaderSkeleton";
import { Suspense } from "react";

interface Props {
  params: { handle: string };
  children: React.ReactNode;
}
export default function ProfileLayout(props: Props) {
  const { params, children } = props;
  return (
    <>
      <Suspense fallback={<ProfileHeaderSkeleton />}>
        <ProfileHeader handle={params.handle} />
      </Suspense>
      {children}
    </>
  );
}
