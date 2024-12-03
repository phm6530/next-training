import { auth, signOut } from "@/app/auth";
import Link from "next/link";

export default async function GlobalNav() {
  const session = await auth();

  const logout = async () => {
    "use server";
    await signOut();
  };

  return (
    <div>
      <Link href={"/"}>Home</Link>
      {session ? (
        <form action={logout}>
          <button>로그아웃</button>
        </form>
      ) : (
        <Link href={"/auth/login"}>로그인</Link>
      )}
    </div>
  );
}
