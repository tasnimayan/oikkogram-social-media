"use client";
import LoginForm from "@/components/features/auth/login-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SignInForm from "@/components/features/auth/signin-form";

export default function LoginPage() {
  const [isEmailLogin, setIsEmailLogin] = useState(false);

  return (
    <div className="min-h-dvh flex justify-center py-20 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl h-fit overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 lg:p-12">
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold">Login</h1>
              <p className="text-muted-foreground">Login to your account</p>
            </div>

            {!isEmailLogin ? <LoginForm /> : <SignInForm />}

            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border mt-2">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>

            <div className="flex justify-center mt-8 mb-2">
              <Button variant="outline" className="w-full" onClick={() => setIsEmailLogin(!isEmailLogin)}>
                {isEmailLogin ? "Login with Credentials" : "Login with Email"}
              </Button>
            </div>

            <div className="text-center mt-4">
              <p className="text-gray-500 text-sm">
                Need an account?
                <a
                  href="/signup"
                  className="ms-1 underline text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
          <div className="relative hidden bg-muted md:block p-4">
            <img
              src="/images/login-page-image.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
