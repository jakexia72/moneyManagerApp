



function checkHasBudget(value){
  if(value != "trackOnly"){
    $('#add-expenseTypeBudget').css('display','block');
  } else {
    $('#add-expenseTypeBudget').css('display','none');
  }
}

$(document).ready(function() {

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

});
