import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes";
import { GameProgressProvider } from "./context/GameprogressProvider.tsx";
import Progressbar from "./components/Progressbar/Progressbar.tsx";
import Header from "./components/Header/Header.tsx";

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
