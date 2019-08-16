



function checkHasBudget(value){
  if(value != "trackOnly"){
    $('#add-expenseTypeBudget').css('display','block');
  } else {
    $('#add-expenseTypeBudget').css('display','none');
  }
}

$(document).ready(function() {

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
    console.log("RAN");
    e.preventDefault();
    db.collection("users").doc(userId).collection("expenseTypes").add({
      typeName: $('#add-expenseTypeName').val(),
      typeColor: $('#add-expenseTypeColor').val(),
      budgetPeriod: $('#add-expenseTypeBudgetPeriod').val(),
      budget: $('#add-expenseTypeBudget').val()
    });
    $('#add-expenseType-form').trigger('reset');
  });

  $('#categories-add').click(function(){
    console.log("CLICKED");
    if($('#categories-add').data("id") == "categories-add-closed"){
      $('#categories-add').data("id", "categories-add-open");
      $('#categories-add').html("&#10005;");
      $('#add-expenseType-form').css("display","block");
    } else {
      $('#categories-add').data("id","categories-add-closed");
      $('#categories-add').html("+");
      $('#add-expenseType-form').css("display","none");
    }
  });

  makeCharts(weekOfSpending);


});
