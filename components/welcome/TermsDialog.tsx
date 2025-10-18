import React, {useEffect, useState} from "react";
import {ActivityIndicator, Modal, ScrollView, Text, TouchableOpacity, View,} from "react-native";
import {TosContent, tosService} from "@/services/tosService";

interface TermsDialogProps {
	open: boolean;
	onAccept: () => Promise<void>;
	onDecline: () => void;
}

const TermsDialog: React.FC<TermsDialogProps> = ({open, onAccept, onDecline}) => {
	const [isAccepting, setIsAccepting] = useState(false);
	const [tosContent, setTosContent] = useState<TosContent | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (open) loadTosContent();
	}, [open]);

	const loadTosContent = async () => {
		setIsLoading(true);
		try {
			const content = await tosService.getCurrent();
			setTosContent(content);
		} catch (error) {
			console.error("Failed to load terms content:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleAccept = async () => {
		setIsAccepting(true);
		try {
			await onAccept();
		} catch (error) {
			console.error("Failed to accept terms:", error);
		} finally {
			setIsAccepting(false);
		}
	};

	return (
		<Modal visible={open} transparent animationType="slide" onRequestClose={onDecline}>
			<View className="flex-1 bg-black/50 justify-center items-center">
				<View className="bg-white rounded-2xl p-5 w-[90%] max-h-[85%]">
					<Text className="text-xl font-bold text-center mb-1">Условия использования</Text>
					<Text className="text-center text-gray-500 text-sm mb-3">
						Пожалуйста, ознакомьтесь с условиями использования приложения
					</Text>

					<View className="flex-1 border border-gray-200 rounded-lg p-3 mb-4">
						{isLoading ? (
							<View className="flex-1 justify-center items-center h-72">
								<ActivityIndicator size="small" color="#007AFF"/>
								<Text className="mt-2 text-gray-600">Загрузка...</Text>
							</View>
						) : (
							<ScrollView showsVerticalScrollIndicator>
								<Text className="text-xs text-gray-500 mb-2">
									Версия: {tosContent?.version ?? "1.0"} | Опубликовано:{" "}
									{tosContent?.publishedAt
										? new Date(tosContent.publishedAt).toLocaleDateString()
										: "—"}
								</Text>

								<View className="pb-5">
									<Text className="text-base font-semibold mt-2">1. Общие положения</Text>
									<Text className="text-sm text-gray-700 mt-1 leading-5">
										Настоящее пользовательское соглашение регулирует отношения между
										администрацией приложения Mate Gym и пользователем при использовании
										приложения.
									</Text>

									<Text className="text-base font-semibold mt-3">2. Предмет соглашения</Text>
									<Text className="text-sm text-gray-700 mt-1 leading-5">
										Приложение предоставляет пользователю возможность планировать тренировки,
										отслеживать прогресс и взаимодействовать с тренерами.
									</Text>

									<Text className="text-base font-semibold mt-3">
										3. Права и обязанности пользователя
									</Text>
									<Text className="text-sm text-gray-700 mt-1 leading-5 ml-2">
										• Предоставлять достоверную информацию при регистрации{"\n"}
										• Не нарушать работу приложения{"\n"}
										• Соблюдать конфиденциальность данных других пользователей
									</Text>

									<Text className="text-base font-semibold mt-3">4. Конфиденциальность</Text>
									<Text className="text-sm text-gray-700 mt-1 leading-5">
										Администрация обязуется не разглашать персональные данные пользователей без
										их согласия.
									</Text>

									<Text className="text-base font-semibold mt-3">5. Ответственность</Text>
									<Text className="text-sm text-gray-700 mt-1 leading-5">
										Пользователь несет полную ответственность за безопасность своих учетных
										данных и все действия, совершенные под его аккаунтом.
									</Text>

									<Text className="text-base font-semibold mt-3">6. Изменения соглашения</Text>
									<Text className="text-sm text-gray-700 mt-1 leading-5">
										Администрация имеет право изменять условия соглашения с уведомлением
										пользователей.
									</Text>
								</View>
							</ScrollView>
						)}
					</View>

					<View className="flex-row justify-between space-x-3">
						<TouchableOpacity
							className="flex-1 border border-gray-300 rounded-lg py-2 items-center"
							onPress={onDecline}
							disabled={isAccepting}
						>
							<Text className="text-gray-700 font-semibold">Отклонить</Text>
						</TouchableOpacity>

						<TouchableOpacity
							className={`flex-1 rounded-lg py-2 items-center ${
								isAccepting ? "bg-blue-400" : "bg-blue-500"
							}`}
							onPress={handleAccept}
							disabled={isAccepting}
						>
							<Text className="text-white font-semibold">
								{isAccepting ? "Принимаю..." : "Принять"}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default TermsDialog;
