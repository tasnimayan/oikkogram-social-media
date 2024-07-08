"use client"
import { useRouter } from 'next/navigation';
import React from 'react';

const SignUpError = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Error. Something went wrong</h1>
    </div>
  );
};

export default SignUpError;