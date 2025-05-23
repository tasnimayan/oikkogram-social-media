"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface DonationFormProps {
  causeId: string;
}

export function DonationForm({ causeId }: DonationFormProps) {
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would process the donation through a payment gateway
    console.log("Donation submitted for cause:", causeId, "Amount:", amount || customAmount);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Thank You for Your Donation!</CardTitle>
          <CardDescription>Your contribution will help make a real difference in our community.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>A receipt has been sent to your email address.</p>
          <Button onClick={() => setSubmitted(false)} variant="outline">
            Make Another Donation
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Support This Cause</CardTitle>
        <CardDescription>Your donation helps fund community initiatives and create positive change.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Donation Amount</Label>
            {/* <RadioGroup defaultValue="25" onValueChange={setAmount} className="grid grid-cols-4 gap-4">
              <div>
                <RadioGroupItem value="10" id="amount-10" className="peer sr-only" />
                <Label
                  htmlFor="amount-10"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  $10
                </Label>
              </div>
              <div>
                <RadioGroupItem value="25" id="amount-25" className="peer sr-only" />
                <Label
                  htmlFor="amount-25"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  $25
                </Label>
              </div>
              <div>
                <RadioGroupItem value="50" id="amount-50" className="peer sr-only" />
                <Label
                  htmlFor="amount-50"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  $50
                </Label>
              </div>
              <div>
                <RadioGroupItem value="100" id="amount-100" className="peer sr-only" />
                <Label
                  htmlFor="amount-100"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  $100
                </Label>
              </div>
            </RadioGroup> */}
          </div>

          <div className="space-y-2">
            <Label htmlFor="custom-amount">Custom Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5">$</span>
              <Input
                id="custom-amount"
                type="number"
                placeholder="Enter amount"
                className="pl-7"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setAmount("");
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea id="message" placeholder="Leave a message of support" className="min-h-[80px]" />
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox id="anonymous" />
            <div className="grid gap-1.5 leading-none">
              <label htmlFor="anonymous" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Make my donation anonymous
              </label>
            </div>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Donate Now
          </Button>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            Secure payment processing. Your financial information is never stored.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
