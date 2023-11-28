"use client";

import useAgent from "@/lib/hooks/bsky/useAgent";
import { getPostThread } from "@/lib/api/bsky/feed";
import { useQuery } from "@tanstack/react-query";
import { AppBskyFeedDefs } from "@atproto/api";

interface Props {
  id: string;
  handle: string;
}

interface Reply {
  post: AppBskyFeedDefs.ThreadViewPost;
  replies: Reply[];
}

export default function PostThreadContainer(props: Props) {
  const { id, handle } = props;
  const agent = useAgent();

  // parents { parent, post, replies}
  // post
  // replies []

  const thread = useQuery({
    queryKey: ["postThread", id],
    queryFn: async () => {
      const { data } = await agent.resolveHandle({ handle });
      if (!data) return;
      const uri = `at://${data.did}/app.bsky.feed.post/${id}`;
      return getPostThread(agent, uri);
    },
  });

  if (thread.data) {
    const replies =
      (thread.data.replies as AppBskyFeedDefs.ThreadViewPost[]) || [];
    if (replies.length > 0) {
      const getConnectedReplies = (
        post: AppBskyFeedDefs.ThreadViewPost,
        currentChain: AppBskyFeedDefs.ThreadViewPost[] = []
      ) => {
        currentChain.push(post);

        // Check if the post has replies
        if (post.replies && post.replies.length > 0) {
          let longestChain = currentChain;

          // Iterate through replies and call the function recursively
          for (const reply of post.replies) {
            if (AppBskyFeedDefs.isThreadViewPost(reply)) {
              const chain = getConnectedReplies(reply, currentChain.slice());

              // Update the longest chain if the new one is longer
              if (chain.length > longestChain.length) {
                longestChain = chain;
              }
            }
          }

          return longestChain;
        }

        return currentChain;
      };

      // call func
      const chains = replies.map((reply) => getConnectedReplies(reply));

      const longestChain = replies
        .map((reply) => getConnectedReplies(reply))
        .reduce((acc, chain) => (chain.length > acc.length ? chain : acc), []);

      console.log(chains);
    }
  }

  return <></>;
}
