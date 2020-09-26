import $ from 'jquery';

export function loaderSpinner() {
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
