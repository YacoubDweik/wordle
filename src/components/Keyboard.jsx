function Keyboard({ getLetterStatus, handleClick, handleBackspace, handleEnter, allLetters }) {
  return (
    <section className="keyboard-box">
      <div className="keyboard-row">
        <KeyboardRow
          lettersString="qwertyuiop"
          handleClick={handleClick}
          getLetterStatus={getLetterStatus}
          allLetters={allLetters}
        />
      </div>
      <div className="keyboard-row">
        <KeyboardRow
          lettersString="asdfghjkl"
          handleClick={handleClick}
          getLetterStatus={getLetterStatus}
          allLetters={allLetters}
        />
      </div>
      <div className="keyboard-row">
        <LastRow
          lettersString="zxcvbnm"
          handleClick={handleClick}
          handleEnter={handleEnter}
          handleBackspace={handleBackspace}
          getLetterStatus={getLetterStatus}
          allLetters={allLetters}
        />
      </div>
    </section>
  );
}

function KeyboardRow({ lettersString, handleClick, getLetterStatus, allLetters }) {
  return (
    <>
      {[...lettersString].map((letter, i) => {
        const status = getLetterStatus(allLetters, letter);
        return (
          <button
            key={i}
            onClick={() => handleClick(letter)}
            className={`keyboard-button ${status === "unset" ? "unset" : status}`}>
            {letter}
          </button>
        );
      })}
    </>
  );
}

function LastRow({ lettersString, handleClick, handleEnter, handleBackspace, getLetterStatus, allLetters }) {
  return (
    <>
      <button onClick={handleBackspace}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" version="1.2" id="backspace">
          <path d="M19 21H9c-1.436 0-3.145-.88-3.977-2.046l-2.619-3.667-1.188-1.661c-.246-.344-.249-.894-.008-1.241l1.204-1.686L5.02 7.046C5.855 5.879 7.566 5 9 5h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3zM3.229 12.999l.806 1.125 2.618 3.667C7.104 18.424 8.223 19 9.001 19h10c.552 0 1-.45 1-1.001V8c0-.551-.448-1-1-1h-10c-.776 0-1.897.576-2.351 1.209l-2.608 3.652-.813 1.138zM13.707 13l2.646-2.646a.502.502 0 0 0 0-.707.502.502 0 0 0-.707 0L13 12.293l-2.646-2.646a.5.5 0 0 0-.707.707L12.293 13l-2.646 2.646a.5.5 0 0 0 .707.708L13 13.707l2.646 2.646a.5.5 0 1 0 .708-.706L13.707 13z"></path>
        </svg>
      </button>
      <KeyboardRow
        lettersString={lettersString}
        handleClick={handleClick}
        getLetterStatus={getLetterStatus}
        allLetters={allLetters}
      />
      <button onClick={handleEnter}>Enter</button>
    </>
  );
}

export default Keyboard;
