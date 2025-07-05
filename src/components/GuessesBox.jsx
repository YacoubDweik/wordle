import Word from "./Word";

function GuessesBox({ maxTurns, inputWord, numOfLetters }) {
  return (
    <section className="guesses-box">
      {[...Array(maxTurns)].map((_, i) => (
        <Word key={i} inputWord={inputWord[i] || []} numOfLetters={numOfLetters} />
      ))}
    </section>
  );
}

export default GuessesBox;
