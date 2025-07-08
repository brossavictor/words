import styles from "./style.module.css";

type Props = React.ComponentProps<"button"> & { title: string };

export default function Button({ title, ...rest }: Props) {
  return (
    <button type="button" className={styles.button} {...rest}>
      {title}
    </button>
  );
}
