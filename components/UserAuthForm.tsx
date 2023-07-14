import { FC } from "react";
import { Button } from "./ui/Button";

interface UserAuthFormProps {}

const UserAuthForm: FC<UserAuthFormProps> = ({}) => {
  return (
    <div className="flex justify-center">
      <Button size="default" className="w-full">
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
