import { useEffect, useContext } from "react";
import "../App.css";
import "./Home.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBrain,
    faDice,
    faPuzzlePiece,
    faQuestion,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import type { GameProgress } from "../context/GameprogressContext";
import { GameProgressContext } from "../context/GameprogressContext";

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
            <div>
                <Link className="reactLink" id="Game1" to="/Game1">
                    <FontAwesomeIcon icon={faBrain} />
                </Link>
                <Link className="reactLink" id="Game2" to="/Game2">
                    <FontAwesomeIcon icon={faDice} />
                </Link>
                <Link className="reactLink" id="Game3" to="/Game3">
                    <FontAwesomeIcon icon={faPuzzlePiece} />
                </Link>
            </div>
            <div>
                <Link className="reactLink" id="Game4" to="/Game4">
                    <FontAwesomeIcon icon={faQuestion} />
                </Link>
                <Link className="reactLink" id="Game5" to="/Game5">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Link>
            </div>
        </div>
    );
}

export default Home;
