import React, {createContext, useContext, useState} from "react";
import {TrainingDay} from "@/types/trainingDay";

interface TrainingDaysContextProps {
	trainingDays: TrainingDay[];
	setTrainingDays: React.Dispatch<React.SetStateAction<TrainingDay[]>>;
}

const TrainingDaysContext = createContext<TrainingDaysContextProps | undefined>(undefined);

export const TrainingDaysProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
	const [trainingDays, setTrainingDays] = useState<TrainingDay[]>([]);
	return (
		<TrainingDaysContext.Provider value={{trainingDays, setTrainingDays}}>
			{children}
		</TrainingDaysContext.Provider>
	);
};

export const useTrainingDays = () => {
	const context = useContext(TrainingDaysContext);
	if (!context) throw new Error("useTrainingDays must be used within TrainingDaysProvider");
	return context;
};
