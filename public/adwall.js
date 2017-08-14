if (this.module) {
    module.exports = this;
}

const state = {
    ads: [],
    adForm: false,
    index: 0,
    editing: false
}

function onEdit(title, state) {
    state.index = state.ads.findIndex(item => item.title === title)
    state.adForm = true;
}

function checkAdForm() {
    $('.createAd').on('click', function () {
        state.adForm = true;
        state.editing = false;
        render();
    })
}


/*
UI > State > API
On initial load fill state with api
don't store whole state, just whatever I need
*/


const adsTemplate = (title, link, description) => {

    return `<div class="adsblock col-sm-3">
    <p class="title"><u>${title}</u></p>
    <hr>
    <p class="description">${description}</p>
    <hr>
    <a class="btn btn-sm btn-primary link" href="${link}" role="button">Website</a>
    <button type="button" class="btn btn-success edit-button btn-sm">Edit</button>
    <button type="button" class="btn btn-danger delete-btn btn-sm">Delete</button>
    </div>`
};
function displayAds(ads) {
    const adsList = ads.map((item) => {
        return adsTemplate(item.title, item.link, item.description);
    })
    const adString = adsList.join('');
    $('.ad-block-container').html(adString);

    $('.delete-btn').on('click', e => {
        deleteAdHandler();
        deleteAd();
    })
    $('.edit-button').on('click', e => {

        editHandler(e);

    });
}

function editHandler(e) {
    state.editing = true;
    const title = $(event.target).parent().find('.title').text();
    const link = $(event.target).parent().find('.link').text();
    const description = $(event.target).parent().find('.description').text();
    onEdit(title, state);
    render();
    $('.adForm--title').val(title);
    $('.adForm--url').val(link);
    $('.adForm--description').val(description);

}


function cancelAd() {
    state.adForm = false;
    render();
}
function postAd(item) {
    state.ads.push(item);
    state.adForm = false;
    render();
}
function editAd(item) {
    const index = state.index;
    console.log(index);
    state.ads.splice(index, 1, item);
    editLocalStorage(item, index);
    state.adForm = false;
    render();

}
function deleteAd() {
    const index = state.index;
    for (let i = 0; i <= index; i++) {
        if (index === i) {
            state.ads.splice(index, 1);
            console.log('item deleted');
        }
    }
    deleteLocalStorage(index);
    render();
}
function checkEditMode() {
    if (state.editing === true) {
        return 'Save Changes';
    }
    else {
        return 'Post Ad';
    }
}
function render() {
    $('.ad-form-container').empty();
    if (state.adForm === true) {
        renderAdForm($('.ad-form-container'), cancelAd, state.editing ? editAd : postAd, checkEditMode());
        $('.createAd').hide()
    }
    else {
        $('.createAd').show();
    }
    displayAds(state.ads);
}

function watchHandlers() {

}
function deleteAdHandler() {
    const title = $(event.target).parent().find('.title').text();
    const link = $(event.target).parent().find('.link').attr('href');
    const description = $(event.target).parent().find('.description').text();

    const adItem = {
        "title": title,
        "link": link,
        "description": description
    }
    for (var i = 0; i < state.ads.length; i++) {
        if (adItem.title === state.ads[i].title) {
            state.index = i;
        }
    }
}

//post ad functions


function addToState(MOCK_ADS) {
    MOCK_ADS.forEach(item => {
        state.ads.push(item);
    })
}
$(function () {
    getLocalStorage().then(displayAds);
    saveAds();
    getLocalStorage().then(addToState);
    displayAds(state.ads);
    render();
    watchHandlers();
    checkAdForm();

})


