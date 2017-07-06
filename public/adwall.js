const state = {
    adForm: false
}

const MOCK_ADS = {

    fakeAds: [
        {
            "title": "Get Paid To Clicks Ads!",
            "link": "http://getpaidtoclick.com",
            "description": "click ads for 0.05 per click easy!"
        },
        {
            "title": "1,2,3 beach lifestyle",
            "link": "http://123beachcourse.com",
            "description": "5 part course teaches" +
            " how to get paid online fast!"
        },
        {
            "title": "rags to riches",
            "link": "http://ragstoriches.com",
            "description": "learn the rags to riches secret!"
        }

    ]
}

function checkAdForm() {
    $('.createAd').on('click', function () {
        if (state.adForm === false) {
            state.adForm = true;
            renderAdForm();
            $('.createAd').hide()
        }

    })
}

function renderAdForm() {

    $('.ad-form-container').show();
    $('.cancel').on('click', function (event) {
        event.preventDefault();
        $('.ad-form-container').hide();
        $('.createAd').show();
    })
}


function displayAds(ads) {
    for (index in ads.fakeAds) {
        $('body').append(
            '<div class="adsblock"><p>' + ads.fakeAds[index].title + '</p>' +
            '<a href=' + '"' + ads.fakeAds[index].link + '">' +
            'Website link</a>' +
            '<p>' + ads.fakeAds[index].description + '</p>' +
            '</div>');
    }
}
function getAds(callback) {
    callback(MOCK_ADS);
}

function getAndDisplayAds() {
    getAds(displayAds);
}

$(function () {
    getAndDisplayAds();
    checkAdForm();
})

