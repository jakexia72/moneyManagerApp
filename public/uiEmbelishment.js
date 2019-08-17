
var today = new Date();
var time = today.getHours();

var dayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
console.log(dayStart);

var yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate()-1, 0, 0, 0, 0);
console.log(yesterday);

var weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()-today.getDay(), 0, 0, 0, 0);
console.log(weekStart);

var monthStart = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0);
console.log(monthStart);

var monthDictionary = ["January","Febuary","March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var numArray = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight" , "nine", "ten", "eleven", "twelve"];

function timeOfDay(){
  if(time < 12){
    return "Morning";
  } else if (time < 17){
    return "Afternoon";
  } else if (time < 24){
    return "Evening";
  }
}

//the month 0 returns January
function getMonthAsString(date){
  var month = date.getMonth();
  return monthDictionary[month];
}

//returns a date with along with ordinal indicator
function getDateAsString(date){
  var day = date.getDate();
  if(day == 1){
    return "1st";
  } else if (day == 2){
    return "2nd";
  } else if (day == 3){
    return "3rd";
  } else {
    return day + "th";
  }
}

function getNiceUIDateFormat(date){
  if(isToday(date)){
    return "Earlier Today";
  } else if (date.getTime() > yesterday){
    return "Yesterday";
  } else {
    return getMonthAsString(date) + " " + getDateAsString(date);
  }
}

function isToday(someDay){
  return someDay.getDate() == today.getDate() && someDay.getMonth() == today.getMonth() && someDay.getFullYear() == today.getFullYear();
}



function getWeeksAgoString(weeks){
  if(weeks == 0){
    return "This Week";
  } else if (weeks == 1){
    return "Last Week";
  } else if (weeks < 12){
    return numArray[weeks] + " weeks ago";
  } else {
    return weeks + " weeks ago";
  }
}
