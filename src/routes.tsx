import { Route, Routes } from 'react-router-dom';
import Game1 from './assets/Game1/Game1';
import Game2 from './assets/Game2/Game2';
import Game3 from './assets/Game3/Game3';
import Game4 from './assets/Game4/Game4';
import Game5 from './assets/Game5/Game5';
import Home from './assets/Home';
import type { GameProgress } from './App';

type AppRoutesProps = {
  setProgress: React.Dispatch<React.SetStateAction<GameProgress>>;
  progress: GameProgress;
};


function AppRoutes( {progress, setProgress } : AppRoutesProps) {
    
    return (
        <Routes>
            <Route path="/" element={<Home progress={progress} />} />
            <Route path="/Game1" element={<Game1 setProgress={setProgress} />} />
            <Route path="/Game2" element={<Game2 setProgress={setProgress}/>} />
            <Route path="/Game3" element={<Game3 />} />
            <Route path="/Game4" element={<Game4 />} />
            <Route path="/Game5" element={<Game5 />} />
        </Routes>
  )

}

export default AppRoutes;