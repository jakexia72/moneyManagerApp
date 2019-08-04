

// var username = db.ref('users/' + userId + '/name');
//
// // var userId = "PDb2N4jbQKyk0GDemeBL";
// // var userPath = "/users"/ + userId + "/";
//
// // db.ref('/users/' + userId).once('value').then(function(snapshot) {
// //   var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
// //   $("greeting").html = username;
// // });
//
// $("greeting").html = username;



//var userExpenses = firebase.database().ref(userPath + "expenses" + )
var userId = "PDb2N4jbQKyk0GDemeBL";

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
// var userPath = "/users"/ + userId + "/";

// db.ref('/users/' + userId).once('value').then(function(snapshot) {
//   var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
//   $("greeting").html = username;
// });
// var username = db.ref('users/' + userId + '/name');
db.collection("users").doc(userId).get().then((snapshot) => {
  const uname = snapshot.data().name
  $("#greeting").html("Good " + timeOfDay() + ", " + uname.substr(0, uname.indexOf(' ')));
});



db.collection("users").doc(userId).collection("expenses").get().then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      console.log(doc.data());
    })
});
