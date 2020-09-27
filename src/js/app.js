import $ from 'jquery';
import { loaderSpinner } from './loader/loader';
import { switchTheme } from './theme/switch';

window.$ = $;
window.jQuery = $;

$(window)
    .on('load', function () {
        loaderSpinner();
    });

$(document)
    .ready(function () {
        $('.experience__controller__item')
            .on('click', function () {
                const skillName = $(this)
                    .attr('skill');
                let isSelectionActive = $('.experience__controller__item--selected').length !== 0;
                if ($(this)
                    .hasClass('experience__controller__item--selected')) {
                    $(`div[skill='${skillName}']`)
                        .removeClass('experience__controller__item--selected');
                    if (isSelectionActive) {
                        $('.experience__clear-button')
                            .css('display', 'none')
                            .hide()
                            .fadeOut();
                    }
                } else {
                    $(`div[skill='${skillName}']`)
                        .addClass('experience__controller__item--selected');
                    if (!isSelectionActive) {
                        $('.experience__clear-button')
                            .css('display', 'flex')
                            .hide()
                            .fadeIn();
                    }
                }
                isSelectionActive = $('.experience__controller__item--selected').length !== 0;
                if (isSelectionActive) {
                    $('.experience__container__list__boxes__box')
                        .each(function () {
                            const selected = $('.experience__controller__item--selected');
                            const isActive = $(this)
                                .find(selected).length !== 0;
                            if (isActive) {
                                $(this)
                                    .css('display', 'flex')
                                    .hide()
                                    .fadeIn();
                            } else {
                                $(this)
                                    .css('display', 'none')
                                    .hide()
                                    .fadeOut();
                            }
                        });
                    $('.experience__container__list')
                        .each(function () {
                            const selected = $('.experience__controller__item--selected');
                            const isActive = $(this)
                                .find(selected).length !== 0;
                            if (isActive) {
                                $(this)
                                    .css('display', 'flex')
                                    .hide()
                                    .fadeIn();
                            } else {
                                $(this)
                                    .css('display', 'none')
                                    .hide()
                                    .fadeOut();
                            }
                        });
                }
            });
        $('.experience__clear-button').on('click',function (){
            $('.experience__container__list')
                .css('display', 'flex')
                .hide()
                .fadeIn();
            $('.experience__container__list__boxes__box')
                .css('display', 'flex')
                .hide()
                .fadeIn();
            $('.experience__controller__item--selected').removeClass('experience__controller__item--selected');
        });
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
