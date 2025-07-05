import { useEffect, useReducer } from "react";
import { wordsList, getRandomWord } from "../helpers/wordsList";
import { reducer } from "../reducers/reducer";

const maxTurns = 6;
const numOfLetters = 5;
let word = getRandomWord();
console.log(word);
let isWon = false;
let isInvalid = false;

const initialState = {
  inputWord: [],
  currentRow: 0,
};

function useGame() {
  // This is my custom hook
  const [state, dispatch] = useReducer(reducer, initialState);
  const { inputWord, currentRow } = state;
  const isLost = currentRow >= maxTurns && !isWon;
  const isFullRow = inputWord[currentRow]?.length >= numOfLetters;
  const showMsg = isWon || isLost || isInvalid;
  const allLetters = inputWord.flat();

  function handleClick(letter) {
    letter = letter.toUpperCase();
    isInvalid = false; // Reset if the last inputWord was invalid
    if (isFullRow || isWon || isLost) return; // Stop if the current row is full already or if you won or lost
    dispatch({ type: "ADD_LETTER", letter });
  }

  function handleEnter() {
    // Check if we have a full row & we still have another row?
    if (isFullRow && currentRow < maxTurns) {
      const guessedWord = inputWord[currentRow].map((obj) => obj.letter).join("");
      isWon = guessedWord.toUpperCase() == word.toUpperCase();
      // Check if the word is invalid
      if (wordsList.indexOf(guessedWord.toLowerCase()) == -1) {
        isInvalid = true;
        dispatch({ type: "ENTER_INVALID" });
        return;
      } else {
        dispatch({ type: "ENTER_VALID", word });
      }
    } else if (isWon || isLost) {
      // Hit Enter to restart the game
      isWon = false;
      dispatch({ type: "RESET" });
    }
  }

  function handleBackspace() {
    // Check if the game is not finished and there are letters in the row
    if (!isLost && !isWon && inputWord[currentRow]) {
      dispatch({ type: "DELETE_LETTER" });
    }
  }

  // Handle keyboard typing
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;

      if (/^[a-zA-Z]$/.test(key)) {
        handleClick(key);
      } else if (key === "Enter") {
        handleEnter();
      } else if (key === "Backspace") {
        handleBackspace();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClick, handleEnter, handleBackspace]);

  // Get a new word when the game is finished
  useEffect(() => {
    if (isWon || isLost) {
      word = getRandomWord();
      console.log(word);
      isInvalid = false;
    }
  }, [isWon, isLost]);

  return {
    maxTurns,
    numOfLetters,
    word,
    isWon,
    isLost,
    isInvalid,
    inputWord,
    currentRow,
    showMsg,
    handleBackspace,
    handleClick,
    handleEnter,
    allLetters,
  };
}

export default useGame;
