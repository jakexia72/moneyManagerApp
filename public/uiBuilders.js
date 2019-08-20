function makeBudgetIndicators(dict,type){
  for (const [key, value] of Object.entries(dict)) {
    makeAmountRemainingFillIndicator(value,categoryBudgetAmounts[key],key,type)
  }
}

function makeAmountRemainingFillIndicator(amountSpent,amountTotal,category,type){
  let amountRemaining = amountTotal - amountSpent;
  let amountRemainingPercent = Math.round((amountRemaining/amountTotal) * 10000) / 100;

  let panel = document.createElement('div');
  $(panel).addClass("panel panel-layered");

  let bg = document.createElement('div');
  $(bg).addClass("bg");
  let fillIndicator = document.createElement('div');
  $(fillIndicator).addClass("amountRemaining-fill-indicator");
  $(fillIndicator).css("background","linear-gradient(to bottom," +  categoryColors[category] + ","+ changeHue(categoryColors[category],20) + ")");
  $(fillIndicator).css("border-top", "2px solid " + categoryColors[category]);
  $(fillIndicator).css("height", amountRemainingPercent+"%");

  $(bg).append(fillIndicator);

  let fg = document.createElement('div');
  $(fg).addClass("fg");

  let fgContainer = document.createElement('div');
  $(fgContainer).addClass('fg-container');

  let budgetName = document.createElement('h4');
  $(budgetName).html(category);
  let budgetRemaining = document.createElement('h2');
  $(budgetRemaining).html("$" + moneyRound(amountRemaining).toFixed(2));
  let budgetRenewText = document.createElement('h4');
  if (type == "oneOff"){
    $(budgetRenewText).html(periods[type]);
  } else {
      $(budgetRenewText).html("left this " + periods[type]);
  }



  $(fgContainer).append(budgetName);
  $(fgContainer).append(budgetRemaining);
  $(fgContainer).append(budgetRenewText);

  $(fg).append(fgContainer);

  $(panel).append(bg);
  $(panel).append(fg);

  $('#budgetIndicators').prepend(panel)

}

function convertHex(hex,opacity){
    hex = hex.replace('#','');
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);

    result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
    return result;
}


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
  badge.classList.add('colorBadge');
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

var weekBreakdownChart;
function makeWeekBarChart(dataArray){
  $('#spendingOfWeek').html("$" + getArrayTotal(dataArray).toFixed(2) + " total");
  if(typeof weekBreakdownChart != 'undefined'){weekBreakdownChart.destroy()};
  let ctx = document.getElementById('weekly-amount-breakdown-chart').getContext('2d');
  weekBreakdownChart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',

      // The data for our dataset
      data: {
          labels: ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [{
              label: 'Spending',
              backgroundColor: '#9bc5c3',
              borderColor: '#9bc5c3',
              data: dataArray,
              borderWidth: 1
          }]
      },

      // Configuration options go here
      options: {
        responsive: true,
        legend:{
          display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                  maxTicksLimit: 5,
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return '$' + value;
                    }
                }
            }]
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItems, data) {
                    return "$" + tooltipItems.value;
                }
              }
            }
      }
  });
}

var monthBreakdownChart;
function makeMonthBreakdownChart(dataArray, colors, labelArr, monthTotal){
  if(typeof monthBreakdownChart != 'undefined'){monthBreakdownChart.destroy()};
  let ctx = document.getElementById('monthly-category-doughnut-chart').getContext('2d');
  console.log(labelArr);
  monthBreakdownChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labelArr,
        datasets: [
          {
            label: 'Spending',
            backgroundColor: colors,
            data: dataArray
          }
        ]
      },
      options: {
        cutoutPercentage: 75,
        responsive: true,
        legend:{
          display: false
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItems, data) {
                  console.log(tooltipItems.index);
                    return "$" + data.datasets[0].data[tooltipItems.index]
                },
                title: function(tooltipItems, data){
                  console.log(tooltipItems);
                  return data.labels[tooltipItems[0].index];
                }
            }
        },
        plugins:{
          doughnutlabel: {
        labels: [
          {
            text: "$" + moneyRound(monthTotal),
            font: {
              size: '100',
              weight: 'bold'
            },
            color: 'black'
          },
          {
            text: "T O T A L",
            font: {
              size: '50'
            },
            color: 'grey'
          }
        ]
      }
        }
      }
  });
}
