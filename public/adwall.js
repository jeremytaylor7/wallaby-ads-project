if (this.module) {
    module.exports = this;
}

function random() {
    let int = Math.random() * 10000;
    return Math.floor(int);
}

const randomCode = random();

const state = {
    ads: [],
    adForm: false,
    index: 0,
    editing: false,
    codeInvalid: false
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
    const list = ads.map((item) => {
        return adsTemplate(item.title, item.link, item.description);
    })
    const adString = list.join('');
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
    const link = $(event.target).parent().find('.link').attr('href');
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
    //this is to edit the ad without refresh
    //this promise takes response from api and adds to state.ads    
    createAd(item)
        .then(res => {
            console.log(res);
            return res;
        })
        .then(res => {
            state.ads.push(res);
            state.adForm = false;
            render();
        })
}

function editAd(item, formCode) {
    const index = state.index;
    const editId = state.ads[index]._id;
    checkadCode(editId)
        .then(code => {
            console.log(code);
            console.log(code.adCode + 'the code!');
            console.log('user entered' + formCode);
            if (code.adCode === formCode) {
                console.log('we found a match!');
                state.ads.splice(index, 1, item);
                editAds(item, editId);
                state.adForm = false;
                render();
            }
            else {
                console.log('invalid ad code!');
                state.codeInvalid = true;
                displayError();
            }
        });

}
function deleteAd() {
    const index = state.index;
    let adId = state.ads[index]._id
    for (let i = 0; i <= index; i++) {
        if (index === i) {
            state.ads.splice(index, 1);
            console.log('item deleted');
        }
    }
    console.log(adId);
    deleteAds(index, adId);
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
        $('.adForm--code').val(randomCode);
    }
    else {
        $('.createAd').show();
    }

    if (state.editing === true) {
        $('.adForm--code').val('');
        $('.adForm--code').attr("readonly", false);

    }

    displayAds(state.ads);

}

function displayError() {
    $('.code-validator').show()
    state.codeInvalid = false;
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


function addToState(listOfAds) {
    console.log(listOfAds);
    listOfAds.forEach(item => {
        state.ads.push(item);
    })
}
$(function () {
    getAds().then(displayAds);
    getAds().then(addToState);
    displayAds(state.ads);
    render();
    watchHandlers();
    checkAdForm();

})


