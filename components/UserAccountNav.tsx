import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "../components/ui/DropdownMenu";
import UserAvatar from "./UserAvatar";
import { User } from "next-auth";

interface UserAccountNavProps {
  user: Pick<User, "name" | "email" | "image">;
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          className="h-8 w-8"
          user={{ name: user.name || null, image: user.image || null }}
        ></UserAvatar>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};

export default UserAccountNav;
