import { AppBskyFeedDefs } from "@atproto/api";
import { Thread } from "../../../../../types/feed";

interface Props {
  thread: Thread;
}

export default function useOrganizeThread(props: Props) {
  const { thread } = props;

  const replies = (thread?.replies as AppBskyFeedDefs.ThreadViewPost[]) || [];

  const getConnectedReplies = (
    post: AppBskyFeedDefs.ThreadViewPost,
    currentChain: AppBskyFeedDefs.ThreadViewPost[] = []
  ) => {
    currentChain.push(post);

    // check if the post has replies
    if (post.replies && post.replies.length > 0) {
      let longestChain = currentChain;

      // iterate through replies and call the function recursively
      for (const reply of post.replies) {
        if (AppBskyFeedDefs.isThreadViewPost(reply)) {
          const chain = getConnectedReplies(reply, currentChain.slice());

          // update the longest chain if the new one is longer
          if (chain.length > longestChain.length) {
            longestChain = chain;
          }
        }
      }

      return longestChain;
    }

    return currentChain;
  };

  const getParentChain = (post: Thread) => {
    const chain: Thread[] = [];
    let currentPost = post;
    while (currentPost && currentPost.parent) {
      if (currentPost.parent) {
        chain.push(currentPost.parent as Thread);
        currentPost = currentPost.parent as Thread;
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
