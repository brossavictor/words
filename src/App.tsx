import styles from "./app.module.css";

import Input from "./components/Input";
import Letter from "./components/Letter";
import Header from "./components/Header/index";
import Tip from "./components/Tip";

function App() {
  function handleRestartGame() {
    alert("Restart!");
  }

  return (
    <div className={styles.container}>
      <main>
        <Header current={5} max={10} onRestart={handleRestartGame} />
        <Tip tip="Test tip." />
        <div className={styles.word}>
          <Letter value="R" />
          <Letter value="E" />
          <Letter value="A" />
          <Letter value="C" />
          <Letter value="T" />
        </div>
        <h4>Guess</h4>
        <div>
          <Input autoFocus maxLength={1} placeholder="?" />
        </div>
      </main>
    </div>
  );
}

export default App;
