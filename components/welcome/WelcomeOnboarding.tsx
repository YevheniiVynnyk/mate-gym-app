import React, {useState} from "react";
import {ScrollView, Text, TextInput, TouchableOpacity, View,} from "react-native";

interface FormData {
	firstName: string;
	lastName: string;
	age: string;
	phone: string;
	goal: string;
	experience: string;
}

interface WelcomeOnboardingProps {
	onComplete: (data: FormData) => void;
	onSkip: () => void;
}

const WelcomeOnboarding: React.FC<WelcomeOnboardingProps> = ({
																 onComplete,
																 onSkip,
															 }) => {
	const [currentStep, setCurrentStep] = useState(1);
	const [formData, setFormData] = useState<FormData>({
		firstName: "",
		lastName: "",
		age: "",
		phone: "",
		goal: "",
		experience: "",
	});

	const totalSteps = 4;

	const handleNext = () => {
		if (!validateStep()) return;
		if (currentStep < totalSteps) {
			setCurrentStep(currentStep + 1);
		} else {
			onComplete(formData);
		}
	};

	const handleBack = () => {
		if (currentStep > 1) setCurrentStep(currentStep - 1);
	};

	const updateFormData = (field: keyof FormData, value: string) => {
		setFormData((prev) => ({...prev, [field]: value}));
	};

	const validateStep = () => {
		if (currentStep === 1) {
			return formData.firstName && formData.lastName && formData.age && formData.phone;
		}
		if (currentStep === 2) return !!formData.goal;
		if (currentStep === 3) return !!formData.experience;
		return true;
	};

	const renderStep = () => {
		switch (currentStep) {
			case 1:
				return (
					<View className="space-y-4">
						<Text className="text-xl font-bold">Step 1: Personal Info</Text>
						<TextInput
							className="border p-3 rounded bg-gray-50"
							placeholder="First Name"
							value={formData.firstName}
							onChangeText={(text) => updateFormData("firstName", text)}
						/>
						<TextInput
							className="border p-3 rounded bg-gray-50"
							placeholder="Last Name"
							value={formData.lastName}
							onChangeText={(text) => updateFormData("lastName", text)}
						/>
						<TextInput
							className="border p-3 rounded bg-gray-50"
							placeholder="Age"
							keyboardType="number-pad"
							value={formData.age}
							onChangeText={(text) => updateFormData("age", text)}
						/>
						<TextInput
							className="border p-3 rounded bg-gray-50"
							placeholder="Phone"
							keyboardType="phone-pad"
							value={formData.phone}
							onChangeText={(text) => updateFormData("phone", text)}
						/>
					</View>
				);

			case 2:
				return (
					<View className="space-y-4">
						<Text className="text-xl font-bold">Step 2: Your Goal</Text>
						{["weightLoss", "muscleGain", "fitness", "strength"].map((goal) => (
							<TouchableOpacity
								key={goal}
								className={`p-3 border rounded ${
									formData.goal === goal ? "bg-blue-200 border-blue-500" : "bg-gray-50"
								}`}
								onPress={() => updateFormData("goal", goal)}
							>
								<Text className="text-lg">{goal}</Text>
							</TouchableOpacity>
						))}
					</View>
				);

			case 3:
				return (
					<View className="space-y-4">
						<Text className="text-xl font-bold">Step 3: Experience Level</Text>
						{["beginner", "intermediate", "advanced"].map((level) => (
							<TouchableOpacity
								key={level}
								className={`p-3 border rounded ${
									formData.experience === level ? "bg-blue-200 border-blue-500" : "bg-gray-50"
								}`}
								onPress={() => updateFormData("experience", level)}
							>
								<Text className="text-lg">{level}</Text>
							</TouchableOpacity>
						))}
					</View>
				);

			case 4:
				return (
					<View className="space-y-4">
						<Text className="text-xl font-bold">All Done!</Text>
						<Text>Name: {formData.firstName} {formData.lastName}</Text>
						<Text>Goal: {formData.goal}</Text>
						<Text>Experience: {formData.experience}</Text>
					</View>
				);

			default:
				return null;
		}
	};

	return (
		<View className="flex-1 bg-white">
			<ScrollView contentContainerStyle={{padding: 16, flexGrow: 1}}>
				{/* Progress */}
				<View className="flex-row justify-center mb-4">
					<Text className="text-sm text-gray-500">
						Step {currentStep} of {totalSteps}
					</Text>
				</View>

				{renderStep()}

				{/* Buttons */}
				<View className="flex-row justify-between mt-8">
					{currentStep > 1 && (
						<TouchableOpacity
							className="bg-gray-300 p-3 rounded flex-1 mr-2"
							onPress={handleBack}
						>
							<Text className="text-center font-bold">Back</Text>
						</TouchableOpacity>
					)}
					<TouchableOpacity
						className="bg-blue-500 p-3 rounded flex-1 ml-2"
						onPress={handleNext}
					>
						<Text className="text-center text-white font-bold">
							{currentStep === totalSteps ? "Finish" : "Next"}
						</Text>
					</TouchableOpacity>
				</View>

				{currentStep < totalSteps && (
					<TouchableOpacity className="mt-4 p-3" onPress={onSkip}>
						<Text className="text-center text-blue-500">Skip</Text>
					</TouchableOpacity>
				)}
			</ScrollView>
		</View>
	);
};

export default WelcomeOnboarding;
