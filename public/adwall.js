const state = {
    adForm: false
}

function checkAdForm() {
    $('.createAd').on('click', function () {
        state.adForm = true;
        render();
    })
}

/*
UI > State > API
On initial load fill state with api
don't store whole state, just whatever I need
*/


function displayAds(ads) {
    for (var i = 0; i <= Storage.length; i++) {
        $('.ad-block-container').append(
            '<div class="adsblock"><p>' + ads.title + '</p>' +
            '<a href=' + '"' + ads.link + '">' +
            'Website link</a>' +
            '<p>' + ads.description + '</p>' +
            '</div>');
    }
}

//  function renderAdForm() {

//     $('.ad-form-container').show();
//     $('.cancel').on('click', function (event) {
//         event.preventDefault();
//         state.adForm = false;
//         render();
//     })
// }

function render() {
    $('.ad-form-container').empty();
    if (state.adForm === true) {
        renderAdForm($('.ad-form-container'), () => {
            state.adForm = false;
            render();
        })
        $('.createAd').hide()
    }
    else {
        $('.createAd').show();
    }
}

function watchHandlers() {
    $('.ad-form').on('submit', e => {
        e.preventDefault();
        const adItem = {
            "title": e.target.title.value,
            "URL": e.target.URL.value,
            "description": e.target.Description.value
        }
        createAd(adItem).then(() => {
            $('.ad-form').hide();
        })
    });
}

//post ad functions




$(function () {
    render();
    watchHandlers();
    checkAdForm();
})

