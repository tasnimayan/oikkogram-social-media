"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { ArrowLeft, XCircle } from "lucide-react";

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
        <button
          onClick={() => router.push("/login")}
          className="px-5 py-2 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
        >
          <ArrowLeft />
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default SignUpError;
