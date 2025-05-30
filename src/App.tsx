import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes";
import { GameProgressProvider } from "./context/GameprogressProvider";
function App() {

    return (
        <GameProgressProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </GameProgressProvider>
    );
}

export default App;
