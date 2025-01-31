import { Alert, Button, NavLink, Text } from "@mantine/core";
import { Fragment } from "react";
import { BiCloud, BiRightArrowAlt } from "react-icons/bi";
import { LuInfo } from "react-icons/lu";
import FeedNavItem from "../feedNavItem/FeedNavItem";
import { getSavedFeeds } from "@/lib/atproto/bsky/feed";

export default async function FeedNavList() {
  const savedFeeds = await getSavedFeeds({});

  return (
    <NavLink
      label={"Feeds"}
      leftSection={<BiCloud size={25} />}
      c={"gray"}
      px={"6"}
    >
      <Button
        component="a"
        href="/dashboard/feeds"
        variant="subtle"
        color="gray.5"
        fullWidth
        justify="start"
        leftSection={<BiRightArrowAlt size={25} />}
      >
        View more feeds
      </Button>

        <Fragment>
          {savedFeeds.map((feed) => (
            <FeedNavItem
              key={feed.uri}
              name={feed.displayName}
              url={`/dashboard/user/${feed.creator.handle}/lists/${feed.name}`}
              iconSrc={feed.avatar}
            />
          ))}
        </Fragment>
    </NavLink>
  );
}
