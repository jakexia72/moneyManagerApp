
var today = new Date();
var time = today.getHours();

function timeOfDay(){
  if(time < 12){
    return "Morning";
  } else if (time < 17){
    return "Afternoon";
  } else if (time < 24){
    return "Evening";
  }
}
