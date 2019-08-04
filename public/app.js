
// Your web app's Firebase configuration
var config = {
  apiKey: "AIzaSyBh4kYU7y5SutxOps2zSx4N679JPriUMQg",
  authDomain: "moneytracker-b296e.firebaseapp.com",
  databaseURL: "https://moneytracker-b296e.firebaseio.com",
  projectId: "moneytracker-b296e",
  storageBucket: "moneytracker-b296e.appspot.com",
  messagingSenderId: "287763511011",
  appId: "1:287763511011:web:0add0c0702a8afbf"
};
// Initialize Firebase
firebase.initializeApp(config);

const db = firebase.firestore();
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
