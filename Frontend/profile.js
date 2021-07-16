var form1 = document.getElementById('actbutton');
  
$('.login').on('keyup change', function() {
    var empty = false;
    var zipcode = $("#zip");
    $('.login').each(function() {
        if ($(this).val() == '') {
            empty = true;
        }

        if (zipcode.val().length < 5 || !$.isNumeric(zipcode.val())) {
          empty = true;
        }
    });

    if (empty) {
        $('#actbutton').prop('disabled', true);
    } else {
        $('#actbutton').prop('disabled', false);
    }
});
