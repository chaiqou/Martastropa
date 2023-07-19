import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "../components/ui/DropdownMenu";
import UserAvatar from "./UserAvatar";

const UserAccountNav = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};

export default UserAccountNav;
