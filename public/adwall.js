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
        }

    ]
}
function getAds(callback) {
    setTimeout(function () { callback(MOCK_ADS) });
}
function displayAds(ads) {
    for (index in ads.fakeAds) {
        $('body').append(
            '<div class="adsblock"><p>' + ads.title + '</p>' +
            '<p>' + ads.link + '</p>' +
            '<p>' + ads.description + '</p>' +
            '</div>');
    }
}

function getAndDisplayAds() {
    getAds(displayAds);
}

$('h1').on('click', function () {
    alert('HEYYY');
})

$(function () {
    getAndDisplayAds();
})

