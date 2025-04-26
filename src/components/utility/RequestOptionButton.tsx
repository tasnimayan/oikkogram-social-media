"use client";

import { useSessionContext } from "@/app/(protected)/AuthWrapper";
import fetchGraphql from "@/lib/fetchGraphql";
import { handleFriendRequest } from "@/lib/queries";
import toast from "react-hot-toast";

interface ButtonProps {
  id: string;
  buttonType: 'confirm' | 'delete';
  children?: React.ReactNode;
}

const RequestOptionButton: React.FC<ButtonProps> = ({
  id,
  buttonType,
  children,
}) => {
  const { user} = useSessionContext();
  const buttonTypes = {
    confirm: "border rounded px-2 py-1 bg-green-400",
    delete: "border rounded px-2 py-1 bg-red-400",
  };

  const variables = {
    friend_id: id,
    user_id: user?.id,
    status: "", //removed or accepted
  };

  const handleClick = async () => {
    if (buttonType == "confirm") {
      // confirm request graphql api call
      variables.status = "accepted";
      const response = await fetchGraphql(handleFriendRequest, variables);
      if (response.errors) {
        return toast.error(response.errors[0].extensions.code);
      }
      toast.success("Added as friend");
    }
    if (buttonType == "delete") {
      // delete request graphql api call
      variables.status = "removed";
      const response = await fetchGraphql(handleFriendRequest, variables);
      if (response.errors) {
        return toast.error(response.errors[0].extensions.code);
      }
      toast.success("Removed request");
    }
  };

  return (
    <button className={buttonTypes[buttonType]} onClick={handleClick}>
      {children}
    </button>
  );
};

export default RequestOptionButton;
