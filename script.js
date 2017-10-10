var colors = {p1: ['#003399', '#0099cc'], p2: ['#21A857', '#AEFFB2'], p3: ['#692486', '#FFC981'], p4: ['#e74c3c', '#FF6D8D'], p5: ['#003399', '#FF6D8D']};


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