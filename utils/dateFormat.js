const addDateSuffix = (date) => {
    let dateStr = date.toString();
    const lastChar = dateStr.charAt(dateStr.length - 1);
  
    if (lastChar === "1" && dateStr !== "11") {
      dateStr = `${dateStr}st`;
    } else if (lastChar === "2" && dateStr !== "12") {
      dateStr = `${dateStr}nd`;
    } else if (lastChar === "3" && dateStr !== "13") {
      dateStr = `${dateStr}rd`;
    } else {
      dateStr = `${dateStr}th`;
    }
  
    return dateStr;
  };
  
  module.exports = (
    timestamp,
    { monthLen = "short", dateSuffix = true } = {}
  ) => {
    const months = {
      0: monthLen === "short" ? "Jan" : "January",
      1: monthLen === "short" ? "Feb" : "February",
      2: monthLen === "short" ? "Mar" : "March",
      3: monthLen === "short" ? "Apr" : "April",
      4: monthLen === "short" ? "May" : "May",
      5: monthLen === "short" ? "Jun" : "June",
      6: monthLen === "short" ? "Jul" : "July",
      7: monthLen === "short" ? "Aug" : "August",
      8: monthLen === "short" ? "Sep" : "September",
      9: monthLen === "short" ? "Oct" : "October",
      10: monthLen === "short" ? "Nov" : "November",
      11: monthLen === "short" ? "Dec" : "December",
    };
  
    const dateObj = new Date(timestamp);
    const formattedMonth = months[dateObj.getMonth()];
  
    const dayOfMonth = dateSuffix
      ? addDateSuffix(dateObj.getDate())
      : dateObj.getDate();
  
    const year = dateObj.getFullYear();
    let hour =
      dateObj.getHours() > 12
        ? Math.floor(dateObj.getHours() - 12)
        : dateObj.getHours();
  
    if (hour === 0) {
      hour = 12;
    }
  
    const minutes = (dateObj.getMinutes() < 10 ? "0" : "") + dateObj.getMinutes();
    const periodOfDay = dateObj.getHours() >= 12 ? "pm" : "am";
  
    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
  
    return formattedTimeStamp;
  };