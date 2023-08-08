import { HeartPulseIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import UserAuthForm from "./UserAuthForm";

const SignUp = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <HeartPulseIcon
          color="#eb0089"
          absoluteStrokeWidth
          className="mx-auto h-6 w-6"
        />
        <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up a account and agree to terms and conditions.
        </p>
      </div>
      <UserAuthForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        Already a friendo ?!{" "}
        <Link
          href="/sign-in"
          className="hover:text-brand text-sm underline underline-offset-4"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
