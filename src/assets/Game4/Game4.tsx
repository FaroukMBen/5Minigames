import { Link } from "react-router-dom";
import "./Game4.css";
import { useContext } from "react";
import {
    GameProgressContext,
    type GameProgress,
} from "../../context/GameprogressContext";
function Game4() {
    const riddleOptions = [
        ["💻", "Code"],
        ["🛠️", "Bug"],
        ["📖", "Docs"],
        ["⚙️", "Git"],
        ["🚀", "Deploy"],
    ];

    const { setProgress } = useContext(GameProgressContext);

    function handleRiddleReveal(
        element: React.MouseEvent<HTMLDivElement>,
        answer: string
    ) {
        const target = element.currentTarget as HTMLDivElement;

        if (answer === "Git") {
            target.classList.add("correct");
            const result = document.getElementById(
                "result"
            ) as HTMLParagraphElement;
            result.textContent = "Wow, well done! You got it right!";

            setProgress((prev: GameProgress) => ({
                ...prev,
                Game4: true,
            }));
        } else {
            target.classList.add("false");
            const result = document.getElementById(
                "result"
            ) as HTMLParagraphElement;
            result.textContent = "Nah uh, try again.";
            setTimeout(() => {
                target.classList.remove("false");
            }, 1000);
        }
    }

    return (
        <div className="game4">
            <h1>Game 4: Riddle Reveal</h1>
            <p>
                I’m invisible but I control your code’s fate, If I’m not handled
                well, bugs come in great. I keep track of changes, both big and
                small, Without me, teamwork would surely fall. <br />
                What am I?
            </p>
            <div id="riddleOptions">
                {riddleOptions.map(([emoji, answer], index) => (
                    <div
                        key={index}
                        className="riddleOption"
                        onClick={(element) => {
                            handleRiddleReveal(element, answer);
                        }}
                    >
                        <span className="emoji" role="img" aria-label={emoji}>
                            {emoji}
                        </span>
                        <span className="answer">{answer}</span>
                    </div>
                ))}
            </div>
            <p id="result"></p>
            <Link to="/">exit</Link>
        </div>
    );
}

export default Game4;
