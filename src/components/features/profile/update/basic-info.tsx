"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useFetchGql } from "@/lib/api/graphql";
import { UPDATE_USER_PROFILE } from "@/lib/api/api-profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VariablesOf } from "gql.tada";
import { QK } from "@/lib/constants/query-key";
import { Loading } from "@/components/ui/loading";
import { ProfileType } from "@/app/(protected)/profile/[userId]/update/page-profile-update";

const basicInfoSchema = z.object({
  first_name: z.string().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  last_name: z.string().max(50, "Last name must be less than 50 characters").optional(),
  user_name: z.string().max(30, "Username must be less than 30 characters").optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
});

type BasicInfoFormData = z.infer<typeof basicInfoSchema>;

interface BasicInfoFormProps {
  userData: any;
}

export type ProfileVariables = VariablesOf<typeof UPDATE_USER_PROFILE>;

export function BasicInfoForm({ profile }: { profile: ProfileType }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<BasicInfoFormData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      first_name: profile.first_name || "",
      last_name: profile.last_name || "",
      user_name: profile.user_name || "",
      bio: profile.bio || "",
    },
  });

  const qc = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (variables: ProfileVariables) => useFetchGql(UPDATE_USER_PROFILE, variables),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      qc.invalidateQueries({ queryKey: [QK.PROFILE, { userId: profile.id }] });
    },
    onError: () => toast.error("Could not update profile!"),
  });

  const onSubmit = async (data: BasicInfoFormData) => {
    const variables: ProfileVariables = {
      userId: profile.id,
      _set: { first_name: data.first_name, last_name: data.last_name, user_name: data.user_name, bio: data.bio },
    };
    mutate(variables);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name *</Label>
          <Input id="first_name" {...register("first_name")} placeholder="Enter your first name" />
          {errors.first_name && <p className="text-sm text-destructive">{errors.first_name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input id="last_name" {...register("last_name")} placeholder="Enter your last name" />
          {errors.last_name && <p className="text-sm text-destructive">{errors.last_name.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="user_name">Username</Label>
        <Input id="user_name" {...register("user_name")} placeholder="Choose a unique username" />
        {errors.user_name && <p className="text-sm text-destructive">{errors.user_name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" {...register("bio")} placeholder="Tell others about yourself..." className="min-h-[100px]" />
        {errors.bio && <p className="text-sm text-destructive">{errors.bio.message}</p>}
      </div>

      <Button type="submit" disabled={isPending || !isDirty} className="w-full md:w-auto">
        {isPending && <Loading />}
        Update
      </Button>
    </form>
  );
}
