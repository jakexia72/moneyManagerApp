function makeExpenseCategorySelectOption(doc){
  let option = document.createElement('option');
  option.setAttribute('data-id', doc.data().id);
  option.setAttribute('value',doc.data().typeName);
  option.textContent = doc.data().typeName;
  $('#add-expenseType').append(option);
}


//make the dot that represents the category of spending
function makeCategoryBadge(category){
  let badge = document.createElement('div');
  badge.classList.add('badge');
  console.log(category);
  console.log(categoryColors[category]);
  $(badge).css('background',categoryColors[category]);
  return badge;
}

//make the entree row in the table of expenses
function makeLatestSpendingEntree(doc){
  let row = document.createElement('tr');
    let category = document.createElement('td');
    let nameAndDate = document.createElement('td');
      let name = document.createElement('h3');
      let date = document.createElement('p');
    let money = document.createElement('td');
    let chevron = document.createElement('td');

  //set the row id to the doc id
  row.setAttribute('data-id', doc.id);

  //COL 1
  let categoryBadge = makeCategoryBadge(doc.data().expenseType);
  category.appendChild(categoryBadge);


  //COL 2
  name.textContent = doc.data().expenseLocation;
  date.textContent = getNiceUIDateFormat(doc.data().expenseDate.toDate());
  date.classList.add('grey');
  nameAndDate.appendChild(name);
  nameAndDate.appendChild(date);

  //COL 3
  money.textContent = '$' + doc.data().expenseAmount.toFixed(2);
  money.classList.add('moneyCol');

  //COL 4
  chevron.classList.add('grey');
  chevron.classList.add('chevron');
  chevron.textContent = '〉';

  //Append to row
  row.appendChild(category);
  row.appendChild(nameAndDate);
  row.appendChild(money);
  row.appendChild(chevron);

  //Append row to list
  $('#spendingList').prepend(row);
}

function makeCharts(){
  var ctx = document.getElementById('spendingBreakdown-chart').getContext('2d');
  var grd = ctx.createLinearGradient(0, 0, 0, 100);
grd.addColorStop(0, "#9bc5c3");
grd.addColorStop(0.5, "#9bc5c3");
grd.addColorStop(1, "rgba(250,250,250,0)");
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
              label: 'My First dataset',
              backgroundColor: grd,
              borderColor: '#9bc5c3',
              data: [22, 10, 5, 2, 20, 30, 45]
          }]
      },

      // Configuration options go here
      options: {}
  });
}
