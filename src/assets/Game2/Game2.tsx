import { useState } from "react";
import { Link } from "react-router-dom";
import type { GameProgress, SetProgressType } from "../../App";

type Game1Props = {
    setProgress: SetProgressType;
};

function Game2({ setProgress }: Game1Props) {

    type TriviaQuestions = [string, string[], number][];

    const triviaQuestions : TriviaQuestions = [
        [
            "What is the primary purpose of a 'debugger' in software development?",
            ["To make your app faster",
            "To find and fix errors in the code",
            "To automatically write code for you",
            "To translate code into emojis"],
            1
        ],
        [
            "Which language is primarily used to style a website?",
            [
                "HTML",
                "JavaScript",
                "Python",
                "CSS"
            ],
            3
        ],
        [
            "What does the git clone command do?",
            [
                "Creates a new branch in the repository",
                "Deletes the current repository",
                "Copies a remote repository to your local machine",
                "Updates the local repository with the latest changes"

            ],
            2
        ],
        [
            "What is the best programming language?",
            [
                
                "None, it's not the language that defines the developer, but how the developer uses it",
                "JavaScript",
                "Python",
                "C++"
            ],
            0
        ]
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);

    function checkAnswer(triviaQuestions: TriviaQuestions, questionNumber:number ,selectedOption: number){
        const result = document.getElementById("result") as HTMLParagraphElement;
        if (currentQuestion >= triviaQuestions.length - 1 && selectedOption === triviaQuestions[questionNumber][2]) {
            result.textContent = "Congratulations! You've completed the trivia challenge!"; 
            const questionContainer = document.getElementById("question") as HTMLDivElement;
            questionContainer.style.display = "none";

            setProgress((prev: GameProgress) => ({ ...prev, Game2: true }));

        } else if (selectedOption === triviaQuestions[questionNumber][2]) {
            result.textContent = "Correct answer!";
            setCurrentQuestion(questionNumber + 1);
        } else {
            result.textContent = "Incorrect answer. Try again!";
        }
    }
    
    

    return (
        <div className="game2">
            <h1>Game 2: Trivia Challenge</h1>
            <div id="question">
                <p>Answer the following questions correctly to win!</p>
                <h2>{triviaQuestions[currentQuestion][0]}</h2>
                <ul>
                    {triviaQuestions[currentQuestion][1].map((option, index) => (
                        <li key={index}
                            onClick={() => checkAnswer(triviaQuestions, currentQuestion, index)}>
                            {option}    
                        </li>
                    ))}
                </ul>
            </div>
            <p id="result"></p>
            <Link to="/" >exit</Link>
        </div>
    );
}

export default Game2;