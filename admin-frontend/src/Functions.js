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

export { compareDates };
