"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { ArrowLeft, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const SignUpError = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full flex flex-col items-center">
        <XCircle className="w-12 h-12 text-red-500 mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Something went wrong</h1>
        <p className="text-gray-600 text-center mb-6">
          An unexpected error occurred during sign up. Please try again or return to the homepage.
        </p>
        <Button onClick={() => router.push("/login")} className="px-5 py-2">
          <ArrowLeft />
          Go to Login
        </Button>
      </div>
    </div>
  );
};

export default SignUpError;
