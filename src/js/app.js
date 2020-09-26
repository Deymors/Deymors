import $ from 'jquery';

window.$ = $;
window.jQuery = $;

function loaderSpinner() {
    const loader = $('.loader');
    const loaderBg = $('.loader-bg');
    const wWidth = $(window)
        .width();
    let i = 0;
    loader.css({
        left: wWidth / 2 - 200,
        display: 'block',
        height: '10px',
        top: '50%'
    });
    loaderBg.css({
        display: 'block'
    });

    do {
        loader.animate({
            width: i
        }, 10);
        i += 3;
    } while (i <= 400);
    if (i === 402) {
        loader.animate({
            left: 0,
            width: '100%'
        });
        loader.animate({
            top: '0',
            height: '100vh'
        });
    }

    /* This line hide loader and show content */
    setTimeout(function () {
        $('.content')
            .fadeIn('slow');
        (loader).fadeOut('fast');
        (loaderBg).fadeOut('fast');
    }, 3500);
}

$(window)
    .on('load', function () {
        loaderSpinner();
    });


const toggleSwitch = document.querySelector('.theme-switch');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    loaderSpinner();
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);
