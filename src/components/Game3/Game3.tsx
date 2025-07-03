import { useContext, useEffect, useState } from "react";
import "./Game3.css";
import {
    GameProgressContext,
    type GameProgress,
} from "../../context/GameprogressContext.tsx";

function Game3() {
    /**
     * Note to myself: This function is a Fisher-Yates shuffle algorithm.
     * It works by iterating through the array from the last element to the first,
     * swapping each element with a randomly selected element that comes before it (including itself).
     * And of course, that means it doesn't re use the same element twice so we have a equal chance
     * for each element to be in any position.
     */

    function shuffle(items: string[]) {
        // this is the algorithm of the Fisher-Yates shuffle
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = items[i];
            items[i] = items[j];
            items[j] = temp;
        }
        return items;
    }

    const { setProgress } = useContext(GameProgressContext);
    const [deck, setDeck] = useState<string[]>([]);
    const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
    const [matchedPairs, setMatchedPairs] = useState(0);
    const [matchedIndexes, setMatchedIndexes] = useState<number[]>([]);

    useEffect(() => {
        const cards = ["🧠", "🖥️", "⌨️", "🧑‍💻", "🗃️", "📦", "🛠️", "🔒"];
        setDeck(shuffle([...cards, ...cards]));
    }, []);

    useEffect(() => {
        if (matchedPairs === 8) {
            const result = document.getElementById(
                "result"
            ) as HTMLParagraphElement;
            if (result.classList.contains("negative")) {
                result.classList.remove("negative");
            }
            if (!result.classList.contains("positive")) {
                result.classList.add("positive");
            }
            result.textContent = "Congratulations! You found all pairs!";
            setProgress((prev: GameProgress) => ({
                ...prev,
                Game3: true,
            }));
        }
    }, [matchedPairs, setProgress]);
    /*
    function addEmojieToChosen(index: number) {
        if (chosenEmojies.length < 2) {
            const chosenCard = document.getElementById(index.toString());
            if (chosenCard) {
                chosenCard.classList.add("flipped");
                console.log("Card flipped: ", index);
            }
            setChosenEmojies((prev: number[]) => {
                return [...prev, index];
            });
        }
        if (chosenEmojies.length > 0) {
            if (dublicateEmojies[chosenEmojies[0]] == dublicateEmojies[index]) {
                const chosenCards = [
                    document.getElementById(index.toString()),
                    document.getElementById(chosenEmojies[0].toString()),
                ];

                chosenCards.forEach((card) => {
                    card?.classList.add("matched");
                });
            } else {
                const chosenCard = document.getElementById(index.toString());
                if (chosenCard) {
                    chosenCard.classList.add("flipped");
                }
                setTimeout(() => {
                    const firstChosenCard = document.getElementById(
                        chosenEmojies[0].toString()
                    );
                    if (firstChosenCard) {
                        firstChosenCard.classList.remove("flipped");
                    }
                    setChosenEmojies(() => {
                        return [];
                    });
                }, 1000);
                chosenCard?.classList.remove("flipped");
            }
        }
        console.log("Chosen emojies: ", chosenEmojies);
    }

    */

    function handleCardChoice(index: number) {
        if (flippedIndexes.length === 0) {
            setFlippedIndexes([index]);
        } else if (flippedIndexes.length === 1) {
            if (
                deck[flippedIndexes[0]] === deck[index] &&
                index !== flippedIndexes[0]
            ) {
                setMatchedPairs((prev) => prev + 1);
                setMatchedIndexes((prev) => [
                    ...prev,
                    flippedIndexes[0],
                    index,
                ]);
                setFlippedIndexes([]);
            } else {
                setFlippedIndexes((prev) => [...prev, index]);
                setTimeout(() => {
                    setFlippedIndexes([]);
                }, 1000);
            }
        }
    }

    return (
        <div id="game3" className="game-container">
            <h1>Game 3: Memory card game</h1>
            <p>
                Welcome to the memory card game! Flip the cards to find matching
                pairs. Can you remember where they are?
            </p>
            <div id="cards-container">
                {deck.map((emojie, index) => (
                    <div
                        className={`card ${
                            flippedIndexes.includes(index) ||
                            matchedIndexes.includes(index)
                                ? "flipped"
                                : ""
                        } ${matchedIndexes.includes(index) ? "matched" : ""}`}
                        key={index}
                        onClick={() => handleCardChoice(index)}
                    >
                        <span role="img">
                            {flippedIndexes.includes(index) ||
                            matchedIndexes.includes(index)
                                ? emojie
                                : ""}
                        </span>
                    </div>
                ))}
            </div>
            <p id="result"></p>
        </div>
    );
}

export default Game3;
