import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types/user';
import { authService } from '@/services/authService';
import { userService } from '@/services/userService';
import { fromUserDTO } from "@/services/mapper/userMapper";
import { tosService } from "@/services/tosService";

interface AuthContextType {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	register: (email: string, password: string, name: string, userType: 'CLIENT' | 'TRAINER') => Promise<void>;
	isLoading: boolean;
	updateUserOnboarding: (data: any) => void;
	acceptTerms: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const initAuth = async () => {
			const token = await AsyncStorage.getItem('access_token');
			console.log('token', token);
			if (token) {
				try {
					console.log("Request user token");
					console.log('token', token);
					const userData = await userService.getMe();
					const mappedUser = fromUserDTO(userData);

					const hasAcceptedTerms = await tosService.checkAccepted(mappedUser.id);

					const userWithTermsStatus = {
						...mappedUser,
						isFirstLogin: false,
						hasAcceptedTerms: hasAcceptedTerms
					};

					setUser(userWithTermsStatus);
					await AsyncStorage.setItem('fittracker_user', JSON.stringify(userWithTermsStatus));
				} catch (error) {
					console.error('Failed to get current user:', error);
					await AsyncStorage.multiRemove(['access_token', 'refresh_token', 'fittracker_user']);
				}
			}
			setIsLoading(false);
		};

		initAuth();
	}, []);

	const login = async (login: string, password: string) => {
		setIsLoading(true);
		try {
			const tokenData = await authService.signIn({ login, password });
			await handleAuthSuccess(tokenData);
		} catch (error) {
			console.error('Login failed:', error);
			throw new Error('Неверные учетные данные');
		} finally {
			setIsLoading(false);
		}
	};

	const register = async (
		email: string,
		password: string,
		login: string,
		role: 'CLIENT' | 'TRAINER'
	) => {
		setIsLoading(true);
		try {
			const tokenData = await authService.signUp({ login, password, email, role });
			await handleAuthSuccess(tokenData);
		} catch (error) {
			console.error('Registration failed:', error);
			throw new Error('Ошибка регистрации');
		} finally {
			setIsLoading(false);
		}
	};

	const handleAuthSuccess = async (tokenData: any) => {
		await AsyncStorage.setItem('access_token', tokenData.accessToken);
		await AsyncStorage.setItem('refresh_token', tokenData.refreshToken);

		const userData = await userService.getMe();
		const mappedUser = fromUserDTO(userData);

		const hasAcceptedTerms = await tosService.checkAccepted(mappedUser.id);

		const isNewUser = !(await AsyncStorage.getItem('fittracker_user'));
		const userWithFirstLogin = {
			...mappedUser,
			isFirstLogin: isNewUser,
			hasAcceptedTerms: hasAcceptedTerms
		};

		setUser(userWithFirstLogin);
		await AsyncStorage.setItem('fittracker_user', JSON.stringify(userWithFirstLogin));
	};

	const logout = async (): Promise<void> => {
		console.log("LogOut!");
		console.log(await AsyncStorage.getItem('access_token'));
		await AsyncStorage.multiRemove(['fittracker_user', 'access_token', 'refresh_token']);
		console.log(await AsyncStorage.getItem('access_token'));
		console.log("LogOut End!");
		setUser(null);
		setIsLoading(false);
	};



	const updateUserOnboarding = async (data: any) => {
		if (user) {
			const updatedUser = {
				...user,
				firstName: data.firstName || user.firstName,
				lastName: data.lastName || user.lastName,
				age: data.age ? parseInt(data.age) : user.age,
				phoneNumber: data.phone || user.phoneNumber,
				isFirstLogin: false,
				onboardingData: {
					goal: data.goal,
					experience: data.experience,
					completedAt: new Date()
				}
			};
			setUser(updatedUser);
			await AsyncStorage.setItem('fittracker_user', JSON.stringify(updatedUser));
		}
	};

	const acceptTerms = async () => {
		if (user) {
			try {
				await tosService.accept(user.id);
				const updatedUser = {
					...user,
					hasAcceptedTerms: true
				};
				setUser(updatedUser);
				await AsyncStorage.setItem('fittracker_user', JSON.stringify(updatedUser));
			} catch (error) {
				console.error('Failed to accept terms:', error);
				throw error;
			}
		}
	};

	return (
		<AuthContext.Provider value={{ user, setUser, login, logout, register, isLoading, updateUserOnboarding, acceptTerms }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};