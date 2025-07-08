import styles from "./style.module.css";
import Letter from "../Letter";

export type UsedLettersProps = {
  value: string;
  correct: boolean;
};

type Props = {
  data: UsedLettersProps[];
};

export default function UsedLetters({ data }: Props) {
  return (
    <div className={styles.usedLetters}>
      <h5>Used letters</h5>
      <div>
        {data.map(({ value, correct }) => (
          <Letter
            key={value}
            value={value}
            size="small"
            color={correct ? "correct" : "incorrect"}
          />
        ))}
      </div>
    </div>
  );
}
