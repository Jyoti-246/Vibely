import React, { useState } from "react";
import { useLogin } from "./useLogin";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useLogin();

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
      className="mt-8 flex flex-col gap-2"
      onSubmit={handleSubmit}
    >
      <label htmlFor="email">Email address</label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        autoComplete="username"
        className="rounded-sm border border-stone-300 py-2 text-center"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        autoComplete="current-password"
        className="rounded-sm border border-stone-300 py-2 text-center"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className="text-bold text-md mt-4 cursor-pointer rounded-md bg-gray-800 py-2 text-white"
      >
        Submit
      </button>
    </form>
  );
};

export default SignInForm;
