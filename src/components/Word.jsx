function Word({ inputWord, numOfLetters }) {
  return (
    <div className="guess-row">
      {[...Array(numOfLetters)].map((_, i) => (
        <Slot key={i} status={(inputWord[i] && inputWord[i]["status"]) || "unset"} index={i}>
          {inputWord[i] && inputWord[i]["letter"]}
        </Slot>
      ))}
    </div>
  );
}

export default Word;

function calculateDelay(index) {
  return (0.3 * index).toFixed(1);
}

function Slot({ status, children, index }) {
  let style = {};
  const delay = calculateDelay(index);

  if (status !== "unset") {
    style = {
      animation: `reveal 0.6s ease ${delay}s forwards`,
    };
  } else if (children) {
    style = {
      animation: `pop-in 0.3s ease`,
      borderColor: "#b1b4ba",
    };
  }

  return (
    <span className="slot-wrapper" style={style}>
      <span
        className={`slot-inner ${status !== "unset" ? "flipped" : ""}`}
        style={status !== "unset" ? { transitionDelay: `${delay}s` } : {}}>
        <span className="slot-front">{children}</span>
        <span className={`slot-back ${status}`}>{children}</span>
      </span>
    </span>
  );
}
