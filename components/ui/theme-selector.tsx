import React from 'react';
import {useTheme} from '@/contexts/ThemeContext';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';

const ThemeSelector: React.FC = () => {
	const {theme, setTheme, themes} = useTheme();

	return (
		<Select value={theme} onValueChange={setTheme}>і
			<SelectTrigger className="w-full">
				<SelectValue placeholder="Выберите тему"/>
			</SelectTrigger>
			<SelectContent>
				{themes.map((themeOption) => (
					<SelectItem key={themeOption.value} value={themeOption.value}>
						{themeOption.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default ThemeSelector;