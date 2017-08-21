
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


function createAd(item, callback) {
    fetch('/api/ads', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "title": item.title,
            "link": item.link,
            "description": item.description,
            "adCode": item.adCode
        })
    })
    return Promise.resolve('success');

}

// function saveAds() {
//     fetch('/api/ads', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             "title": "Hubot",
//             "link": "hubot",
//             "description": "hey",
//         })
//     })
//     localStorage.setItem('ads', JSON.stringify(MOCK_ADS.fakeAds));
//     return Promise.resolve('success');

// }

function getAds(callback) {
    const apiAds = fetch('/api/ads')
        .then(res => {
            return res.json();
        })
    // remove mock ads
    // const adStorage = JSON.parse(localStorage.getItem('ads'));
    return Promise.resolve(apiAds);
}
function checkadCode(id) {
    return fetch(`/api/ads/${id}`)
        .then(res => {
            return res.json();
        });
}

function editAds(item, id) {
    fetch(`/api/ads/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "title": item.title,
            "link": item.link,
            "description": item.description,
        })

    })
        .then(res => {
            console.log(res);
        })
}


function deleteAds(index, id) {
    return fetch(`/api/ads/${id}`, {
        method: 'delete'
    })
        .then(res => {
            console.log(res);
        })
}

// function getAds(callback) {
//     callback(ads);
//     return getAds();
// }/

function getAndDisplayAds(callback) {
    getAds(displayAds);
    return Promise.resolve('promise');
}




//add delete and update to this api
//use api to get local storage add to state and render
// all of my functions need to return promises in api
// Promise.resolve documentation static promises


//homework
//write test for endpoints
//if any logic beyond .find and json put in separate javascript file to unit test the file