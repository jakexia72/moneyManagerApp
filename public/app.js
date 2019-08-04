
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

function makeLatestSpendingEntree(doc){
  let row = document.createElement('tr');
    let category = document.createElement('td');
    let nameAndDate = document.createElement('td');
      let name = document.createElement('h3');
      let date = document.createElement('p');
    let money = document.createElement('td');



  let categoryBadge = document.createElement('div');
  // // COMBAK: tegoryBadge.classList.add('badge');

  row.setAttribute('data-id', doc.id);
  name.textContent = doc.data().expenseName;
  date.textContent = doc.data().expenseDate;
  nameAndDate.appendChild(name);
  nameAndDate.appendChild(date);
  money.textContent = doc.data().expenseAmount;

  row.appendChild(category);
  row.appendChild(nameAndDate);
  row.appendChild(money);
  $('#spendingList').append(row);

}


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
      makeLatestSpendingEntree(doc);
    })
});
