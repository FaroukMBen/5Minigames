import { useEffect } from "react";
import "../App.css";

import type { GameProgress } from "../context/GameProgressContext";
import { useContext } from "react";
import { GameProgressContext } from "../context/GameProgressContext";
import { Link } from "react-router-dom";

function Home() {
    const { progress } = useContext(GameProgressContext);

    useEffect(() => {
        console.log("Home component mounted");
        const gameLinks = document.querySelectorAll("#home a");
        gameLinks.forEach((link) => {
            const gameId = link.id as keyof GameProgress;
            if (progress[gameId]) {
                link.classList.add("completed");
            } else {
                link.classList.remove("completed");
            }
        });
    }, [progress]);

    return (
        <div id="home">
            <h1>Welcome to the Game Series</h1>
            <p>Select a game from the menu to start playing!</p>
            <Link id="Game1" to="/Game1">
                Game 1
            </Link>
            <Link id="Game2" to="/Game2">
                Game 2
            </Link>
            <Link id="Game3" to="/Game3">
                Game 3
            </Link>
            <Link id="Game4" to="/Game4">
                Game 4
            </Link>
            <Link id="Game5" to="/Game5">
                Game 5
            </Link>
        </div>
    );
}

export default Home;
