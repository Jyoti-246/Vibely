import React, { useState } from "react";
import { useSignup } from "./useSignup";

const inputClass =
  "rounded-lg border border-stone-300 px-3 py-2.5 text-stone-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200";
const labelClass = "text-sm font-medium text-stone-700";

const SignUpForm = () => {
  const [user_name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isPending } = useSignup();

  function handleSubmit(e) {
    e.preventDefault();
    if (!user_name || !email || !password) return;
    signup({ user_name, email, password });
  }

  return (
    <form className="mt-4 flex flex-col gap-1.5" onSubmit={handleSubmit}>
      <label htmlFor="user_name" className={labelClass}>
        Username
      </label>
      <input
        type="text"
        id="user_name"
        value={user_name}
        autoComplete="username"
        placeholder="jane_doe"
        className={`mb-2 ${inputClass}`}
        onChange={(e) => setUserName(e.target.value)}
        disabled={isPending}
      />

      <label htmlFor="signup-email" className={labelClass}>
        Email address
      </label>
      <input
        type="email"
        id="signup-email"
        value={email}
        autoComplete="email"
        placeholder="you@example.com"
        className={`mb-2 ${inputClass}`}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isPending}
      />

      <label htmlFor="signup-password" className={labelClass}>
        Password
      </label>
      <input
        type="password"
        id="signup-password"
        value={password}
        autoComplete="new-password"
        placeholder="At least 4 characters"
        className={inputClass}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isPending}
      />

      <button
        type="submit"
        disabled={isPending}
        className="bg-primary hover:bg-primary-hover mt-5 cursor-pointer rounded-lg py-2.5 font-semibold text-white shadow-md transition-colors disabled:opacity-60"
      >
        {isPending ? (
          <>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          </>
        ) : (
          "Create account"
        )}
      </button>
    </form>
  );
};

export default SignUpForm;
