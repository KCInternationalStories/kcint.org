// Fittext Functions
jQuery("header .description h1").fitText(1.2); // Turn the compressor up   (resizes more aggressively)

/*
 * -------------------------------------------
 *	$_NEWSLETTER VALIDATION
 * -------------------------------------------
 */

function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if( !emailReg.test( $email ) ) {
        return false;
    } else {
        return true;
    }
}

var emailValID = "#userEmail";
$("label[for='mce-EMAIL'], input[name='EMAIL'], .invalidEmail").hide();
$(emailValID).keydown(function(event){
    if(event.keyCode == 13){
        $('.newsletterTrigger').click();
    }
});

$('#newsletterSignupModal').on('shown.bs.modal', function (e) {
    $(emailValID).val('');
    $(emailValID).parent('.input-group').removeClass('has-warning has-feedback');
    $('.invalidEmail').slideUp().fadeOut();
});

$(".newsletterSignup").find(".input-group-btn .btn").click( function() {
    var emailVal = $(emailValID).val();
    if (emailVal != "" && validateEmail(emailVal)) {
        $('.modal-confirmation').hide();
        $('.modal-signup').show();
        $('#newsletterSignupModal').modal('show');
    } else {
        $(emailValID).parent('.input-group').addClass('has-warning has-feedback');
        $('.invalidEmail').finish().slideDown().fadeIn();
    }
});

$('#mc-embedded-subscribe').click( function() {
    $('.modal-signup').fadeOut();
    $('.modal-confirmation').fadeIn();
});







/*
 * -------------------------------------------
 *	$_EMAIL PROCESSING
 * -------------------------------------------
 */

// Form Validation/Processing
$(function() {
    $('.error').hide();

    $(".button").click(function() {
        // validate and process form
        // first hide any error messages
        $('.error').hide();

        var name = $("input#name").val();
        if (name == "") {
            $("label#name_error").show();
            $("input#name").focus();
            return false;
        }
        var email = $("input#email").val();
        if (email == "") {
            $("label#email_error").show();
            $("input#email").focus();
            return false;
        }
        var message = $("textarea#comment").val();
        if (message == "") {
            $("label#comment_error").show();
            $("textarea#comment").focus();
            return false;
        } else {
            $('.feedback-inputWrap').html("<div id='message'><img class='loader' src='img/loader.gif'>Message being sent...</div>");
        }

        var dataString = 'name='+ name + '&email=' + email + '&message=' + message;
        //alert (dataString);return false;

        $.ajax({
            type: "POST",
            url: "contact.php",
            data: dataString,
            success: function() {
                $('#message').html("<h2>Message Submitted!</h2>")
                    .append("<p>We will be in touch soon.</p>")
                    .hide()
                    .fadeIn(1500, function() {
                        $('#message').append("");
                    });
            }
        });
        return false;
    });
});