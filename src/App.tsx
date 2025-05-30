import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes";
import { useState } from "react";

export type GameProgress = {
    Game1: boolean;
    Game2: boolean;
    Game3: boolean;
    Game4: boolean;
    Game5: boolean;
};

export type SetProgressType = React.Dispatch<React.SetStateAction<GameProgress>>;

function App() {
    //const progress = {"Game1" : false, "Game2" : false, "Game3" : false, "Game4" : false, "Game5" : false};
    const [progress, setProgress] = useState<GameProgress>({
        Game1: false,
        Game2: false,
        Game3: false,
        Game4: false,
        Game5: false,
    });

    return (
        <BrowserRouter>
            <AppRoutes progress={progress} setProgress={setProgress} />
        </BrowserRouter>
    );
}

export default App;
