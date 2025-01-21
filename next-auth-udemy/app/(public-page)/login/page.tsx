"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/vaildation/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginUser } from "./actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmitHandler = async (data: z.infer<typeof loginSchema>) => {
    await loginUser({ email: data.email, password: data.password });
    router.refresh();
  };

  return (
    <main className="flex justify-center items-center min h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitHandler)}
              className="flex flex-col gap-[20px]"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>login</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="login" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="password"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <Button type="submit">login</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col">
          <div className="text-muted-foreground text-sm">
            Dont have an coount?{" "}
            <Link className="underline" href={"/register"}>
              Register
            </Link>
          </div>{" "}
          <div className="text-muted-foreground text-sm">
            Forget your password{" "}
            <Link className="underline" href={"/register"}>
              Reset My password
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
