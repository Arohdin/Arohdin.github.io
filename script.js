$(document).ready(() => {
    $('#header').hide();
    $('#image').hide();
    $('#info').hide();
    $('#contact').hide();
    $('#socials').hide();
    $('#quoteText').hide();

    $('#image').fadeIn(1000);
    setTimeout(() => {
        $('#header').fadeIn(1000);
        setTimeout(() => {
            $('#info').fadeIn(1000);
            setTimeout(() => {
                $('#contact').hide().fadeIn(1000);
                $('#socials').hide().fadeIn(1000);
                setTimeout(() => {
                    $('#quoteText').hide().fadeIn(1500);
                },750);
            }, 250);
        }, 250);
    }, 250);

});