"use client";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PostValidator,
  PostCreationRequest,
} from "../../../lib/validators/post";

interface editorProps {
  subredditId: string;
}

const Editor = ({ subredditId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCreationRequest>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      subredditId,
      title: "",
      content: null,
    },
  });

  return (
    <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200">
      <form className="w-fit " id="subreddit-post-form">
        <div className="prose prose-stone dark:prose-invert">
          <TextareaAutosize
            placeholder="Title"
            className="w-full resize-none overflow-hidden appearance-none font-bold outline-none bg-transparent text-5xl"
          />
        </div>
      </form>
    </div>
  );
};

export default Editor;
