import { useContext, useState } from "react";
import { GameProgressContext } from "../../context/GameprogressContext.tsx";
import type { GameProgress } from "../../context/GameprogressContext.tsx";
import "./Game2.css";

function Game2() {
    const { setProgress } = useContext(GameProgressContext);
    type TriviaQuestions = [string, string[], number][];

    const triviaQuestions: TriviaQuestions = [
        [
            "What is the primary purpose of a 'debugger' in software development?",
            [
                "To make your app faster",
                "To find and fix errors in the code",
                "To automatically write code for you",
                "To translate code into emojis",
            ],
            1,
        ],
        [
            "Which language is primarily used to style a website?",
            ["HTML", "JavaScript", "Python", "CSS"],
            3,
        ],
        [
            "What does the git clone command do?",
            [
                "Creates a new branch in the repository",
                "Deletes the current repository",
                "Copies a remote repository to your local machine",
                "Updates the local repository with the latest changes",
            ],
            2,
        ],
        [
            "What is the best programming language?",
            [
                "None, it's not the language that defines the developer, but how the developer uses it",
                "JavaScript",
                "Python",
                "C++",
            ],
            0,
        ],
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);

    function checkAnswer(
        triviaQuestions: TriviaQuestions,
        questionNumber: number,
        selectedOption: number,
        li: React.MouseEvent<HTMLLIElement, MouseEvent>
    ) {
        const result = document.getElementById(
            "result"
        ) as HTMLParagraphElement;
        if (
            currentQuestion >= triviaQuestions.length - 1 &&
            selectedOption === triviaQuestions[questionNumber][2]
        ) {
            if (result.classList.contains("negative")) {
                result.classList.remove("negative");
            }
            if (!result.classList.contains("positive")) {
                result.classList.add("positive");
            }
            result.textContent =
                "Congratulations! You've completed the trivia challenge!";
            const liElement = li.target as HTMLLIElement;
            const description = document.getElementById(
                "description"
            ) as HTMLParagraphElement;
            description.textContent =
                "I guess you did it, huh? Well, you can go now.";
            liElement.classList.add("correct");
            setProgress((prev: GameProgress) => ({ ...prev, Game2: true }));
            setTimeout(() => {
                liElement.classList.remove("correct");
                const questionContainer = document.getElementById(
                    "question"
                ) as HTMLDivElement;
                questionContainer.classList.add("hidden");
            }, 1000);
        } else if (selectedOption === triviaQuestions[questionNumber][2]) {
            if (result.classList.contains("negative")) {
                result.classList.remove("negative");
            }
            if (!result.classList.contains("positive")) {
                result.classList.add("positive");
            }
            result.textContent = "Correct answer!";
            const liElement = li.target as HTMLLIElement;
            liElement.classList.add("correct");
            setTimeout(() => {
                liElement.classList.remove("correct");
                setCurrentQuestion(questionNumber + 1);
            }, 1000);
        } else {
            if (result.classList.contains("positive")) {
                result.classList.remove("positive");
            }
            if (!result.classList.contains("negative")) {
                result.classList.add("negative");
            }
            result.textContent = "Incorrect answer. Try again!";
            const liElement = li.target as HTMLLIElement;
            liElement.classList.add("incorrect");
            setTimeout(() => {
                liElement.classList.remove("incorrect");
            }, 1000);
        }
    }

    return (
        <div id="game2" className="game-container">
            <h1>Game 2: Trivia Challenge</h1>
            <p id="description">
                You are in the Trivia Challenge! Answer the questions correctly
                to win !
            </p>
            <div id="question">
                <h2>{triviaQuestions[currentQuestion][0]}</h2>
                <ul>
                    {triviaQuestions[currentQuestion][1].map(
                        (option, index) => (
                            <li
                                key={index}
                                onClick={(e) =>
                                    checkAnswer(
                                        triviaQuestions,
                                        currentQuestion,
                                        index,
                                        e
                                    )
                                }
                            >
                                {option}
                            </li>
                        )
                    )}
                </ul>
            </div>
            <p id="result"></p>
        </div>
    );
}

export default Game2;
