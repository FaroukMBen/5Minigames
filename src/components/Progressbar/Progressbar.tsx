import { useContext } from "react";
import { GameProgressContext } from "../../context/GameprogressContext";
import "./Progressbar.css";

function Progressbar() {
    const { progress } = useContext(GameProgressContext);
    const totalGames = Object.keys(progress).length;
    const completedGames = Object.values(progress).filter(
        (game) => game === true
    ).length;
    const percentage = (completedGames / totalGames) * 100;

    return (
        <div id="progressbar-container">
            {Array.from({ length: totalGames + 1 }).map((_, i) => (
                <div
                    className="vertical-line"
                    key={i}
                    style={{
                        left: `${(i / totalGames) * 100}%`,
                        position: "absolute",
                        height: "100%",
                        top: 0,
                    }}
                ></div>
            ))}
            <div id="progressbar" style={{ width: `${percentage}%` }}></div>
        </div>
    );
}
export default Progressbar;
