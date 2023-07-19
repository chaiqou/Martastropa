import React from "react";
import { Avatar, AvatarFallback } from "./ui/Avatar";

const UserAvatar = ({ user }) => {
  return (
    <Avatar>
      {user.image ? <div></div> : <AvatarFallback></AvatarFallback>}
    </Avatar>
  );
};

export default UserAvatar;
