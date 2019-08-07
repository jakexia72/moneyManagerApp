
var today = new Date();
var time = today.getHours();

var monthDictionary = ["January","Febuary","March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//
// var categoryColors = {
//   "Food & Drinks" : "#FF781A",
//   "Entertainment" : "#FF4294",
//   "Essenntials" : "#F8BC47",
//   "Shopping" : "#009CDC",
//   "Groceries" : "#00D374",
//   "Misc" : "#707A88"
// }

function timeOfDay(){
  if(time < 12){
    return "Morning";
  } else if (time < 17){
    return "Afternoon";
  } else if (time < 24){
    return "Evening";
  }
}

function getMonthAsString(date){
  var month = date.getMonth();
  return monthDictionary[month];
}

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
  
  return getMonthAsString(date) + " " + getDateAsString(date);
}
