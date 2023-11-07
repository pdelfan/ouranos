import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";

interface Props {
  profile: ProfileView;
}

export default function ProfileCard(props: Props) {
  const { profile } = props;
  return <>{profile.displayName}</>;
}
