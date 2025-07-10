import styles from "./app.module.css";

import { useEffect, useRef, useState, type FormEvent } from "react";

import { WORDS, type Challenge } from "./utils/words";
import maxAttempts from "./utils/maxAttempts";

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
    const isConfirmed = window.confirm("Do you want to reset?");

    if (isConfirmed) {
      startGame();
    }
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

  function endGame(message: string) {
    alert(message);
    startGame();
  }

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (!challenge) {
      return;
    }

    setTimeout(() => {
      if (score === challenge.word.length) {
        return endGame("Congratulations! You've got it!!");
      }
      if (errors === attemptLimit) {
        return endGame("GAME OVER");
      }
    }, 300);
  }, [score, usedLetters]);

  if (!challenge) {
    return;
  }

  const attemptLimit = maxAttempts(challenge.word.length);
  const errors = usedLetters.filter(
    (letter) => letter.correct === false
  ).length;
  return (
    <div className={styles.container}>
      <main>
        <Header
          current={errors}
          max={attemptLimit}
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
