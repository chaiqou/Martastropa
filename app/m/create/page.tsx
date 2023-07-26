"use client";
import { useState } from "react";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CreateSubredditPayload } from "../../../lib/validators/subreddit";

const page = () => {
  const [input, setInput] = useState<string>("");
  const router = useRouter();

  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubredditPayload = {
        name: input,
      };

      const { data } = await axios.post("/api/subreddit", payload);
      return data as string;
    },
  });

  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto">
      <div className="relative bg-white w-full h-fit p-4 space-y-6 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Create a friendo</h1>
        </div>

        <hr className="bg-zinc-500 h-px" />

        <>
          <p className="text-lg font-medium">Name:</p>
          <div className="relative">
            <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400">
              m/
            </p>
            <Input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="pl-6"
            ></Input>
          </div>
        </>

        <div className="flex justify-end gap-4">
          <Button onClick={() => router.back()} variant="subtle">
            Cancel
          </Button>
          <Button
            onClick={() => createCommunity()}
            isLoading={isLoading}
            disabled={input.length === 0}
          >
            Create friendo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
