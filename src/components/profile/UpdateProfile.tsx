"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchGraphql from "@/lib/fetchGraphql";
import { updateUserName } from "@/lib/queries";
import { UserType } from "@/lib/Interface";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const UpdateProfile = ({ user }: { user: UserType }) => {
  const queryClient = useQueryClient();
  const [name, setName] = useState(user.name || '');
  const router = useRouter()


  const mutation = useMutation({
    mutationFn: async (updatedUser: Partial<UserType>) => {
      const variables: Partial<UserType> = { id: user?.id };

      if (updatedUser.name === user?.name) {
        return toast.error('No changes were made');
      }
      variables.name = updatedUser.name;

      const response = await fetchGraphql(updateUserName, variables);
      if(response.errors) toast.error("Could not update profile!")
      return router.push(`/profile/${user?.id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["user-profile", user.id]});
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ name });
  };

  

  return (
    <div className="p-2 rounded-lg bg-white">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
