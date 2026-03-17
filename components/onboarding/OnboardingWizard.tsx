import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { Card, cn } from "@/components/ui/Card";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronRight, Check, X } from "lucide-react-native";
import { ProfileStep } from "./steps/ProfileStep";
import { BasicInfoStep } from "./steps/BasicInfoStep";
import { BodyMetricsStep } from "./steps/BodyMetricsStep";

interface OnboardingData {
  firstName?: string;
  lastName?: string;
  imageId?: number;
  gender?: "male" | "female";
  birthday?: Date;
  weight?: string;
  height?: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function OnboardingWizard({ visible, onClose }: Props) {
  const { user, updateUserOnboarding } = useAuth();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
  });

  if (!user) return null;

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    const formattedData = {
      ...data,
      birthday: data.birthday
        ? data.birthday.toISOString().split("T")[0]
        : undefined,
    };
    await updateUserOnboarding(formattedData);
    onClose();
  };

  const handleSkip = async () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      handleFinish();
    }
  };

  const updateData = (key: string, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const isStepValid = () => {
    switch (step) {
      case 0: // Profile Info
        return !!data.firstName?.trim() && !!data.lastName?.trim();
      case 1: // Basic Info
        return !!data.gender && !!data.birthday;
      case 2: // Body Metrics
        return !!data.weight && !!data.height;
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <ProfileStep data={data} updateData={updateData} />;
      case 1:
        return <BasicInfoStep data={data} updateData={updateData} />;
      case 2:
        return <BodyMetricsStep data={data} updateData={updateData} />;
      default:
        return null;
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      backdropColor="rgb(240 253 244)"
    >
      <View className="flex-1 bg-green-50/90 dark:bg-green-900/90 justify-center items-center p-4">
        <Card className="w-full bg-card dark:bg-gray-800 ocean:bg-ocean-card p-6 rounded-3xl shadow-xl relative">
          {/* Кнопка закрытия */}
          <TouchableOpacity
            onPress={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-secondary/50 rounded-full"
          >
            <X size={20} className="text-muted-foreground" />
          </TouchableOpacity>

          <View className="mt-4">{renderStep()}</View>

          <View className="flex-row justify-between mt-8 items-center">
            <TouchableOpacity onPress={handleSkip} className="p-2">
              <Text className="text-muted-foreground font-medium">Skip</Text>
            </TouchableOpacity>

            <View className="flex-row gap-1">
              {[0, 1, 2].map((i) => (
                <View
                  key={i}
                  className={cn(
                    "w-2 h-2 rounded-full",
                    i === step ? "bg-primary" : "bg-gray-300 dark:bg-gray-600",
                  )}
                />
              ))}
            </View>

            <TouchableOpacity
              onPress={handleNext}
              disabled={!isStepValid()}
              className={cn(
                "px-6 py-3 rounded-xl flex-row items-center shadow-md",
                isStepValid()
                  ? "bg-primary dark:bg-primary-600 ocean:bg-ocean-primary"
                  : "bg-gray-300 dark:bg-gray-700 opacity-50",
              )}
            >
              <Text
                className={cn(
                  "font-bold mr-2",
                  isStepValid() ? "text-white" : "text-gray-500",
                )}
              >
                {step === 2 ? "Finish" : "Next"}
              </Text>
              {step === 2 ? (
                <Check size={18} color={isStepValid() ? "white" : "gray"} />
              ) : (
                <ChevronRight
                  size={18}
                  color={isStepValid() ? "white" : "gray"}
                />
              )}
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    </Modal>
  );
}
