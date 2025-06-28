"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VariablesOf } from "gql.tada";
import { UPDATE_USER_PROFILE } from "@/lib/api/api-profile";
import { useFetchGql } from "@/lib/api/graphql";
import { QK } from "@/lib/constants/query-key";
import { ProfileType } from "@/app/(protected)/profile/[userId]/update/page-profile-update";

export type ProfileVariables = VariablesOf<typeof UPDATE_USER_PROFILE>;

const personalDetailsSchema = z.object({
  gender: z.string().optional(),
  dob: z.date().or(z.string()).nullable().optional(),
  phone_number: z.string().max(20, "Phone number must be less than 20 characters").optional(),
  occupation: z.string().max(100, "Occupation must be less than 100 characters").optional(),
  address: z.string().max(200, "Address must be less than 200 characters").optional(),
});

type FormData = z.infer<typeof personalDetailsSchema>;

export function PersonalDetailsForm({ profile }: { profile: ProfileType }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      gender: profile.gender || "",
      dob: profile.dob || null,
      phone_number: profile.phone_number || "",
      occupation: profile.occupation || "",
      address: profile.address || "",
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

  const onSubmit = async (data: FormData) => {
    const variables: ProfileVariables = {
      userId: profile.id,
      _set: {
        gender: data.gender,
        dob: data.dob,
        phone_number: data.phone_number,
        occupation: data.occupation,
        address: data.address,
      },
    };
    mutate(variables);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.gender && <p className="text-sm text-destructive">{errors.gender.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input id="dob" type="date" min="1905-06-28" max="2025-06-28" placeholder="YYYY-MM-DD" {...register("dob")} />
          {errors.dob && <p className="text-sm text-destructive">{errors.dob.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone_number">Phone Number</Label>
          <Input id="phone_number" {...register("phone_number")} placeholder="+88 01234567891" />
          {errors.phone_number && <p className="text-sm text-destructive">{errors.phone_number.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="occupation">Occupation</Label>
          <Input id="occupation" {...register("occupation")} placeholder="Your profession" />
          {errors.occupation && <p className="text-sm text-destructive">{errors.occupation.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" {...register("address")} placeholder="Your address" />
        {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
      </div>

      <Button type="submit" disabled={isPending || !isDirty} className="w-full md:w-auto">
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Update
      </Button>
    </form>
  );
}
