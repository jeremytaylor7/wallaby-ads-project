const state = {
    adForm: false
}

function checkAdForm() {
    $('.createAd').on('click', function () {
        state.adForm = true;
        render();
    })
}

function renderAdForm() {

    $('.ad-form-container').show();
    $('.cancel').on('click', function (event) {
        event.preventDefault();
        state.adForm = false;
        render();
    })
}
function render() {
    if (state.adForm === true) {
        renderAdForm();
        $('.createAd').hide()
    }
    else {
        $('.ad-form-container').hide();
        $('.createAd').show();
    }
}

$(function () {
    checkAdForm();
})

