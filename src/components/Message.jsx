function Message({ showMsg, isLost, isWon, isInvalid, word }) {
  return (
    <p className="msg" style={showMsg ? { animation: isInvalid ? "showMsg 2s" : "showMsg 6s" } : {}}>
      {isLost && (
        <>
          <span className="lost">You lost! 💔😥</span> the right word was:
          <span className="word">{word.toLowerCase()}</span>
          Hit Enter to start a new game!
        </>
      )}
      {isWon && (
        <>
          <span className="won">You won! 🥳👏</span>
          Hit Enter to start a new game!
        </>
      )}
      {isInvalid && "Wrong word!"}
    </p>
  );
}

export default Message;
