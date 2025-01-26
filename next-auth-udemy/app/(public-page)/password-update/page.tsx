import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db/db";
import { passwordResetTokens } from "@/db/passswordResetTokenSchema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import UpdatePasswordForm from "./update-password-form";

export default async function PasswordUpdatePage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const token = (await searchParams).token;

  let isVaildPage = false;

  if (!token) {
    notFound();
  }

  const [row] = await db
    .select()
    .from(passwordResetTokens)
    .where(eq(passwordResetTokens.token, token));

  if (row) {
    const now = Date.now();

    if (!!row.tokenExpriy && now < row.tokenExpriy?.getTime()) {
      isVaildPage = true;
    }
  }

  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>
            {isVaildPage ? "Update Password" : "Expired Page"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isVaildPage ? (
            <UpdatePasswordForm token={token} />
          ) : (
            "해당 페이지는 만료된 페이지 입니다."
          )}
        </CardContent>
      </Card>
    </main>
  );
}
