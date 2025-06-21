"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const personalDetailsSchema = z.object({
  gender: z.string().optional(),
  dob: z.string().optional(),
  phone_number: z.string().max(20, "Phone number must be less than 20 characters").optional(),
  occupation: z.string().max(100, "Occupation must be less than 100 characters").optional(),
  address: z.string().max(200, "Address must be less than 200 characters").optional(),
});

type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;

interface PersonalDetailsFormProps {
  userData: any;
}

export function PersonalDetailsForm({ userData }: PersonalDetailsFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    setValue,
    watch,
  } = useForm<PersonalDetailsFormData>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      gender: userData.gender || "",
      dob: userData.dob || "",
      phone_number: userData.phone_number || "",
      occupation: userData.occupation || "",
      address: userData.address || "",
    },
  });

  const watchedGender = watch("gender");

  const onSubmit = async (data: PersonalDetailsFormData) => {
    setIsLoading(true);
    try {
      // const result = await updatePersonalDetails(userData.user_id, data)
      // if (result.success) {
      //   toast({
      //     title: "Success",
      //     description: "Personal details updated successfully",
      //   })
      //   reset(data)
      // } else {
      //   toast({
      //     title: "Error",
      //     description: result.error || "Failed to update personal details",
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select value={watchedGender} onValueChange={value => setValue("gender", value, { shouldDirty: true })}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && <p className="text-sm text-destructive">{errors.gender.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input id="dob" type="date" {...register("dob")} />
          {errors.dob && <p className="text-sm text-destructive">{errors.dob.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone_number">Phone Number</Label>
          <Input id="phone_number" {...register("phone_number")} placeholder="+1 (555) 123-4567" />
          {errors.phone_number && <p className="text-sm text-destructive">{errors.phone_number.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="occupation">Occupation</Label>
          <Input id="occupation" {...register("occupation")} placeholder="Your job title or profession" />
          {errors.occupation && <p className="text-sm text-destructive">{errors.occupation.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" {...register("address")} placeholder="Your address" />
        {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
      </div>

      <Button type="submit" disabled={isLoading || !isDirty} className="w-full md:w-auto">
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Update Personal Details
      </Button>
    </form>
  );
}
