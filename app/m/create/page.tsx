"use client";
import { useState } from "react";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CreateSubredditPayload } from "../../../lib/validators/subreddit";
import { toast } from "../../../hooks/use-toast";
import { useCustomToast } from "../../../hooks/use-custom-toast";

const page = () => {
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const { loginToast } = useCustomToast();

  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubredditPayload = {
        name: input,
      };

      const { data } = await axios.post("/api/subreddit", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Community already exists.",
            description: "Please choose different community",
            variant: "destructive",
          });
        }

        if (err.response?.status === 422) {
          return toast({
            title: "Invalid community name.",
            description:
              "Please choose community name between 3 and 21 characters.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      toast({
        title: "Something is wrong.",
        description: "could not create subbredit",
        variant: "destructive",
      });
    },

    onSuccess: (data) => {
      router.push(`/m/${data}`);
    },
  });

  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto">
      <div className="relative bg-white w-full h-fit p-4 space-y-6 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Create a community</h1>
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
            Create community
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
