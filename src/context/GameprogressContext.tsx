import { createContext } from "react";

export type GameProgress = {
    Game1: boolean;
    Game2: boolean;
    Game3: boolean;
    Game4: boolean;
    Game5: boolean;
};

export type SetProgressType = React.Dispatch<
    React.SetStateAction<GameProgress>
>;

export type GameProgressContextType = {
    progress: GameProgress;
    setProgress: SetProgressType;
};

export const GameProgressContext = createContext<GameProgressContextType>({
    progress: {
        Game1: false,
        Game2: false,
        Game3: false,
        Game4: false,
        Game5: false,
    },
    setProgress: () => {},
});
