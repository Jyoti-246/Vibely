import React from "react";
import SignInForm from "../features/authentication/SignInForm";
import Logo from "../ui/Logo";

const SignIn = () => {
  return (
    <div className="bg-background flex h-screen flex-col gap-8 p-10 md:flex-row md:gap-0">
      <Logo />

      <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
        <span className="mt-10 flex flex-col gap-4 md:mt-0 md:flex-2">
          <div className="flex gap-2">
            <span className="flex -space-x-4">
              <img
                src="https://img.freepik.com/premium-vector/cute-woman-avatar-profile-vector-illustration_1058532-14546.jpg"
                alt=""
                className="h-9 w-9 rounded-full"
              />
              <img
                src="https://static.vecteezy.com/system/resources/previews/000/654/820/large_2x/vector-woman-face-cartoon.jpg"
                alt=""
                className="h-9 w-9 rounded-full"
              />
              <img
                src="https://img.freepik.com/premium-vector/woman-with-smile-her-face-is-smiling_1025827-108569.jpg"
                alt=""
                className="h-9 w-9 rounded-full"
              />
            </span>
            <span className="text-text-secondary text-sm font-semibold">
              <p>⭐⭐⭐⭐⭐</p>
              <p>Used by 12k+ developers</p>
            </span>
          </div>
          <span className="text-text-primary text-2xl font-bold sm:text-3xl md:text-5xl lg:text-6xl">
            More than just friends truly connect
          </span>
          <span className="text-text-secondary md:2xl text-lg">
            Connect with global community on vibely
          </span>
        </span>
        <div className="mt-10 w-full rounded-xl bg-white px-8 py-5 shadow-2xl md:mt-0 md:flex-1">
          <div className="flex flex-col items-center">
            <span className="font-bold">Sign in to vibely</span>
            <span className="text-xs font-medium text-stone-600">
              Welcome back! Please sign in to continue
            </span>
          </div>
          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
