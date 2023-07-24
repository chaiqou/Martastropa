"use client";
import { useState } from "react";

const page = () => {
  const [input, setInput] = useState<string>("");

  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto">
      <div className="relative bg-white w-full h-fit p-4 space-y-6 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Create a friendos</h1>
        </div>

        <hr className="bg-zinc-500 h-px" />

        <>
          <p className="text-lg font-medium">Name:</p>
          <div className="relative">
            <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400">
              m/
            </p>
            <input></input>
          </div>
        </>
      </div>
    </div>
  );
};

export default page;
