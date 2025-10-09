import React, {useState} from "react";
import {ActivityIndicator, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View,} from "react-native";
import {Clock, Dumbbell, TrendingUp, Users} from "lucide-react-native";
import {useAuth} from "@/contexts/AuthContext";
import TermsDialog from "@/components/auth/TermsDialog";
import {useRouter} from "expo-router";
import TermsRequiredPage from "@/app/termsRequiredPage";

export default function WelcomeScreen() {
	const router = useRouter();
	const {user, login, register, acceptTerms, logout} = useAuth();

	const [isLoading, setIsLoading] = useState(false);
	const [showTermsRequired, setShowTermsRequired] = useState(false);
	const [isRegistering, setIsRegistering] = useState(false);

	const [loginForm, setLoginForm] = useState({login: "", password: ""});
	const [registerForm, setRegisterForm] = useState({
		email: "",
		password: "",
		login: "",
		role: "CLIENT",
	});

	const handleLogin = async () => {
		setIsLoading(true);
		try {
			await login(loginForm.login, loginForm.password);
			router.push("/dashboard");
		} catch (error) {
			console.error("Ошибка входа:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleRegister = async () => {
		setIsLoading(true);
		try {
			await register(
				registerForm.email,
				registerForm.password,
				registerForm.login,
				registerForm.role
			);
		} finally {
			setIsLoading(false);
		}
	};

	if (user && !user.hasAcceptedTerms) {
		return (
			<TermsDialog
				open={true}
				onAccept={async () => await acceptTerms()}
				onDecline={() => setShowTermsRequired(true)}
			/>
		);
	}

	if (showTermsRequired) {
		return (
			<TermsRequiredPage
				onAcceptTerms={async () => await acceptTerms()}
				onLogout={() => {
					logout();
					setShowTermsRequired(false);
				}}
			/>
		);
	}

	return (
		<KeyboardAvoidingView
			className="flex-1"
		>
			<View className="flex-1 p-2 justify-center">
				{/* HEADER */}
				<View className="items-center mb-4">
					<View className="flex-row items-center justify-center gap-3 mb-4">
						<View className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
							<Dumbbell color="#fff" size={28}/>
						</View>
						<Text className="text-3xl font-bold text-foreground font-sans">Mate Gym</Text>
					</View>

					<Text className="text-center text-2xl font-bold leading-tight font-sans">
						Твой персональный{" "}
						<Text className="text-primary font-sans">фитнес-тренер</Text> в кармане
					</Text>

					<Text className="text-center text-muted-foreground mt-3 px-3 leading-relaxed font-sans">
						Создавайте тренировки, отслеживайте прогресс и достигайте целей
						вместе с профессиональными тренерами
					</Text>
				</View>

				{/* FEATURES */}
				<View className="flex-row justify-between mt-2 mx-2 space-x-4">
					<Feature
						icon={<TrendingUp color="#4ADE80" size={22}/>}
						title="Прогресс"
						text="Следи за результатами"
					/>
					<Feature
						icon={<Users color="#34C759" size={22}/>}
						title="Тренеры"
						text="Помощь от профи"
					/>
					<Feature
						icon={<Clock color="#3B82F6" size={22}/>}
						title="Удобно"
						text="Всё под рукой"
					/>
				</View>

				{/* CARD */}
				<View className="bg-card rounded-2xl shadow-xl p-4 mt-8 mx-2">
					<View className="p-2">
						<Text className="text-2xl font-bold tracking-tight text-center font-sans">Начните прямо сейчас</Text>
						<Text className="text-muted-foreground text-sm text-center font-sans">
							Присоединяйтесь к тысячам довольных пользователей
						</Text>
					</View>

					{/* Tabs Switch */}
					<View className="flex-row justify-center mx-4 my-2 bg-background rounded-lg">
						{["Вход", "Регистрация"].map((label, index) => {
							const isActive = (!isRegistering && index === 0) || (isRegistering && index === 1);

							return (
								<TouchableOpacity
									key={label}
									className={`flex-1 p-3 m-1 ${
										isActive ? "bg-secondary rounded-lg" : "bg-muted rounded-lg"
									}`}
									onPress={() => setIsRegistering(index === 1)}
								>
									<Text
										className={`text-center font-semibold ${
											isActive ? "text-white" : "text-muted-foreground"
										}`}
									>
										{label}
									</Text>
								</TouchableOpacity>
							);
						})}
					</View>

					{/* Forms */}
					{!isRegistering ? (
						<View className="m-2">
							<Text className="text-sm font-medium leading-none p-2">Логин</Text>
							<CustomInput
								placeholder="Логин"
								value={loginForm.login}
								onChangeText={(text) =>
									setLoginForm({...loginForm, login: text})
								}
							/>
							<Text className="text-sm font-medium leading-none p-2 mt-2">Пароль</Text>
							<CustomInput
								placeholder="Пароль"
								secureTextEntry
								value={loginForm.password}
								onChangeText={(text) =>
									setLoginForm({...loginForm, password: text})
								}
							/>

							<TouchableOpacity
								className="bg-secondary rounded-lg p-3 mt-4"
								onPress={handleLogin}
								disabled={isLoading}
							>
								{isLoading ? (
									<ActivityIndicator color="#fff"/>
								) : (
									<Text className="text-center text-white font-semibold">
										Войти
									</Text>
								)}
							</TouchableOpacity>
						</View>
					) : (
						<View className="space-y-4">
							<Text className="text-sm font-medium leading-none p-2 m-2">Логин</Text>
							<CustomInput
								placeholder="Логин"
								value={registerForm.login}
								onChangeText={(text) =>
									setRegisterForm({...registerForm, login: text})
								}
							/>
							<Text className="text-sm font-medium leading-none p-2 m-2">Почта</Text>
							<CustomInput
								placeholder="Email"
								value={registerForm.email}
								onChangeText={(text) =>
									setRegisterForm({...registerForm, email: text})
								}
							/>
							<Text className="text-sm font-medium leading-none p-2 m-2">Пароль</Text>
							<CustomInput
								placeholder="Пароль"
								secureTextEntry
								value={registerForm.password}
								onChangeText={(text) =>
									setRegisterForm({...registerForm, password: text})
								}
							/>
							<TouchableOpacity
								className="bg-secondary rounded-lg p-3 m-2"
								onPress={handleRegister}
								disabled={isLoading}
							>
								{isLoading ? (
									<ActivityIndicator color="#fff"/>
								) : (
									<Text className="text-center text-white font-semibold">
										Создать аккаунт
									</Text>
								)}
							</TouchableOpacity>
						</View>
					)}
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}

function Feature({icon, title, text}) {
	return (
		<View className="flex-1 bg-card rounded-2xl shadow-xl p-3 mx-2 items-center">
			{icon}
			<Text className="text-sm font-semibold mt-2">{title}</Text>
			<Text className="text-xs text-muted-foreground text-center mt-1">
				{text}
			</Text>
		</View>
	);
}

const CustomInput = ({
						 placeholder,
						 value,
						 onChangeText,
						 secureTextEntry,
					 }: any) => (
	<TextInput
		className="border-gray-200 rounded-lg p-4 bg-background text-base text-foreground"
		placeholder={placeholder}
		placeholderTextColor="#888"
		value={value}
		secureTextEntry={secureTextEntry}
		onChangeText={onChangeText}
	/>
);
