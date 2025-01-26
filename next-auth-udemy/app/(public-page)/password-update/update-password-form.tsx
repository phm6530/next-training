"use client";

import { Button } from "@/components/ui/button";
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
import { changePassword } from "./actions";
import { passwordsMatchSchema } from "@/vaildation/passwordMatchcSchema";
import { CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function UpdatePasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof passwordsMatchSchema>>({
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
    resolver: zodResolver(passwordsMatchSchema),
  });

  const onSubmitHandler = async (
    data: z.infer<typeof passwordsMatchSchema>
  ) => {
    const response = await changePassword({
      token,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    });

    if (response?.error) {
      form.setError("root", { message: response.message });
      return;
    }
  };

  return (
    <>
      {form.formState.isSubmitSuccessful ? (
        <CardContent>
          <div className="flex flex-col">
            is Success...
            <Button onClick={() => router.replace("/login")}>test</Button>
          </div>
        </CardContent>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="flex flex-col gap-[20px]"
          >
            <FormField
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>{field.name}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="새 비밀번호"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              name="passwordConfirm"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>{field.name}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="새 비밀번호 확인"
                      />
                    </FormControl>{" "}
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button type="submit">Change Password</Button>
          </form>
        </Form>
      )}
    </>
  );
}
