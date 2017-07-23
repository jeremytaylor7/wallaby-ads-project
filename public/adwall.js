const state = {
    ads: [],
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


const adsTemplate = (title, link, description) => {

    return `<div class="adsblock"><p>${title}</p>
    <a href=" ${link} ">
    Visit Website</a>
    <p>${description}</p>
    <button class"delete-btn">Delete</button>
    <button class="edit-button">Edit Ad</button>
    </div>`
};
function displayAds(ads) {
    const adsList = ads.map((item) => {
        return adsTemplate(item.title, item.URL, item.description);
    })
    const adString = adsList.join('');
    $('.ad-block-container').html(adString);
    $('.edit-button').on('click', e => {
        state.adForm = true;
        render();
    });
}

//  function renderAdForm() {

//     $('.ad-form-container').show();
//     $('.cancel').on('click', function (event) {
//         event.preventDefault();
//         state.adForm = false;
//         render();
//     })
// }

function cancelAd() {
    state.adForm = false;
    render();
}
function postAd(item) {
    state.ads.push(item);
    state.adForm = false;
    render();
}
function render() {
    $('.ad-form-container').empty();
    if (state.adForm === true) {
        renderAdForm($('.ad-form-container'), cancelAd, postAd);
        $('.createAd').hide()
    }
    else {
        $('.createAd').show();
    }
    displayAds(state.ads);
}

function watchHandlers() {
    $('.edit-button').click((e) => {
        alert('It works!');
    })

}

//post ad functions


function adToState(MOCK_ADS) {
    state.ads.forEach(item => {
        state.ads.push(item);
    })
    console.log(MOCK_ADS);
}

$(function () {
    getLocalStorage().then(adToState);
    render();
    watchHandlers();
    checkAdForm();
    saveAds();
})

