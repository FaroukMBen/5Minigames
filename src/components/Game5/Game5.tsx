import { useContext, useState } from "react";
import "./Game5.css";
import {
    GameProgressContext,
    type GameProgress,
} from "../../context/GameprogressContext";

function Game5() {
    const grid: string[][] = [
        ["A", "D", "A", "U", "T", "H", "O", "T", "S", "U", "R", "D"],
        ["S", "F", "A", "D", "B", "F", "B", "N", "E", "S", "T", "A"],
        ["Q", "C", "R", "T", "T", "S", "R", "O", "O", "R", "E", "T"],
        ["U", "C", "H", "O", "A", "S", "O", "A", "P", "D", "T", "A"],
        ["O", "E", "H", "E", "N", "B", "U", "P", "J", "H", "E", "B"],
        ["U", "C", "N", "E", "M", "T", "A", "I", "A", "W", "T", "A"],
        ["T", "B", "E", "D", "M", "A", "E", "S", "C", "A", "A", "S"],
        ["E", "Z", "B", "A", "C", "K", "E", "N", "D", "R", "U", "E"],
        ["Z", "T", "R", "O", "U", "T", "E", "R", "D", "E", "O", "T"],
        ["R", "T", "O", "K", "E", "N", "Z", "K", "J", "A", "T", "E"],
        ["A", "M", "M", "K", "R", "O", "U", "T", "J", "W", "Z", "T"],
        ["T", "A", "R", "E", "A", "C", "T", "E", "A", "N", "T", "B"],
    ];

    const wordsToFind: string[] = [
        "FRONTEND",
        "BACKEND",
        "DATABASE",
        "REACT",
        "NODE",
        "NEST",
        "API",
        "ROUTER",
        "SCHEMA",
        "JWT",
        "AUTH",
        "TOKEN",
    ];

    const { setProgress } = useContext(GameProgressContext);
    const [selectedWord, setSelectedWord] = useState<string>("");
    const [selectedPositions, setSelectedPositions] = useState<
        [number, number][]
    >([]);
    const [foundWords, setFoundWords] = useState<string[]>([]);

    const [letterClass, setLetterClass] = useState(
        Array(grid.length)
            .fill(null)
            .map(() => Array(grid[0].length))
    );

    const isAdjacent = (
        lastPosition: [number, number] | undefined,
        newPosition: [number, number]
    ): boolean => {
        if (!lastPosition) return true;
        const [lastRow, lastCol] = lastPosition;
        const [newRow, newCol] = newPosition;
        return (
            Math.abs(newRow - lastRow) <= 1 && Math.abs(newCol - lastCol) <= 1
        );
    };

    const handleLetterClick = (letter: string, row: number, col: number) => {
        if (
            isAdjacent(selectedPositions[selectedPositions.length - 1], [
                row,
                col,
            ])
        ) {
            setSelectedWord((prev) => prev + letter);
            setSelectedPositions((prev) => [...prev, [row, col]]);

            const newClass = [...letterClass];
            newClass[row][col] = "selected";
            setLetterClass(newClass);
        }
    };

    const checkWord = () => {
        const newClass = [...letterClass];

        if (
            wordsToFind.includes(selectedWord) &&
            !foundWords.includes(selectedWord)
        ) {
            setFoundWords((prev) => [...prev, selectedWord]);

            for (const pos of selectedPositions) {
                newClass[pos[0]][pos[1]] = "success";
            }
        } else {
            for (const pos of selectedPositions) {
                newClass[pos[0]][pos[1]] = "error";
                setTimeout(() => {
                    newClass[pos[0]][pos[1]] = "";
                }, 1000);
            }
        }

        setLetterClass(newClass);
        setSelectedWord("");
        setSelectedPositions([]);

        if (foundWords.length === wordsToFind.length - 1) {
            console.log("All words found!");
            setProgress((prev: GameProgress) => ({
                ...prev,
                Game5: true,
            }));
        }
    };

    return (
        <div id="game5" className="game-container">
            <h1>Game 5: Code Terminology Word Search</h1>
            <div className="word-grid">
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid-row">
                        {row.map((letter, colIndex) => (
                            <button
                                key={colIndex}
                                className={`grid-letter ${letterClass[rowIndex][colIndex]}`}
                                onClick={() =>
                                    handleLetterClick(
                                        letter,
                                        rowIndex,
                                        colIndex
                                    )
                                }
                            >
                                {letter}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
            <h3>Selected Word: {selectedWord}</h3>
            <button id="submit-word" onClick={checkWord}>
                Submit Word
            </button>
            <div id="found-words-container">
                <h3>Words to find:</h3>
                <div className="words-to-find-grid">
                    {wordsToFind.map((word) => (
                        <div
                            key={word}
                            className={`word-item${
                                foundWords.includes(word) ? " found" : ""
                            }`}
                        >
                            <p>{word}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Game5;
