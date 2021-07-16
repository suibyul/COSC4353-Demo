
//Alert box displaying a user successfully submitted a form
  var form = document.getElementById('submitButton');

   function myFunction() {
     if (form.checkValidity()) {
       alert("Form Successfully Submitted!");
     }
   }

   var form1 = document.getElementById('submitButton');

//Alert box displaying a user has successfully registered an account
   function myFunction2() {
    if (form1.checkValidity()) {
      alert("Successfully Submitted");
    }
    
  }

//Alert box displaying a user has successfully saved their account
  function myFunction3() {
    if (form1.checkValidity()) {
      alert("Profile Saved!");
    }
    
  }

function pricing(){
    galreq = document.getElementById("GR").value;
    address = document.getElementById("DA").value;
    var galreqfactor
    var locfactor
    var n = address.includes("TX")
    if (n) {
      locfactor = .02
    }
    else {
      locfactor = .04
    }

    if (galreq > 1000) {
      galreqfactor = .02
    }
    else {
      galreqfactor = .03
    }

    margin = 1.50 * (locfactor - .01 + galreqfactor + .1)
    var suggestedprice = 1.5 + margin
    document.getElementById("SP").value = suggestedprice
    var total = galreq * suggestedprice
    document.getElementById('TAD').value = total;
    

}
 

$(function() {
    $('form > input[required]').on('input', function() {

        var empty = false;


        $('form > input[required]').each(function() {
            if ($(this).val() == '' || $(this).val() <= 0) {
                empty = true;
            }
            
        });

        if (empty) {
            $('#registerButton').attr('disabled', 'disabled');
            $('#getQB').attr('disabled', 'disabled');

        } else {
          $('#registerButton').removeAttr('disabled');
            $('#getQB').removeAttr('disabled');
        }
    });
})()
