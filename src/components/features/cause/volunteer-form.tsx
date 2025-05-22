"use client";

import type React from "react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFetchGql } from "@/lib/api/graphql";
import { INSERT_CAUSE_VOLUNTEER } from "@/lib/api/api-cause";
import { VariablesOf } from "gql.tada";
import { volunteerSchema, VolunteerFormData } from "@/lib/schemas/volunteer-form-schema";
import { QK } from "@/lib/constants/query-key";

interface VolunteerFormProps {
  causeId: string;
}
type VolunteerFormVariables = VariablesOf<typeof INSERT_CAUSE_VOLUNTEER>["object"];
export function VolunteerForm({ causeId }: VolunteerFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      skills: "",
      description: "",
      terms: false,
    },
  });

  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: (variables: VolunteerFormVariables) => useFetchGql(INSERT_CAUSE_VOLUNTEER, { object: variables }),
    onSuccess: () => {
      setSubmitted(true);
      qc.invalidateQueries({ queryKey: [QK.CAUSES] });
    },
    onError: error => {
      console.error("Error submitting volunteer form:", error);
    },
  });

  const onSubmitForm = async (data: VolunteerFormData) => {
    setIsLoading(true);

    const variables: VolunteerFormVariables = {
      cause_id: causeId,
      name: data.name,
      email: data.email,
      phone_number: data.phone,
      skills: [data.skills],
      description: data.description,
    };

    await mutation.mutateAsync(variables);
    setSubmitted(true);

    setIsLoading(false);
  };

  const isChecked = watch("terms");

  if (submitted) {
    return (
      <div className="space-y-2">
        <h2 className="text-green-600">Thank You for Volunteering!</h2>
        <p>Your application has been received. The organizer will contact you soon with more details.</p>
        <Button
          onClick={() => {
            setSubmitted(false);
            reset();
          }}
          variant="outline"
          className="bg-white/50 hover:bg-white/70"
        >
          Submit Another Application
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-lg font-semibold mb-2">Volunteer Sign-Up</h4>
        <p className="text-sm text-muted-foreground">
          Fill out this form to volunteer for this cause. Your time and skills can make a real difference.
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                {...register("name")}
                className={cn("w-full", errors.name && "border-red-500")}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                {...register("email")}
                className={cn("w-full", errors.email && "border-red-500")}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="123-456-7890"
                {...register("phone")}
                className={cn("w-full", errors.phone && "border-red-500")}
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills & Experience</Label>
              <Controller
                name="skills"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <Select onValueChange={onChange} value={value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your primary skill" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="organizing">Event Organizing</SelectItem>
                      <SelectItem value="marketing">Marketing & Promotion</SelectItem>
                      <SelectItem value="fundraising">Fundraising</SelectItem>
                      <SelectItem value="manual">Manual Labor</SelectItem>
                      <SelectItem value="technical">Technical Skills</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.skills && <p className="text-sm text-red-500">{errors.skills.message}</p>}
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="description">Additional Information</Label>
              <Textarea
                id="description"
                placeholder="Tell us about your availability, relevant experience, or any questions you have"
                className="min-h-[100px] w-full"
                {...register("description")}
              />
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox id="terms" checked={isChecked} onCheckedChange={checked => setValue("terms", !!checked)} />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to be contacted about this volunteer opportunity
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your information will only be used for this cause and won't be shared with third parties.
              </p>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !isChecked}
            className={cn("bg-blue-600 hover:bg-blue-700", isLoading && "opacity-80 cursor-not-allowed")}
          >
            {isLoading ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </div>
    </div>
  );
}
