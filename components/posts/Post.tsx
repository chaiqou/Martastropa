import { Post, User, Vote } from "@prisma/client";
import React, { FC } from "react";
import { formatTimeToNow } from "../../lib/utils";

interface postPorps {
  subredditName: string;
  post: Post & {
    author: User;
    votes: Vote[];
  };
}

const Post: FC<postPorps> = ({ subredditName, post }) => {
  return (
    <div className="rounded-md mt-4 bg-white shadow">
      <div className="px-6 py-4 flex justify-between">
        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500">
            {subredditName ? (
              <>
                <a
                  className="underline text-zinc-900 text-sm underline-offset-2"
                  href={`/m/${subredditName}`}
                >
                  m/{subredditName}
                </a>
                <span className="px-1">-</span>
              </>
            ) : null}
            <span>Posted by u/{post.author.name}</span>{" "}
            {formatTimeToNow(new Date(post.createdAt))}
          </div>
          <a href={`/m/${subredditName}/post/${post.id}`}>
            <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
              {post.title}
            </h1>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Post;
