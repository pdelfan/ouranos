"use client";

import { Button, NavLink } from "@mantine/core";
import { Fragment } from "react";
import { BiCloud, BiRightArrowAlt } from "react-icons/bi";
import FeedNavItem from "../feedNavItem/FeedNavItem";
import useSavedFeeds from "../../lib/queries/useSavedFeeds";
import Link from "next/link";

export default function FeedNavList() {
  const {savedFeeds} = useSavedFeeds();

  return (
    <NavLink
      label={"Feeds"}
      leftSection={<BiCloud size={25} />}
      c={"gray"}
      px={"6"}
    >
      <Button
        component={Link}
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
        {savedFeeds && savedFeeds.map((feed) => (
          <FeedNavItem
            key={feed.uri}
            name={feed.displayName}
            url={`/dashboard/profile/${feed.creator.handle}/feed/${feed.displayName}`}
            iconSrc={feed.avatar}
          />
        ))}
      </Fragment>
    </NavLink>
  );
}
