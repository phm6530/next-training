"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerUser } from "./actions";
import { registerSchema } from "@/vaildation/registerSchema";

export default function Register() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof registerSchema>) => {
    const response = await registerUser(data);
    console.log(response);
  };

  return (
    <main className="flex justify-center items-center min h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
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
                        <Input {...field} />
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
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Password 확인</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <Button type="submit">Register</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
