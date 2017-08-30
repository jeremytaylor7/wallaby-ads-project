
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
function createAd(item, callback) {
    const adRes = fetch('/api/ads', {
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

        .then(res => {
            return res.json();
        })
        .then(results => {
            return results;
        })
    return Promise.resolve(adRes);
}
function getAds(callback) {
    const apiAds = fetch('/api/ads')
        .then(res => {
            return res.json();
        })
    return Promise.resolve(apiAds);
}
function getAdById(callback, id) {
    const apiAds = fetch(`/api/ads/${id}`)
        .then(res => {
            return res.json();
        })
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
function getAndDisplayAds(callback) {
    getAds(displayAds);
    return Promise.resolve('promise');
}
