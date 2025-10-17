import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Globe } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { styled } from 'nativewind';

const StyledView = styled(View);
//const StyledText = styled(Text);

const languages = [
    { key: 'ru', name: 'Русский', flag: '🇷🇺' },
    { key: 'en', name: 'English', flag: '🇺🇸' },
    { key: 'es', name: 'Español', flag: '🇪🇸' },
    { key: 'fr', name: 'Français', flag: '🇫🇷' },
    { key: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { key: 'it', name: 'Italiano', flag: '🇮🇹' },
    { key: 'pt', name: 'Português', flag: '🇵🇹' },
    { key: 'pl', name: 'Polski', flag: '🇵🇱' },
    { key: 'uk', name: 'Українська', flag: '🇺🇦' },
    { key: 'tr', name: 'Türkçe', flag: '🇹🇷' },
];

const LanguageSelector: React.FC = () => {
    const { i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

    useEffect(() => {
        setSelectedLanguage(i18n.language);
    }, [i18n.language]);

    const handleLanguageChange = (language: string) => {
        i18n.changeLanguage(language);
        setSelectedLanguage(language);
    };

    const currentLanguage = languages.find((lang) => lang.key === selectedLanguage);

    return (
        <StyledView className="flex flex-row items-center gap-2 p-2 bg-white rounded-md border">
            <Globe size={20} color="black" />
            <Picker
                selectedValue={selectedLanguage}
                onValueChange={handleLanguageChange}
                className="flex-1"
            >
                {languages.map((language) => (
                    <Picker.Item
                        key={language.key}
                        label={`${language.flag} ${language.name}`}
                        value={language.key}
                    />
                ))}
            </Picker>
        </StyledView>
    );
};

export default LanguageSelector;
