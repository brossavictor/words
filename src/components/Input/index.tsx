import styles from "./style.module.css";

type Props = React.ComponentProps<"input">;

export default function Input({ ...rest }: Props) {
  return <div className={styles.input} {...rest}></div>;
}
