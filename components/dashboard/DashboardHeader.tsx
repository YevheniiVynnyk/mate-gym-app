import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

export default function DashboardHeader() {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          {t("Dashboard.welcomeText")}
          {/*{user?.firstName || "Пользователь"}!*/}
        </CardTitle>
        <CardDescription className="mt-1">
          {t("Dashboard.welcomeMessage")}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
