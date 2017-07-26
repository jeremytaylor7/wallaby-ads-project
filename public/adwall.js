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

    return `<div class="adsblock">
    <p class="title">${title}</p>
    <a href="${link}" class="link">Visit Website</a>
    <p class="description">${description}</p>
    <button class"delete-btn">Delete</button>
    <button class="edit-button">Edit Ad</button>
    </div>`
};
function displayAds(ads) {
    const adsList = ads.map((item) => {
        return adsTemplate(item.title, item.link, item.description);
    })
    const adString = adsList.join('');
    $('.ad-block-container').html(adString);
    $('.edit-button').on('click', e => {
        const title = $(event.target).parent().find('.title').text();
        const link = $(event.target).parent().find('.link').attr('href');
        const description = $(event.target).parent().find('.description').text();

        const adItem = {
            "title": title,
            "link": link,
            "description": description
        }
        let targetIndex = 0;

        for (var i = 0; i < state.ads.length; i++) {
            if (adItem.title === state.ads[i].title) {
                targetIndex = i;
            }
        }
        state.adForm = true;
        render();
        $('.adForm--title').val(adItem.title);
        $('.adForm--url').val(adItem.link);
        $('.adForm--description').val(adItem.description);
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
function editAd(item, index) {
    state.ads[index] = item;
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


function addToState(MOCK_ADS) {
    MOCK_ADS.forEach(item => {
        state.ads.push(item);
    })
}

$(function () {
    getLocalStorage().then(addToState);
    render();
    displayAds(state.ads);
    watchHandlers();
    checkAdForm();
})

