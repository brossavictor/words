import styles from "./app.module.css";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { WORDS, type Challenge } from "./utils/words";

import Header from "./components/Header/index";
import Tip from "./components/Tip";
import Letter from "./components/Letter";
import Input from "./components/Input";
import Button from "./components/Button";
import UsedLetters, { type UsedLettersProps } from "./components/UsedLetters";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [score, setScore] = useState(0);
  const [letter, setLetter] = useState("");
  // const [attempts, setAttempts] = useState(0);
  const [usedLetters, setUsedLetters] = useState<UsedLettersProps[]>([
    //  { value: "X", correct: false },
  ]);
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  function handleRestartGame() {
    alert("Restart!");
  }

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length);
    const randomWord = WORDS[index];

    setChallenge(randomWord);
    setScore(0);
    setLetter("");
    setUsedLetters([]);
  }

  function handleConfirm(event: FormEvent) {
    event?.preventDefault();

    if (!challenge) {
      return;
    }

    if (!letter.trim()) {
      return alert("Type a letter.");
    }

    const value = letter.toUpperCase();
    const attemptedLetter = usedLetters.find(
      (used) => used.value.toUpperCase() === value
    );

    if (attemptedLetter) {
      return alert(`You already tried the letter ${attemptedLetter.value}.`);
    }

    const hits = challenge.word
      .toUpperCase()
      .split("")
      .filter((char) => char === value).length;

    const correct = hits > 0;
    const currentScore = score + hits;

    setUsedLetters((prevState) => [...prevState, { value, correct }]);
    setScore(currentScore);
    setLetter("");
    inputRef.current?.focus();
  }

  useEffect(() => {
    startGame();
  }, []);

  if (!challenge) {
    return;
  }

  return (
    <div className={styles.container}>
      <main>
        <Header
          current={score}
          max={Math.floor(challenge.word.length / 2)}
          onRestart={handleRestartGame}
        />

        <Tip tip={challenge.tip} />

        <div className={styles.word}>
          {challenge.word.split("").map((letter, index) => {
            const usedLetter = usedLetters.find(
              (used) => used.value.toUpperCase() === letter.toUpperCase()
            );
            return <Letter key={index} value={usedLetter?.value} />;
          })}
        </div>

        <h4>Guess</h4>

        <form className={styles.guess}>
          <Input
            required
            ref={inputRef}
            type="text"
            autoFocus
            maxLength={1}
            placeholder="?"
            value={letter}
            onChange={(e) =>
              setLetter(e.target.value.replace(/[^A-ZA-z]/g, ""))
            }
          />
          <Button title="Confirm" onClick={handleConfirm} type="submit" />
        </form>
        <UsedLetters data={usedLetters} />
      </main>
    </div>
  );
}

export default App;
