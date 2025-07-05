import GuessesBox from "./components/GuessesBox";
import Keyboard from "./components/Keyboard";
import Message from "./components/Message";
import { getLetterStatus } from "./helpers/functions";
import useGame from "./hooks/useGame";

function App() {
  const {
    maxTurns,
    numOfLetters,
    word,
    isWon,
    isLost,
    isInvalid,
    inputWord,
    showMsg,
    handleBackspace,
    handleClick,
    handleEnter,
    allLetters,
  } = useGame();

  return (
    <div className="app">
      <div className="container">
        <Message showMsg={showMsg} isLost={isLost} isWon={isWon} isInvalid={isInvalid} word={word} />
        <header className="header">wordle</header>
        <main className="main">
          <GuessesBox maxTurns={maxTurns} inputWord={inputWord} numOfLetters={numOfLetters} />
          <Keyboard
            getLetterStatus={getLetterStatus}
            handleClick={handleClick}
            handleBackspace={handleBackspace}
            handleEnter={handleEnter}
            allLetters={allLetters}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
