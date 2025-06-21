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

const preferencesSchema = z.object({
  interests: z
    .array(
      z.object({
        value: z.string().min(1, "Interest cannot be empty").max(50, "Interest must be less than 50 characters"),
      })
    )
    .max(20, "Maximum 20 interests allowed"),
});

type PreferencesFormData = z.infer<typeof preferencesSchema>;

interface PreferencesFormProps {
  userData: any;
}

export function PreferencesForm({ userData }: PreferencesFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [newInterest, setNewInterest] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm<PreferencesFormData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      interests: (userData.interests || []).map((interest: string) => ({ value: interest })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "interests",
  });

  const watchedInterests = watch("interests");

  const addInterest = () => {
    if (newInterest.trim() && watchedInterests.length < 20) {
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

  const onSubmit = async (data: PreferencesFormData) => {
    setIsLoading(true);
    try {
      const interests = data.interests.map(interest => interest.value);
      // const result = await updatePreferences(userData.user_id, { interests })
      // if (result.success) {
      //   toast({
      //     title: "Success",
      //     description: "Interests updated successfully",
      //   })
      //   reset(data)
      // } else {
      //   toast({
      //     title: "Error",
      //     description: result.error || "Failed to update interests",
      //     variant: "destructive",
      //   })
      // }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
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
              maxLength={50}
            />
            <Button
              type="button"
              onClick={addInterest}
              disabled={!newInterest.trim() || watchedInterests.length >= 20}
              variant="outline"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">{watchedInterests.length}/20 interests added</p>
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
                const exists = watchedInterests.some(item => item.value.toLowerCase() === interest.toLowerCase());
                if (!exists && watchedInterests.length < 20) {
                  append({ value: interest });
                }
              }}
              disabled={
                watchedInterests.some(item => item.value.toLowerCase() === interest.toLowerCase()) ||
                watchedInterests.length >= 20
              }
            >
              {interest}
            </Button>
          ))}
        </div>
      </div>

      <Button type="submit" disabled={isLoading || !isDirty} className="w-full md:w-auto">
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Update Interests
      </Button>
    </form>
  );
}
