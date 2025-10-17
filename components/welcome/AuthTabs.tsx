import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type Props = {
    isRegistering: boolean;
    setIsRegistering: (value: boolean) => void;
};

const AuthTabs: React.FC<Props> = ({ isRegistering, setIsRegistering }) => (
    <View className="flex-row justify-center mx-4 my-2 bg-background rounded-lg">
        {['Вход', 'Регистрация'].map((label, index) => {
            const isActive = (!isRegistering && index === 0) || (isRegistering && index === 1);

            return (
                <TouchableOpacity
                    key={label}
                    className={`flex-1 p-3 m-1 ${
                        isActive ? 'bg-secondary rounded-lg' : 'bg-muted rounded-lg'
                    }`}
                    onPress={() => setIsRegistering(index === 1)}
                >
                    <Text
                        className={`text-center font-semibold ${
                            isActive ? 'text-white' : 'text-muted-foreground'
                        }`}
                    >
                        {label}
                    </Text>
                </TouchableOpacity>
            );
        })}
    </View>
);

export default AuthTabs;
