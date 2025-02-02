import { getUserSuggestions } from "@/lib/atproto/bsky/actor";
import { getPopularFeeds } from "@/lib/atproto/bsky/feed";
import { getSuggestedStarterPacks } from "@/lib/atproto/bsky/graph";
import { getStarterPackImage, getStarterPackLink } from "@/lib/utils/link";
import { AppBskyGraphStarterpack } from "@atproto/api";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardSection,
  Center,
  Container,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Space,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { Fragment } from "react";
import { BsArrowRightCircleFill, BsFilter } from "react-icons/bs";
import { MdOutlineRssFeed } from "react-icons/md";
import { PiMagnifyingGlassBold } from "react-icons/pi";

export default async function ExploreContainer() {
  const peopleSuggestions = await getUserSuggestions({});
  const popularFeeds = await getPopularFeeds({ limit: 10 });
  const starterPackExamples = await getSuggestedStarterPacks({});

  return (
    <Container>
      <Center>
        <Stack>
          <Stack>
            <Title order={1} ta={"center"}>
              What do you want to find?
            </Title>
            <Paper withBorder radius={"md"} p={"sm"}>
              <Textarea
                placeholder="Search for posts, users, feeds"
                variant="unstyled"
                size="md"
                radius={"md"}
              />
              <Group mt={"xl"} justify="space-between" align="end">
                <Stack gap={"xs"}>
                  <Group gap={"xs"}>
                    <BsFilter />
                    <Text fz={"sm"} fw={500} c="gray.7">
                      Search options
                    </Text>
                  </Group>
                  <Group gap={"xs"}>
                    <Button
                      variant="light"
                      color="gray"
                      size="xs"
                      radius={"xl"}
                    >
                      from: @user
                    </Button>
                    <Button
                      variant="light"
                      color="gray"
                      size="xs"
                      radius={"xl"}
                    >
                      mentions: @user
                    </Button>
                    <Button
                      variant="light"
                      color="gray"
                      size="xs"
                      radius={"xl"}
                    >
                      since: yyyy-mm-dd
                    </Button>
                    <Button
                      variant="light"
                      color="gray"
                      size="xs"
                      radius={"xl"}
                    >
                      until: yyyy-mm-dd
                    </Button>
                    <Button
                      variant="light"
                      color="gray"
                      size="xs"
                      radius={"xl"}
                    >
                      lang: en
                    </Button>
                  </Group>
                </Stack>

                <Button
                  radius={"md"}
                  color="gray.7"
                  leftSection={<PiMagnifyingGlassBold />}
                >
                  Search
                </Button>
              </Group>
            </Paper>
          </Stack>
          <SimpleGrid cols={{ base: 1, md: 2, lg: 2 }}>
            <Card bg={"gray.1"} radius={"md"}>
              <Text fw={600}>Who to follow</Text>
              <Text>Follow more people who interest you</Text>
              <Space h={"sm"} />
              <AvatarGroup>
                {peopleSuggestions.actors.map((p) => (
                  <Avatar
                    key={p.did}
                    src={p.avatar ?? null}
                    alt={`${p.handle}'s avatar`}
                    size={"md"}
                    bd={"3px solid gray.1"}
                    component="a"
                    href={`/dashboard/profile/${p.handle}`}
                  />
                ))}
              </AvatarGroup>
              <Space h={"sm"} />
              <Button
                leftSection={<BsArrowRightCircleFill />}
                variant="light"
                color="gray"
              >
                View profiles
              </Button>
            </Card>
            <Card bg={"gray.1"} radius={"md"}>
              <Text fw={600}>Discover feeds</Text>
              <Text>Find your own timeline, with your interests</Text>
              <Space h={"sm"} />
              <AvatarGroup>
                {popularFeeds.feeds.map((f) => (
                  <Avatar
                    key={f.uri}
                    src={f.avatar ?? null}
                    alt={`${f.displayName}'s image`}
                    size={"md"}
                    radius={"md"}
                    bd={"3px solid gray.1"}
                    component="a"
                    href={`/dashboard/profile/${f.creator.handle}/feed/${f.name}`}
                  >
                    {!f.avatar && <MdOutlineRssFeed size={20} />}
                  </Avatar>
                ))}
              </AvatarGroup>
              <Space h={"sm"} />
              <Button
                leftSection={<BsArrowRightCircleFill />}
                variant="light"
                color="gray"
              >
                Explore feeds
              </Button>
            </Card>
          </SimpleGrid>
          <Card bg={"gray.1"} radius={"md"}>
            <Text fw={600}>Starter packs</Text>
            <Text>Recommended people and feeds</Text>
            <Space h={"sm"} />
            <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }}>
              {starterPackExamples.starterPacks.map((p) => (
                <Fragment key={p.uri}>
                  {AppBskyGraphStarterpack.isRecord(p.record) && (
                    <Card
                      withBorder
                      radius={"md"}
                      component="a"
                      href={getStarterPackLink(p)}
                    >
                      <CardSection>
                        <Image
                          src={getStarterPackImage(p)}
                          alt={`${p.record.name}'s image`}
                        />
                      </CardSection>
                      <Space h={"sm"} />
                      <Text fz={"md"} fw={500}>
                        {p.record.name}
                      </Text>
                    </Card>
                  )}
                </Fragment>
              ))}
            </SimpleGrid>
            <Space h={"sm"} />
            <Button
              leftSection={<PiMagnifyingGlassBold />}
              variant="light"
              color="gray"
            >
              Search for starter packs
            </Button>
          </Card>
        </Stack>
      </Center>
    </Container>
  );
}
