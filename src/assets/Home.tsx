import { useEffect } from "react";
import type { GameProgress } from "../App";
import "../App.css";

type HomeProps = {
    progress: GameProgress;
};

function Home({ progress }: HomeProps) {
    useEffect(() => {
      if ('Game1' in progress && progress.Game1) {
        console.log("Game 1 completed");
        const game1 = document.getElementById("Game1") as HTMLDivElement;
        game1.classList.add("completed");
      }
    }, []);

    return (
        <div id="home">
            <h1>Welcome to the Game Series</h1>
            <p>Select a game from the menu to start playing!</p>
            <a id="Game1" href="/Game1">Game 1</a>
            <a id="Game2" href="/Game2">Game 2</a>
            <a id="Game3" href="/Game3">Game 3</a>
            <a id="Game4" href="/Game4">Game 4</a>
            <a id="Game5" href="/Game5">Game 5</a>
        </div>
    );
}

export default Home;