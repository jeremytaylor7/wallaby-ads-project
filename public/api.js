
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

//google how to use local storage

// call load inside get ads function 
// need save function to interact with local storage
//
// when post is clicked call createAd function which
// adds to mockdata and then saves
//goal is to finish client and design by next session!

function loadAds() {
    localStorage.setItem("ads", JSON.stringify(MOCK_ADS.fakeAds[1]));
}

function load() {
    return localStorage.getItem("ads");
}

function displayAds(ads) {
    for (index in ads.fakeAds) {
        $('.ad-block-container').append(
            '<div class="adsblock"><p>' + ads.fakeAds[index].title + '</p>' +
            '<a href=' + '"' + ads.fakeAds[index].link + '">' +
            'Website link</a>' +
            '<p>' + ads.fakeAds[index].description + '</p>' +
            '</div>');
    }
}
function getAds(callback) {
    let adItem = load();
    let ads = JSON.parse(adItem);
    callback(ads);
}

function getAndDisplayAds() {
    getAds(displayAds);
}




$(function () {
    loadAds();
    getAndDisplayAds();
})

