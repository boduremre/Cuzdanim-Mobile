var prettyDate = function (time) {
  var utc = new Date().toUTCString();
  var utcFormat =
    new Date(utc).getDate() +
    "-" +
    (new Date(utc).getMonth() + 1) +
    "-" +
    new Date(utc).getFullYear() +
    " " +
    new Date(utc).getHours() +
    ":" +
    new Date(utc).getMinutes();
  //":" +
  //new Date(utc).getSeconds();

  return utcFormat;
};

export default prettyDate;
