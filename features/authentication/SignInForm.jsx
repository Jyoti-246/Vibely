import React, { useState } from "react";
import { useLogin } from "./useLogin";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    login(
      {
        email,
        password,
      },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      },
    );
  }

  return (
    <form
      action=""
      className="mt-4 flex flex-col gap-1.5"
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="text-sm font-medium text-stone-700">
        Email address
      </label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        autoComplete="username"
        className="mb-2 rounded-lg border border-stone-300 px-3 py-2.5 text-stone-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
        onChange={(e) => setEmail(e.target.value)}
        disabled={isPending}
      />
      <label htmlFor="password" className="text-sm font-medium text-stone-700">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        autoComplete="current-password"
        className="rounded-lg border border-stone-300 px-3 py-2.5 text-stone-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
        onChange={(e) => setPassword(e.target.value)}
        disabled={isPending}
      />

      <button
        type="submit"
        disabled={isPending}
        className="bg-primary hover:bg-primary-hover mt-5 flex cursor-pointer justify-center rounded-lg py-2.5 font-semibold text-white shadow-md transition-colors"
      >
        {isPending ? (
          <>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          </>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default SignInForm;
