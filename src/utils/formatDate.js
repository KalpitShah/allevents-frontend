const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dateSuffix = (date) => {
  if (date == 1) return "st";
  if (date == 2) return "nd";
  if (date == 3) return "rd";
  return "th";
};

const formatDate = (date) => {
  let dateObj = new Date(date);
  return (
    dateObj.getDate() +
    dateSuffix(dateObj.getDate()) +
    " " +
    month[dateObj.getMonth()]
  );
};

const printDate = (date1, date2) => {
  date1 = formatDate(date1);
  date2 = formatDate(date2);
  if (date1 === date2) return date1;
  if (date1.split(" ")[1] === date2.split(" ")[1])
    return date1.split(" ")[0] + " - " + date2;
  return date1 + " - " + date2;
};

export default printDate;
