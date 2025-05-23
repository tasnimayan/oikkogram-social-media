"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchGraphql from "@/lib/fetchGraphql";
import { updateUser } from "@/lib/api/queries";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UserType } from "./user-profile";

const UpdateProfile = ({ user }: { user: NonNullable<UserType> }) => {
  const queryClient = useQueryClient();
  const [name, setName] = useState(user.name || "");
  const [image, setImage] = useState(user.image || "");
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (updatedUser: Partial<UserType>) => {
      const variables: Partial<UserType> = { id: user?.id };

      if (updatedUser?.name === user?.name && updatedUser.image == user?.image) {
        return toast.error("No changes were made");
      }
      variables.name = updatedUser?.name;
      variables.image = updatedUser?.image;

      const response = await fetchGraphql(updateUser, variables);
      if (response.errors) toast.error("Could not update profile!");
      return router.push(`/profile/${user?.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile", user.id] });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ name, image });
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
            onChange={e => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="image">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={e => setImage(e.target.value)}
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
