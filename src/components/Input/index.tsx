import styles from "./style.module.css";

type Props = React.ComponentProps<"input">;

export default function Input({ ...rest }: Props) {
  return <input className={styles.input} {...rest}></input>;
}
