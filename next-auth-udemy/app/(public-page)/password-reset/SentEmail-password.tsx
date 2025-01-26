import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SentEmailPassword({ email }: { email: string }) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        {" "}
        <CardTitle>Email Sent</CardTitle>
      </CardHeader>
      <CardContent>
        email 발송 완료...
        {email}
      </CardContent>
    </Card>
  );
}
