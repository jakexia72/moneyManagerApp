
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
const auth = firebase.auth();
const db = firebase.firestore();
const userId = "PDb2N4jbQKyk0GDemeBL";

var userRef = db.collection("users").doc(userId);

//Creating the array of category colors
var categoryColors = {};
userRef.collection("expenseTypes").get().then((snapshot)=>{
  snapshot.docs.forEach((expenseType)=>{
    categoryColors[expenseType.data().typeName] =  expenseType.data().typeColor;
  })
});

//Creating array of the last 7 days
var weekOfSpendingThisWeek = [0,0,0,0,0,0,0];
userRef.collection("expenses").where("expenseDate", ">", weekStart).onSnapshot(snapshot =>{
  let changes = snapshot.docChanges();
  changes.forEach(change =>{
    if (change.type == 'added'){
      weekOfSpendingThisWeek[change.doc.data().expenseDate.toDate().getDay()] += change.doc.data().expenseAmount;
    } else if (change.type == 'removed'){
        weekOfSpendingThisWeek[change.doc.data().expenseDate.toDate().getDay()] -= change.doc.data().expenseAmount;
    }
  });
  if(weeksFromThisWeek == 0){
    makeWeekBarChart(weekOfSpendingThisWeek);
  }
});

var weeksFromThisWeek = 0;
function changeWeek(){
  let start = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate()- (7*weeksFromThisWeek), 0, 0, 0, 0);
  console.log("start adjust :" + start);
  let end = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate()- (7* (weeksFromThisWeek-1)), 0, 0, 0, 0);

  userRef.collection("expenses").where("expenseDate", ">", start).where("expenseDate", "<", end).get().then(snapshot =>{
    let weekOfSpending = [0,0,0,0,0,0,0];
    snapshot.docs.forEach(expense =>{
        weekOfSpending[expense.data().expenseDate.toDate().getDay()] += expense.data().expenseAmount;
    });
    console.log(weekOfSpending);

    makeWeekBarChart(weekOfSpending);
  });
}



var monthOfSpendingByCategory = {};
var colorArray=[];
var amountArray=[];
var spendingLabelsArray = [];
var monthTotal = 0;
userRef.collection("expenses").where("expenseDate", ">", monthStart).onSnapshot(snapshot =>{

  let changes = snapshot.docChanges();
  changes.forEach(change =>{
    if (change.type == 'added'){
      console.log(monthOfSpendingByCategory[change.doc.data().expenseType]);
      if(typeof monthOfSpendingByCategory[change.doc.data().expenseType] == 'undefined'){
        monthOfSpendingByCategory[change.doc.data().expenseType] = 0;
      }else {
          monthOfSpendingByCategory[change.doc.data().expenseType] += change.doc.data().expenseAmount;
          monthTotal += change.doc.data().expenseAmount;
      }
    } else if (change.type == 'removed'){
        monthOfSpendingByCategory[change.doc.data().expenseType] -= change.doc.data().expenseAmount;
    }
  });
  splitMonthOfSpending();
  makeMonthBreakdownChart(amountArray, colorArray, spendingLabelsArray, monthTotal)
  console.log(monthOfSpendingByCategory);
});

function splitMonthOfSpending(){
  let i = 0;
  for (const [key, value] of Object.entries(monthOfSpendingByCategory)) {
    spendingLabelsArray[i] = key;
    colorArray[i] = categoryColors[key];
    amountArray[i] = value;
    i++;
  }
}

//Creating the greeting
userRef.get().then((snapshot) => {
  const uname = snapshot.data().name
  $("#greeting").html("Good " + timeOfDay() + ", " + uname.substr(0, uname.indexOf(' ')));
});

var totalDailySpending = 0;
var totalYesterSpending = 0;
// console.log(typeof yesterday);

function moneyRound(num){
  return Math.round(num*100)/100;
}

function fromYesterday(){
  let delta = moneyRound(totalDailySpending - totalYesterSpending);
  console.log(delta);
  if (delta > 0){
    return ("+$" + delta +  " more <br> than yesterday");
  } else if (delta < 0){
    return ("-$" + Math.abs(delta) + " less <br> than yesterday")
  } else {
    return ("you spent this amount yesterday too");
  }
}

userRef.collection("expenseTypes").onSnapshot(snapshot =>{
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

userRef.collection("expenses").where("expenseDate", "<", dayStart).where("expenseDate",">",yesterday).onSnapshot(snapshot =>{
  let changes = snapshot.docChanges();
  changes.forEach(change =>{
    totalYesterSpending += change.doc.data().expenseAmount;
  });
  console.log("TOTAL: " + totalYesterSpending);
});

userRef.collection("expenses").where("expenseDate", ">", dayStart).onSnapshot(snapshot =>{
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
userRef.collection("expenses").orderBy("expenseDate").onSnapshot(snapshot => {
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
