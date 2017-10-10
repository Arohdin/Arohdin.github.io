var colors = {p1: ['#003399', '#0099cc'], p2: ['#692486', '#FFC981'], p3: ['#e74c3c', '#ff6d6d'], p4: ['#003399', '#FF6D8D']};
var rInt = Math.floor(Math.random() * 4) + 1;


$(document).ready(() => {
    document.getElementById('main').style.height = $(window).height();
    document.getElementById('main').style.width = $(window).width();

    let c1 = (colors['p'+rInt])[0];
    let c2 = (colors['p'+rInt])[1];

    document.getElementById('left').style.background = "linear-gradient(" + c1 + ", " + c2 + ")";

    $('#header').css('visibility','hidden');
    $('#image').css('visibility','hidden');
    $('#info').css('visibility','hidden');
    $('#contact').css('visibility','hidden');
    $('#socials').css('visibility','hidden');
    $('#quoteText').css('visibility','hidden');

    $('#image').css('visibility','visible').hide().fadeIn(1000);
    setTimeout(() => {
        $('#header').css('visibility','visible').hide().fadeIn(1000);
        setTimeout(() => {
            $('#info').css('visibility','visible').hide().fadeIn(1000);
            setTimeout(() => {
                $('#contact').css('visibility','visible').hide().fadeIn(1000);
                $('#socials').css('visibility','visible').hide().fadeIn(1000);
                if($(window).width() > 768)
                {
                    setTimeout(() => {
                        $('#quoteText').css('visibility','visible').hide().fadeIn(1500);
                    },750);
                }
            }, 250);
        }, 250);
    }, 250);

});