"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, X } from "lucide-react";
import toast from "react-hot-toast";
import { ProfileType } from "@/app/(protected)/profile/[userId]/update/page-profile-update";
import { VariablesOf } from "gql.tada";
import { UPDATE_USER_PROFILE } from "@/lib/api/api-profile";
import { useFetchGql } from "@/lib/api/graphql";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QK } from "@/lib/constants/query-key";

const preferencesSchema = z.object({
  interests: z
    .array(
      z.object({
        value: z.string().min(1, "Interest cannot be empty").max(20, "Interest must be less than 20 characters"),
      })
    )
    .max(10, "Maximum 10 interests allowed"),
});

type FormData = z.infer<typeof preferencesSchema>;

export type ProfileVariables = VariablesOf<typeof UPDATE_USER_PROFILE>;

export function PreferencesForm({ profile }: { profile: ProfileType }) {
  const [newInterest, setNewInterest] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      interests: (profile?.interests || []).map((interest: string) => ({ value: interest })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "interests",
    control,
  });

  const watchedInterests = watch("interests");

  const addInterest = () => {
    if (newInterest.trim() && watchedInterests.length < 10) {
      const trimmedInterest = newInterest.trim();
      const exists = watchedInterests.some(interest => interest.value.toLowerCase() === trimmedInterest.toLowerCase());

      if (!exists) {
        append({ value: trimmedInterest });
        setNewInterest("");
      } else {
        toast.error("This interest already exists");
      }
    }
  };

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
        interests: data.interests.map(interest => interest.value),
      },
    };
    mutate(variables);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Add New Interest</Label>
          <div className="flex gap-2">
            <Input
              value={newInterest}
              onChange={e => setNewInterest(e.target.value)}
              placeholder="Enter an interest (e.g., Photography, Travel)"
              onKeyPress={e => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addInterest();
                }
              }}
              maxLength={20}
            />
            <Button
              type="button"
              onClick={addInterest}
              disabled={!newInterest.trim() || watchedInterests.length >= 10}
              variant="outline"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">{watchedInterests.length}/10 interests added</p>
        </div>

        <div className="space-y-2">
          <Label>Your Interests</Label>
          {fields.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {fields.map((field, index) => (
                <Badge key={field.id} variant="secondary" className="flex items-center gap-1">
                  {field.value}
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No interests added yet. Add some interests to help others connect with you!
            </p>
          )}
          {errors.interests && <p className="text-sm text-destructive">{errors.interests.message}</p>}
        </div>
      </div>

      <div className="p-4 bg-muted rounded-lg">
        <p className="text-sm font-medium mb-2">Popular Interests</p>
        <div className="flex flex-wrap gap-2">
          {["Technology", "Photography", "Travel", "Music", "Sports", "Reading", "Cooking", "Art"].map(interest => (
            <Button
              key={interest}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const exists = watchedInterests.some(item => item.value === interest);
                if (!exists && watchedInterests.length < 10) {
                  append({ value: interest });
                }
              }}
              disabled={watchedInterests.some(item => item.value === interest) || watchedInterests.length >= 10}
            >
              {interest}
            </Button>
          ))}
        </div>
      </div>

      <Button type="submit" disabled={isPending || !isDirty} className="w-full md:w-auto">
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Update
      </Button>
    </form>
  );
}
