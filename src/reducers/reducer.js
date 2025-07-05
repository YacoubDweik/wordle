function addLetter(oldState, action) {
  const updated = [...oldState.inputWord];
  const current = [...(updated[oldState.currentRow] || [])];
  current.push({ letter: action.letter });
  updated[oldState.currentRow] = current;
  return { ...oldState, inputWord: updated };
}

function enterInvalid(oldState) {
  const updated = [...oldState.inputWord];
  const current = [...(updated[oldState.currentRow] || [])];
  updated[oldState.currentRow] = current;
  return { ...oldState, inputWord: updated };
}

function enterValid(oldState, action) {
  const updated = [...oldState.inputWord];
  const current = [...(updated[oldState.currentRow] || [])];
  const updatedRow = current.map((obj, index) => ({ ...obj, status: compareValue(obj["letter"], index, action.word) }));
  updated[oldState.currentRow] = updatedRow;
  return { inputWord: updated, currentRow: oldState.currentRow + 1 };
}

function deleteLetter(oldState) {
  const updated = [...oldState.inputWord];
  const current = updated[oldState.currentRow] || [];
  updated[oldState.currentRow] = current.slice(0, current.length - 1);
  return { ...oldState, inputWord: updated };
}

function reset() {
  return {
    inputWord: [],
    currentRow: 0,
  };
}

function compareValue(value, index, word) {
  word = word.toUpperCase();
  if (index == word.indexOf(value) || index == word.lastIndexOf(value)) {
    return "Green";
  } else if (word.includes(value)) {
    return "Yellow";
  } else {
    return "Gray";
  }
}

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_LETTER":
      return addLetter(state, action);
    case "DELETE_LETTER":
      return deleteLetter(state);
    case "ENTER_VALID":
      return enterValid(state, action);
    case "ENTER_INVALID":
      return enterInvalid(state);
    case "RESET":
      return reset();
    default:
      return state;
  }
};
