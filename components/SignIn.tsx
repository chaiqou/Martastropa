import { HeartPulseIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import UserAuthForm from "./UserAuthForm";

const SignIn = () => {
  return (
    <div className="container flex-col flex justify-center space-y-6 mx-auto w-full sm:w-[400px]">
      <div className="flex flex-col text-center space-y-2">
        <HeartPulseIcon
          color="#eb0089"
          absoluteStrokeWidth
          className="mx-auto h-6 w-6"
        />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back </h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up a Martastropa account and agree to
          Martaias cesebs bro.
        </p>

        <UserAuthForm />

        <p className="px-8 text-center text-sm text-zinc-700">
          New to Martastropa ?!{" "}
          <Link
            className="hover:text-zinc-800 text-sm underline underline-offset-4"
            href="/sign-up"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
