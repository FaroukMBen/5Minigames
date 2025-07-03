import { Route, Routes } from "react-router-dom";
import Game1 from "./components/Game1/Game1.tsx";
import Game2 from "./components/Game2/Game2.tsx";
import Game3 from "./components/Game3/Game3.tsx";
import Game4 from "./components/Game4/Game4.tsx";
import Game5 from "./components/Game5/Game5.tsx";
import Gameselection from "./components/Gameselection/Gameselection.tsx";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Gameselection />} />
            <Route path="/Game1" element={<Game1 />} />
            <Route path="/Game2" element={<Game2 />} />
            <Route path="/Game3" element={<Game3 />} />
            <Route path="/Game4" element={<Game4 />} />
            <Route path="/Game5" element={<Game5 />} />
        </Routes>
    );
}

export default AppRoutes;
