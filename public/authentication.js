$(document).ready(function(){

    $('#signUp-form').submit(function(e){
      e.preventDefault();
      let email = $('#add-email').val();
      let password = $('#add-password').val();
      console.log("cred");
      auth.createUserWithEmailAndPassword(email,password).then(cred =>{
        console.log(cred);
      });
      $('#signUpForm').trigger('reset');
      $('#signUpModal').modal('hide');
    });

    $('#logout').click(function(){
      auth.signOut().then(()=>{
        console.log('logged out');
      })
    });

    $('#login-form').submit(function(e){
      e.preventDefault();
      let email = $('#login-email').val();
      let password = $('#login-password').val();

      auth.signInWithEmailAndPassword(email,password).then(cred =>{
        console.log(cred.user);
        console.log("logged In");
        $('#loginModal').modal('hide')
      })

    });


})

auth.onAuthStateChanged(user =>{
  if(user){
    
  }
  console.log(user);
})
