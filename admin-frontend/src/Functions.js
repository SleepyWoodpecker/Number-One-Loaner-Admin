import MessageBox from "./components/MessageBox";

function showFeedbackMessage(message, color, setStateMessage, timeout) {
  setStateMessage(<MessageBox color={color}>{message}</MessageBox>);
  return setTimeout(() => setStateMessage(""), timeout);
}

function convertStringToDate(dateString) {
  const dateArray = dateString.split("-");
  // since the months are zero indexed, take the month -1
  dateArray[1]--;
  return new Date(...dateArray);
}

function compareDates(a, b) {
  // should be a - b because I am arranging in ascending order.
  // closer - further < 0
  return convertStringToDate(a) - convertStringToDate(b);
}

function validateQuantity(number) {
  const numberRegex = /^\d+$/;
  return numberRegex.test(number);
}

function checkEmptyObject(obj) {
  for (const [key, value] of Object.entries(obj)) {
    if (!key || !value) {
      return false;
    }
  }

  return true;
}

function capitaliseFirstLetter(string) {
  const [firstLetter, otherLetters] = [string.slice(0, 1), string.slice(1)];
  return [firstLetter.toUpperCase(), otherLetters.toLowerCase()].join("");
}

export {
  compareDates,
  validateQuantity,
  showFeedbackMessage,
  checkEmptyObject,
  capitaliseFirstLetter,
};
