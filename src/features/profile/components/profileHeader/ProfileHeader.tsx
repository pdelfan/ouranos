import { AppBskyActorDefs } from "@atproto/api";
import { Fragment } from "react";
import {  
  Image,  
  Tabs,
  TabsList,
  TabsTab,
  Title,
  Text,
} from "@mantine/core";

interface Props {
  profile: AppBskyActorDefs.ProfileViewDetailed;
}

export default function ProfileHeader(props: Props) {
  const { profile } = props;

  return (
    <Fragment>
      <Image src={profile.banner ?? null} alt="Banner" mah={350} />
      <Tabs defaultValue={"posts"}>
        <TabsList>
          <TabsTab value={"posts"}>
            <Text fw={500}>Posts</Text>
          </TabsTab>
          <TabsTab value={"replies"} fw={600}>
            <Text fw={500}>Replies</Text>
          </TabsTab>
          <TabsTab value={"media"} fw={600}>
            <Text fw={500}>Media</Text>
          </TabsTab>
          <TabsTab value={"likes"} fw={600}>
            <Text fw={500}>Likes</Text>
          </TabsTab>
          <TabsTab value={"feeds"} fw={600}>
            <Text fw={500}>Feeds</Text>
          </TabsTab>
          <TabsTab value={"lists"} fw={600}>
            <Text fw={500}>Lists</Text>
          </TabsTab>
          <TabsTab value={"starter-packs"} fw={600}>
            <Text fw={500}>Starter Packs</Text>
          </TabsTab>
          <TabsTab value={"atmosphere"} fw={600}>
            <Text fw={500}>Atmosphere</Text>
          </TabsTab>
        </TabsList>
      </Tabs>
      <Title order={1} fz={"h2"}>
        {profile.displayName}
      </Title>
      <Text c={"gray"} fw={500}>
        @{profile.handle}
      </Text>
    </Fragment>
  );
}
