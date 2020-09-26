import $ from 'jquery';
import { loaderSpinner } from './loader/loader';
import { switchTheme } from './theme/switch';

window.$ = $;
window.jQuery = $;

$(window)
    .on('load', function () {
        loaderSpinner();
    });


const toggleSwitch = document.querySelector('.theme-switch');
const currentTheme = localStorage.getItem('theme');
toggleSwitch.addEventListener('change', switchTheme, false);

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}
