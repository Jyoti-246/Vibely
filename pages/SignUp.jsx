import React from "react";
import { Link } from "react-router-dom";
import SignUpForm from "../features/authentication/SignUpForm";
import Logo from "../ui/Logo";

const SignUp = () => {
  return (
    <div className="bg-background flex min-h-screen flex-col gap-8 p-6 md:flex-row md:gap-0 md:p-10">
      <Logo />

      <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
        <span className="mt-10 flex flex-col gap-4 md:mt-0 md:flex-2">
          <span className="text-text-primary text-2xl font-bold sm:text-3xl md:text-5xl lg:text-6xl">
            Join the vibely community
          </span>
          <span className="text-text-secondary text-lg">
            Create your account and start connecting today.
          </span>
        </span>

        <div className="w-full md:mt-0 md:flex-1">
          <div className="mt-10 w-full rounded-2xl bg-white px-8 py-6 shadow-2xl md:mt-0 md:flex-1">
            <div className="flex flex-col items-center">
              <span className="font-bold">Create your account</span>
              <span className="text-xs font-medium text-stone-600">
                It only takes a few seconds
              </span>
            </div>

            <SignUpForm />

            <p className="mt-4 text-center text-sm text-stone-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
