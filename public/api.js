
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


// function createAd(item) {
//     return new Promise((resolve, reject) => {
//         MOCK_ADS.fakeAds.push(item);
//         saveAds();
//         resolve();
//     })
// }

function saveAds() {
    localStorage.setItem('ads', JSON.stringify(MOCK_ADS));

}

function getLocalStorage() {
    JSON.parse(localStorage.getItem('ads'));
}

// function getAds(callback) {
//     let ads = getLocalStorage();
//     callback(ads);
// }

function getAndDisplayAds() {
    getAds(displayAds);
}




$(function () {
    // getAds();
})

