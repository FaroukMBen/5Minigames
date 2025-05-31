import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes";
import { GameProgressProvider } from "./context/GameprogressProvider";
import Progressbar from "./assets/Progressbar/Progressbar";
import Header from "./assets/Header/Header";

function App() {
    return (
        <GameProgressProvider>
            <BrowserRouter>
                <Header />
                <AppRoutes />
            </BrowserRouter>
            <Progressbar />
        </GameProgressProvider>
    );
}

export default App;
