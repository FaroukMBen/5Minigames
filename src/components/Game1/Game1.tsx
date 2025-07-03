import { useContext, useEffect, useState } from "react";
import {
    GameProgressContext,
    type GameProgress,
} from "../../context/GameprogressContext.tsx";
import "./Game1.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Game1() {
    const answer = "If you want to be a clown, you have to be funny";
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
            "encrypted-message"
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
        const result = document.getElementById(
            "result"
        ) as HTMLParagraphElement;
        if (decryptedMessage.value == answer && decryptTry < 15) {
            if (result.classList.contains("negative")) {
                result.classList.remove("negative");
            }
            if (!result.classList.contains("positive")) {
                result.classList.add("positive");
            }
            result.textContent =
                "Buggy the Clown laughs: 'You... did it? Whatever, I lied anyway! I don't have your friend! MOUHAHAHA!'";
            setProgress((prev: GameProgress) => ({ ...prev, Game1: true }));
        } else if (decryptedMessage.value == answer) {
            const result = document.getElementById(
                "result"
            ) as HTMLParagraphElement;
            if (result.classList.contains("positive")) {
                result.classList.remove("positive");
            }
            if (!result.classList.contains("negative")) {
                result.classList.add("negative");
            }
            result.textContent =
                "Buggy the Clown laughs: 'You are hopeless! I will keep your friend forever!'";
            setProgress((prev: GameProgress) => ({ ...prev, Game1: true }));
            alert(
                "It seems you have deciphered the message, but unfortunately, Buggy the Clown has taken your friend forever!"
            );
        } else {
            if (result.classList.contains("positive")) {
                result.classList.remove("positive");
            }
            if (!result.classList.contains("negative")) {
                result.classList.add("negative");
            }
            const possibleFeed: [string, number][] = [
                [
                    "Buggy the Clown laughs: 'Wrong! Try again, little pirate!'",
                    0,
                ],
                ["Buggy grins: 'Not even close! You'll have to do better!'", 1],
                [
                    "Buggy taunts: 'Persistence won't save your friend! Try again!'",
                    2,
                ],
                [
                    "Buggy sneers: 'Giving up already? Every mistake makes me stronger!'",
                    3,
                ],
                [
                    "Buggy whispers: 'Maybe you need a hint? The shift number is coming soon...'",
                    4,
                ],
                [
                    `Buggy reveals: 'Fine! The Caesar cipher shift is ${shift}!'`,
                    5,
                ],
            ];
            console.log(`Decryption attempt ${decryptTry}`);
            if (decryptTry < possibleFeed.length) {
                result.textContent = possibleFeed[decryptTry][0];
                setDecryptTry(decryptTry + 1);
            } else {
                const randomIndex = Math.floor(Math.random() * 3) + 1;
                result.textContent = possibleFeed[randomIndex][0];
                setDecryptTry(decryptTry + 1);
            }

            if (decryptTry >= 15) {
                if (result.classList.contains("positive")) {
                    result.classList.remove("positive");
                }
                if (!result.classList.contains("negative")) {
                    result.classList.add("negative");
                }
                result.textContent =
                    "Buggy the Clown laughs: 'You are hopeless! I will keep your friend forever!'";
                setProgress((prev: GameProgress) => ({ ...prev, Game1: true }));
                alert(
                    "You won either way, but... At what cost? Buggy the Clown has taken your friend forever!"
                );
            }
        }
    }
    return (
        <div id="game1" className="game-container">
            <h1>Game 1: Decryption Challenge</h1>
            <p>
                Your best friend has been kidnapped by the evil
                <strong> Buggy the Clown</strong>. He has left you a message. If
                you want your friend back, you better decipher quick.
            </p>
            <div id="encrypted-message-container">
                <div>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <p id="encrypted-message"></p>
                </div>
            </div>
            <input
                type="text"
                name="DecryptionInput"
                id="DecryptionInput"
                placeholder="Decipher the message here"
            />
            <button onClick={verifyDecryption}>Decrypt and Submit</button>
            <p id="result"></p>
        </div>
    );
}

export default Game1;
