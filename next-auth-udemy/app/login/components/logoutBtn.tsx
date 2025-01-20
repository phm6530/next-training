"use client";
import { Button } from "@/components/ui/button";
import { logout } from "../actions";

export default function LogoutBtn() {
  return (
    <Button size={"sm"} onClick={logout}>
      logout
    </Button>
  );
}
