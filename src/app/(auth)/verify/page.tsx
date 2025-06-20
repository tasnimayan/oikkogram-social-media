import React from "react";
import { CheckCircle } from "lucide-react";

const VerifySignUp = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full flex flex-col items-center">
        <CheckCircle className="w-12 h-12 text-blue-500 mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Check your email</h1>
        <p className="text-gray-600 text-center">A sign-in link has been sent to your email address.</p>
      </div>
    </div>
  );
};

export default VerifySignUp;
