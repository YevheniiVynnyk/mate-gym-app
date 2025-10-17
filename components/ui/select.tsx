import * as React from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Check, ChevronDown, ChevronUp } from 'lucide-react-native';

export interface SelectOption {
    label: string;
    value: string;
}

export interface SelectProps {
    selectedValue: string;
    onValueChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
}

export const Select = ({ selectedValue, onValueChange, options, placeholder }: SelectProps) => {
    const [open, setOpen] = React.useState(false);

    const selectedLabel = options.find((opt) => opt.value === selectedValue)?.label || '';

    return (
        <View>
            {/* Trigger */}
            <SelectTrigger onPress={() => setOpen(true)}>
                <SelectValue>{selectedLabel || placeholder || 'Select...'}</SelectValue>
            </SelectTrigger>

            {/* Modal with content */}
            <SelectContent open={open} onClose={() => setOpen(false)}>
                <SelectScrollUpButton onPress={() => {}} />
                <ScrollView>
                    <SelectGroup>
                        {options.map((opt) => (
                            <SelectItem
                                key={opt.value}
                                selected={selectedValue === opt.value}
                                onPress={() => {
                                    onValueChange(opt.value);
                                    setOpen(false);
                                }}
                            >
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </ScrollView>
                <SelectScrollDownButton onPress={() => {}} />
            </SelectContent>
        </View>
    );
};

// ===== Trigger =====
export const SelectTrigger: React.FC<{ onPress: () => void }> = ({ children, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        className={
            'flex h-10 w-full flex-row items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2'
        }
    >
        {children}
        <ChevronDown size={20} color="#6B7280" />
    </TouchableOpacity>
);

// ===== Value =====
export const SelectValue: React.FC = ({ children }) => <Text className="text-sm">{children}</Text>;

// ===== Content =====
export const SelectContent: React.FC<{
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}> = ({ open, onClose, children }) => (
    <Modal transparent visible={open} animationType="fade">
        {/* Overlay */}
        <TouchableOpacity
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
            onPress={onClose}
        />

        {/* Content */}
        <View className="absolute top-20 left-4 right-4 rounded-md bg-white p-2 shadow-lg">
            {children}
        </View>
    </Modal>
);

// ===== Group =====
export const SelectGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <View className="space-y-1">{children}</View>
);

// ===== Item =====
export const SelectItem: React.FC<{
    selected?: boolean;
    onPress: () => void;
    children: React.ReactNode;
}> = ({ selected, onPress, children }) => (
    <TouchableOpacity onPress={onPress} className={cn('flex-row items-center px-3 py-2')}>
        <Text className="flex-1 text-sm">{children}</Text>
        {selected && <Check size={18} color="green" />}
    </TouchableOpacity>
);

// ===== Label =====
export const SelectLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Text className="px-3 py-1 text-sm font-semibold">{children}</Text>
);

// ===== Separator =====
export const SelectSeparator: React.FC = () => <View className="h-px bg-gray-300 my-1" />;

// ===== Scroll Buttons =====
export const SelectScrollUpButton: React.FC<{ onPress: () => void }> = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} className="flex items-center py-1">
        <ChevronUp size={20} />
    </TouchableOpacity>
);

export const SelectScrollDownButton: React.FC<{ onPress: () => void }> = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} className="flex items-center py-1">
        <ChevronDown size={20} />
    </TouchableOpacity>
);

export { Select as SelectRoot };
