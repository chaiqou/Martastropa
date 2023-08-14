"use client";

import { useRef } from "react";
import { ExtendedPost } from "../../types/db";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "../../app/config";
import axios from "axios";
import { useSession } from "next-auth/react";

interface PostFeedProps {
  initialPosts: ExtendedPost[];
  subredditName?: string;
}

const { data: session } = useSession();

const PostFeed = ({ initialPosts, subredditName }) => {
  const lastPostRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["infinite-query"],
    async ({ pageParam = 1 }) => {
      const query =
        `/api/posts?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}` +
        (!!subredditName ? `&subredditName=${subredditName}` : "");

      const { data } = await axios.get(query);
      return data as ExtendedPost[];
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  );

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      {posts.map((post: any, index: any) => {
        const votesAmount = post.vote.reduce(
          (accumulator: any, current: any) => {
            if (current.type === "UP") return accumulator + 1;
            if (current.type === "DOWN") return accumulator - 1;
            return accumulator;
          },
          0
        );

        const currentVote = post.vote.find(
          (vote: any) => vote.userId === session?.user.id
        );
        return <div></div>;
      })}
    </ul>
  );
};

export default PostFeed;
