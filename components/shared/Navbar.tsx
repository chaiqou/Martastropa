import Link from "next/link";
import { HeartPulse } from "lucide-react";
import { buttonVariants } from "../ui/Button";
import { getAuthSession } from "../../lib/auth";
import UserAccountNav from "../UserAccountNav";

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100  z-10 py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <Link href="/" className="flex gap-2 items-center">
          <p className="hidden text-pink-600 text-sm font-black md:block">
            Reddit
          </p>
          <HeartPulse
            color="#eb0089"
            absoluteStrokeWidth
            className="h-8 w-8 sm:h-6 sm:w-6 "
          />
        </Link>

        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link className={buttonVariants()} href="/sign-in">
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
