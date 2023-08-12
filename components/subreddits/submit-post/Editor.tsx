"use client";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PostValidator,
  PostCreationRequest,
} from "../../../lib/validators/post";
import { useCallback, useRef, useState, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import { uploadFiles } from "../../../lib/uploadthing";
import { toast } from "../../../hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

interface editorProps {
  subredditId: any;
}

const Editor = ({ subredditId }: any) => {
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

  const ref = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const [isMounted, setisMounted] = useState<boolean>(false);
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setisMounted(true);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        toast({
          title: "Something went wrong",
          description: (value as { message: string }).message,
          variant: "destructive",
        });
      }
    }

    return () => {};
  }, []);

  const initializeEditor = useCallback(async () => {
    const EditorJs = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          LinkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const [res] = await uploadFiles([file], "imageUploader");

                  return {
                    success: 1,
                    file: {
                      url: res.fileUrl,
                    },
                  };
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          embed: Embed,
          table: Table,
        },
      });
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  const { mutate: createPost } = useMutation({
    mutationFn: async ({
      title,
      content,
      subredditId,
    }: PostCreationRequest) => {
      const payload: PostCreationRequest = {
        title,
        content,
        subredditId,
      };

      const { data } = await axios.post("/api/subreddit/post/create", payload);

      return data;
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Your post was not published, please try again",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      const newPathname = pathName.split("/").slice(0, -1).join("/");
      router.push(newPathname);
      router.refresh();

      return toast({
        description: "Your post has been published",
      });
    },
  });

  async function onSubmit(data: PostCreationRequest) {
    const blocks = await ref.current?.save();

    const payload: PostCreationRequest = {
      title: data.title,
      content: data.content,
      subredditId: subredditId,
    };

    createPost(payload);
  }

  const { ref: titleRef, ...rest } = register("title");

  return (
    <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-fit "
        id="subreddit-post-form"
      >
        <div className="prose prose-stone dark:prose-invert">
          <TextareaAutosize
            ref={(e) => {
              titleRef(e);

              // @ts-ignore
              _titleRef.current = e;
            }}
            {...rest}
            placeholder="Title"
            className="w-full resize-none overflow-hidden appearance-none font-bold outline-none bg-transparent text-5xl"
          />
          <div id="editor" className="min-h-[500px]"></div>
        </div>
      </form>
    </div>
  );
};

export default Editor;
