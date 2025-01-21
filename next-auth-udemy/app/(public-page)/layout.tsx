import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (session?.user?.id) {
    redirect("/account-page");
  }
  return <>{children}</>;
}
