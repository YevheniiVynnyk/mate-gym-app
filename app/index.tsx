import React from "react";
import Welcome from "@/app/(auth)/welcome";
import Dashboard from "@/app/(main)/dashboard";
import { useAuth } from "@/contexts/AuthContext";

export default function Index() {
  const { user } = useAuth();

  if (user) {
    return <Dashboard />;
  }

  return <Welcome />;
}
