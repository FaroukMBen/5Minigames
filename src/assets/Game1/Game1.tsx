import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    GameProgressContext,
    type GameProgress,
} from "../../context/GameprogressContext";

function Game1() {
    const answer = "Same as Luffy I will become the king of developers";
    const [decryptTry, setDecryptTry] = useState(0);
    const [shift, setShift] = useState(1);

    const { setProgress } = useContext(GameProgressContext);

    useEffect(() => {
        function RandomEncryption() {
            const randomShift = Math.floor(Math.random() * 25) + 1; // Random shift between 1 and 25
            setShift(randomShift);
            const encryptedMessage = ceasarCipher(answer, randomShift);
            return encryptedMessage;
        }

        const encryptedMessage = RandomEncryption();
        const encryptedMessageElement = document.getElementById(
            "encryptedMessage"
        ) as HTMLParagraphElement;
        encryptedMessageElement.textContent = encryptedMessage;
    }, []);

    function ceasarCipher(text: string, shift: number): string {
        return text
            .split("")
            .map((char) => {
                const code = char.charCodeAt(0);
                if (char >= "A" && char <= "Z") {
                    return String.fromCharCode(((code - 65 + shift) % 26) + 65); // return the encrypted character
                } else if (char >= "a" && char <= "z") {
                    return String.fromCharCode(((code - 97 + shift) % 26) + 97);
                }
                return char; // return the character wich is not included in the alphabet
            })
            .join("");
    }

    function verifyDecryption() {
        const decryptedMessage = document.getElementById(
            "DecryptionInput"
        ) as HTMLInputElement;
        if (decryptedMessage.value == answer) {
            setProgress((prev: GameProgress) => ({ ...prev, Game1: true }));
        } else {
            const result = document.getElementById(
                "result"
            ) as HTMLParagraphElement;
            const possibleFeed: [string, number][] = [
                ["NOPE, try again", 0],
                ["Keep trying buddy !", 1],
                ["Keep trying, to fail is a step to win", 2],
                [
                    "Don't you dare to give up, never give up on your dreams !",
                    3,
                ],
                [
                    "Because you didn't give up, I will give you the shift on the next try",
                    4,
                ],
                [
                    `It is encrypted with a Caesar cipher, the shift is  ${shift}`,
                    5,
                ],
            ];
            if (decryptTry < possibleFeed.length) {
                result.textContent = possibleFeed[decryptTry][0];
                setDecryptTry(decryptTry + 1);
            } else {
                const randomIndex = Math.floor(Math.random() * 3) + 1;
                result.textContent = possibleFeed[randomIndex][0];
            }
        }
    }
    return (
        <div id="game1">
            <div>
                <h1>Game 1: Decryption Challenge</h1>
                <p>
                    Unlock the secret! Decode the encrypted message below to
                    progress.
                </p>
                <p id="encryptedMessage"></p>
                <input
                    type="text"
                    name="DecryptionInput"
                    id="DecryptionInput"
                    placeholder="Decipher the message here"
                />
                <button onClick={verifyDecryption}>Decrypt and Submit</button>
                <p id="result"></p>
            </div>

            <Link to="/">exit</Link>
        </div>
    );
}

export default Game1;
