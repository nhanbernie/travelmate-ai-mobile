import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Slot } from "expo-router";

export default function Layout() {
  return (
    <AuthLayout>
      <Slot />
    </AuthLayout>
  );
}
