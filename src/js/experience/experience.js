import $ from 'jquery';

function addLearnMoreEvent() {
    $('.experience__container__list__boxes__box__learn-more')
        .on('click', function () {
            const link = $(this)
                .attr('link');
            window.open(link);
        });
}

function clearSelection() {
    $('.experience__container__list')
        .css('display', 'flex')
        .hide()
        .fadeIn();
    $('.experience__container__list__boxes__box')
        .css('display', 'flex')
        .hide()
        .fadeIn();
    $('.experience__controller__item--selected')
        .removeClass('experience__controller__item--selected');
}

function addClearSelectionEvent() {
    $('.experience__clear-button')
        .on('click', function () {
            clearSelection();
            $(this)
                .css('display', 'none')
                .hide()
                .fadeOut();
        });
}

function hideListItemsIfNeeded() {
    const isSelectionActive = $('.experience__controller__item--selected').length !== 0;
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
    return isSelectionActive;
}

function showClearSelectionButton() {
    $('.experience__clear-button')
        .css('display', 'flex')
        .hide()
        .fadeIn();
}

function hideClearSelectionButtonIfNeeded() {
    const isSelectionActive = $('.experience__controller__item--selected').length !== 0;
    if (!isSelectionActive) {
        $('.experience__clear-button')
            .css('display', 'none')
            .hide()
            .fadeOut();
        clearSelection();
    }
    return isSelectionActive;
}

function addSkillsEvents() {
    $('.experience__controller__item')
        .on('click', function () {
            const skillName = $(this)
                .attr('skill');
            const isSelectionActive = $('.experience__controller__item--selected').length !== 0;
            if ($(this)
                .hasClass('experience__controller__item--selected')) {
                $(`div[skill='${skillName}']`)
                    .removeClass('experience__controller__item--selected');
                hideClearSelectionButtonIfNeeded(isSelectionActive);
            } else {
                $(`div[skill='${skillName}']`)
                    .addClass('experience__controller__item--selected');
                showClearSelectionButton();
            }
            hideListItemsIfNeeded();
        });
}

export function addExperienceEvents() {
    addSkillsEvents();
    addClearSelectionEvent();
    addLearnMoreEvent();
}
