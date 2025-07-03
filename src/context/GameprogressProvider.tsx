import { type FC, useState } from "react";
import {
    GameProgressContext,
    type GameProgress,
} from "./GameprogressContext.tsx";

interface GPProviderProps {
    children: React.ReactNode;
}

export const GameProgressProvider: FC<GPProviderProps> = ({ children }) => {
    const [progress, setProgress] = useState<GameProgress>({
        Game1: false,
        Game2: false,
        Game3: false,
        Game4: false,
        Game5: false,
    });

    return (
        <GameProgressContext.Provider value={{ progress, setProgress }}>
            {children}
        </GameProgressContext.Provider>
    );
};
