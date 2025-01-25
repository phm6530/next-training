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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "email 형식이 아닙니다." }),
});

export default function PasswordResetPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onClickHandler = async (data: z.infer<typeof formSchema>) => {};

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Password Reset</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onClickHandler)}
              className="flex flex-col gap-[20px]"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="your email" />
                      </FormControl>{" "}
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button type="submit">submit</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col">
          <div className="text-muted-foreground text-sm">
            Remember your password{" "}
            <Link className="underline" href={"/login"}>
              Login
            </Link>
          </div>
          <div className="text-muted-foreground text-sm">
            Dont have an account?{" "}
            <Link className="underline" href={"/register"}>
              Register
            </Link>
          </div>{" "}
        </CardFooter>
      </Card>
    </div>
  );
}
