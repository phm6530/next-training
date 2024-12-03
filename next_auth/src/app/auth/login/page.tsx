"use client";

import { signIn, useSession } from "next-auth/react";
import { FormEvent } from "react";

export default function Page() {
  const session = useSession();

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(session);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("email");
    const password = formData.get("password");

    const result = await signIn("credentials", {
      email: name,
      password,
    });
    console.log(result);
  };

  return (
    <>
      Login Page
      <form onSubmit={onSubmitHandler}>
        <input type="text" name="email" />
        <input type="password" name="password" />
        <button>Submit</button>
      </form>
    </>
  );
}
