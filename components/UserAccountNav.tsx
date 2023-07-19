import React from "react";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdownMenu";
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
