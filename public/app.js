
// INIT
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
const userId = "PDb2N4jbQKyk0GDemeBL";

//Creating the array of category colors
var categoryColors = {};
db.collection("users").doc(userId).collection("expenseTypes").get().then((snapshot)=>{
  snapshot.docs.forEach((expenseType)=>{
    categoryColors[expenseType.data().typeName] =  expenseType.data().typeColor;
  })
});



//Add a new expense to db
$('#add-expense-form').submit(function(e){
  e.preventDefault();
  var expenseDateVar = new Date();
    // console.log("expnse is: " + $('#add-expenseAmount'));
    // console.log("expnse prsed is: " + parseFloat($('#add-expenseAmount').val()));
  db.collection("users").doc(userId).collection("expenses").add({
    expenseAmount: parseFloat($('#add-expenseAmount').val()),
    expenseName: $('#add-expenseName').val(),
    expenseLocation: $('#add-expenseLocation').val(),
    expenseType: $('#add-expenseType').val(),
    expenseDate: expenseDateVar
  });
   $('#add-expense-form').trigger('reset');
});

//Add a new user-defined expenseType
$('#add-expenseType-form').submit(function(e){
  e.preventDefault();
  db.collection("users").doc(userId).collection("expenseTypes").add({
    typeName: $('#add-expenseTypeName').val(),
    typeColor: $('#add-expenseTypeColor').val(),
    budgetPeriod: $('#add-expenseTypeBudgetPeriod').val(),
    budget: $('#add-expenseTypeBudget').val()
  });
  $('#add-expenseType-form').trigger('reset');
});

//Creating the greeting
db.collection("users").doc(userId).get().then((snapshot) => {
  const uname = snapshot.data().name
  $("#greeting").html("Good " + timeOfDay() + ", " + uname.substr(0, uname.indexOf(' ')));
});

// Creating the table of data
// db.collection("users").doc(userId).collection("expenses").get().then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       makeLatestSpendingEntree(doc);
//     })

//

// });
var totalDailySpending = 0;
var totalYesterSpending = 0;
// console.log(typeof yesterday);

function fromYesterday(){
  let delta = totalDailySpending - totalYesterSpending;
  console.log(delta);
  if (delta > 0){
    return ("+$" + delta +  " more <br> than yesterday");
  } else if (delta < 0){
    return ("-$" + Math.abs(delta) + " less <br> than yesterday")
  } else {
    return ("you spent this amount yesterday too");
  }
}

db.collection("users").doc(userId).collection("expenseTypes").onSnapshot(snapshot =>{
  let changes = snapshot.docChanges();
  changes.forEach(change =>{
    if(change.type == 'added'){
      makeExpenseCategorySelectOption(change.doc);
      categoryColors[change.doc.data().typeName] = change.doc.data().typeColor;
    } else if (change.type == 'removed'){
      console.log("remove was called");
      $('[data-id=' + change.doc.id + ']').remove();
    }
  });
});

db.collection("users").doc(userId).collection("expenses").where("expenseDate", "<", dayStart).where("expenseDate",">",yesterday).onSnapshot(snapshot =>{
  let changes = snapshot.docChanges();
  changes.forEach(change =>{
    totalYesterSpending += change.doc.data().expenseAmount;
  });
  console.log("TOTAL: " + totalYesterSpending);
});

db.collection("users").doc(userId).collection("expenses").where("expenseDate", ">", dayStart).onSnapshot(snapshot =>{
  let changes = snapshot.docChanges();
  changes.forEach(change =>{
    if (change.type == 'added'){
      totalDailySpending += change.doc.data().expenseAmount;
    } else if (change.type == 'removed'){
      totalDailySpending -= change.doc.data().expenseAmount;
    }

  });
  console.log("TOTAL: " + totalDailySpending);
  $('#spending-today').html("$" + totalDailySpending);
  let delta = totalYesterSpending - totalDailySpending;
  $('#average-comparison-today').html(fromYesterday());
});




//real-time listener
db.collection("users").doc(userId).collection("expenses").orderBy("expenseDate").onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change =>{
    if(change.type == 'added'){
      makeLatestSpendingEntree(change.doc);
    } else if (change.type == 'removed'){
      console.log("remove was called");
      $('[data-id=' + change.doc.id + ']').remove();
    }
  });
});
