
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

// const form = document.querySelector('#add-expense-form');


//var userExpenses = firebase.database().ref(userPath + "expenses" + )
var userId = "PDb2N4jbQKyk0GDemeBL";


var categoryColors = {};
db.collection("expenseTypes").get().then((snapshot)=>{
  snapshot.docs.forEach((expenseType)=>{
    categoryColors[expenseType.data().typeName] = '#' + expenseType.data().typeColor;
    // console.log(categoryColors[expenseType.data().typeName]);
  })
});

function makeCategoryBadge(category){
  let badge = document.createElement('div');
  badge.classList.add('badge');
  console.log(category);
  console.log(categoryColors[category]);
  $(badge).css('background',categoryColors[category]);
  return badge;
}

function makeLatestSpendingEntree(doc){
  let row = document.createElement('tr');
    let category = document.createElement('td');
    let nameAndDate = document.createElement('td');
      let name = document.createElement('h3');
      let date = document.createElement('p');
    let money = document.createElement('td');



  let categoryBadge = makeCategoryBadge(doc.data().expenseType);
  category.appendChild(categoryBadge);
  // $('')
  // // COMBAK: tegoryBadge.classList.add('badge');

  row.setAttribute('data-id', doc.id);
  name.textContent = doc.data().expenseLocation;
  date.textContent = getNiceUIDateFormat(doc.data().expenseDate.toDate()) || "";
  date.classList.add('grey');
  nameAndDate.appendChild(name);
  nameAndDate.appendChild(date);
  money.textContent = '$' + doc.data().expenseAmount.toFixed(2);
  money.classList.add('moneyCol');

  row.appendChild(category);
  row.appendChild(nameAndDate);
  row.appendChild(money);
  $('#spendingList').append(row);

}

$('#add-expense-form').submit(function(e){

  e.preventDefault();
  var expenseDateVar = new Date();
    console.log("GUCK");
    console.log("val is: " + $('#add-expenseName').val());
  db.collection("users").doc(userId).collection("expenses").add({

    expenseAmount: parseInt($('#add-expenseAmount').val()),
    expenseName: $('#add-expenseName').val(),
    expenseLocation: $('#add-expenseLocation').val(),
    expenseType: $('#add-expenseType').val(),
    expenseDate: expenseDateVar

  });

});



db.collection("users").doc(userId).get().then((snapshot) => {
  const uname = snapshot.data().name
  $("#greeting").html("Good " + timeOfDay() + ", " + uname.substr(0, uname.indexOf(' ')));
});



db.collection("users").doc(userId).collection("expenses").get().then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      makeLatestSpendingEntree(doc);
    })
});
