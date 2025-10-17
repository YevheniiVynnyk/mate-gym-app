import React, { useState } from 'react';
import { View, Text, Pressable, Modal, ScrollView } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

interface NavigationMenuItem {
    label: string;
    content?: React.ReactNode;
}

interface NavigationMenuProps {
    items: NavigationMenuItem[];
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({ items }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleMenu = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <StyledView className="flex-row items-center justify-center">
            {items.map((item, index) => (
                <StyledView key={index} className="mr-2">
                    <StyledPressable
                        onPress={() => toggleMenu(index)}
                        className="flex-row items-center px-4 py-2 bg-white rounded-md shadow"
                    >
                        <StyledText className="text-sm font-medium">{item.label}</StyledText>
                        <ChevronDown size={16} className="ml-1" />
                    </StyledPressable>

                    <Modal
                        visible={openIndex === index}
                        transparent
                        animationType="fade"
                        onRequestClose={() => setOpenIndex(null)}
                    >
                        <Pressable
                            style={{ flex: 1 }}
                            onPress={() => setOpenIndex(null)}
                            className="bg-black/50 flex-1"
                        >
                            <StyledView className="bg-white m-4 rounded-lg p-4 shadow">
                                <ScrollView>{item.content}</ScrollView>
                            </StyledView>
                        </Pressable>
                    </Modal>
                </StyledView>
            ))}
        </StyledView>
    );
};
