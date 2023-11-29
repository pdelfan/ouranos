import { AppBskyFeedDefs } from "@atproto/api";

interface Props {
  thread:
    | AppBskyFeedDefs.ThreadViewPost
    | AppBskyFeedDefs.NotFoundPost
    | AppBskyFeedDefs.BlockedPost
    | {
        [k: string]: unknown;
        $type: string;
      }
    | undefined;
}

export default function useOrganizeThread(props: Props) {
  const { thread } = props;
  
  const replies = (thread?.replies as AppBskyFeedDefs.ThreadViewPost[]) || [];

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

  const getParentChain = (post: AppBskyFeedDefs.ThreadViewPost) => {
    const chain: AppBskyFeedDefs.ThreadViewPost[] = [];
    let currentPost = post;
    while (currentPost && currentPost.parent) {
      if (AppBskyFeedDefs.isThreadViewPost(currentPost.parent)) {
        chain.push(currentPost.parent);
        currentPost = currentPost.parent;
      }
    }
    return chain.reverse();
  };

  const replyChains = replies.map((reply) => getConnectedReplies(reply));
  const parentChain = getParentChain(thread as AppBskyFeedDefs.ThreadViewPost);

  // find if there are any chains that start with the main author and show its replies in order
  //   const mainAuthorChains = chains.filter(
  //     (chain) => chain[0].post.author.did === thread?.post?.author.did
  //   );

  //   const otherChains = chains.filter(
  //     (chain) => chain[0].post.author.did !== thread?.post.author.did
  //   );
  //   const sortedChains = mainAuthorChains.concat(otherChains);

  return { replyChains, parentChain };
}
