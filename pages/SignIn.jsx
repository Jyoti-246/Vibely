import React from "react";
import SignInForm from "../features/authentication/SignInForm";
import Logo from "../ui/Logo";

const SignIn = () => {
  return (
    <div className="bg-background flex h-screen items-center">
      <div className="flex-2 text-blue-950">
        <span>
          <Logo />
        </span>
        <span className="flex flex-col gap-4">
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
            <span className="text-sm font-semibold">
              <p>⭐⭐⭐⭐⭐</p>
              <p>Used by 12k+ developers</p>
            </span>
          </div>
          <span className="text-6xl font-bold">
            More than just friends truly connect
          </span>
          <span className="w-92 text-2xl">
            Connect with global community on vibely
          </span>
        </span>
      </div>
      <div className="h-fit flex-1 rounded-xl bg-white px-8 py-5 shadow-2xl">
        <div className="flex flex-col items-center">
          <span className="font-bold">Sign in to vibely</span>
          <span className="text-xs font-medium text-stone-600">
            Welcome back! Please sign in to continue
          </span>
        </div>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignIn;
