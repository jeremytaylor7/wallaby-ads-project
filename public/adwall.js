if (this.module) {
  module.exports = this;
}

function random() {
  const int = Math.random() * 10000;
  return Math.floor(int);
}

const randomCode = random();

const state = {
  ads: [],
  adForm: false,
  index: 0,
  editing: false,
  codeInvalid: false,
};

function onEdit(title) {
  state.index = state.ads.findIndex(item => item.title === title);
  state.adForm = true;
}

function checkAdForm() {
  $('.createAd').on('click', () => {
    state.adForm = true;
    state.editing = false;
    render();
  });
}


/*
UI > State > API
On initial load fill state with api
don't store whole state, just whatever I need
*/


const adsTemplate = (title, link, description) => {
  const linkString = link, substring = "http";
  let linkVar;

  if (linkString.indexOf(substring) === -1) {
    linkVar = `http://${link}`;
  }
  else {
    linkVar = link;
  }

  return `<div class="adsblock col-sm-3 mr-10">
    <div class="title-container">
    <p class="title"><u>${title}</u></p>
    </div>
    <hr>
    <div class="description-container">
    <p class="description">${description}</p>
    </div>
    <hr>
    <div class"btn-container">
    <a class="col-sm-12 btn btn-sm btn-primary link" href="${linkVar}" role="button">Website</a>
    <button type="button" class="col-sm-12 btn btn-success edit-button btn-sm">Edit</button>
    </div>
    </div>`
};
function groupIntoRows(template, index) {
  if (index === 0) {
    return `<div class='row'>${template}`;
  } else if (index % 4 === 0) {
    return `</div><div class='row'>${template}`;
  }
  return template;
}

function displayAds(ads) {
  const list = ads.map((item, index) => {
    const template = adsTemplate(item.title, item.link, item.description);
    return groupIntoRows(template, index);
  });
  const adString = list.join('');
  $('.ad-block-container').html(adString);


  $('.edit-button').on('click', (e) => {
    window.scrollTo(0, 0);
    editHandler(e);
  });
}

function editHandler(e) {
  state.editing = true;
  const title = $(event.target).closest('.adsblock').find('.title').text();
  const link = $(event.target).parent().find('.link').attr('href');
  const description = $(event.target).closest('.adsblock').find('.description').text();
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
  // this is to edit the ad without refresh
  // this promise takes response from api and adds to state.ads    
  createAd(item)
    .then((res) => {
      console.log(res);
      return res;
    })
    .then((res) => {
      state.ads.push(res);
      state.adForm = false;
      state.success = 'success';
      render();
      displaySuccess();
    });
}

function editAd(item, formCode) {
  const index = state.index;
  const editId = state.ads[index]._id;
  checkadCode(editId)
    .then((code) => {
      console.log(code);
      console.log(`${code.adCode}the code!`);
      console.log(`user entered${formCode}`);
      if (code.adCode === formCode) {
        console.log('we found a match!');
        state.ads.splice(index, 1, item);
        editAds(item, editId);
        state.adForm = false;
        render();
      } else {
        console.log('invalid ad code!');
        state.codeInvalid = true;
        displayError();
      }
    });
}
function deleteAd(formCode) {
  const index = state.index;
  const deleteId = state.ads[index]._id;
  checkadCode(deleteId)
    .then((code) => {
      console.log(code);
      console.log(`${code.adCode}the code!`);
      console.log(`user entered${formCode}`);
      if (code.adCode === formCode) {
        console.log('we found a match!');
        for (let i = 0; i <= index; i++) {
          if (index === i) {
            state.ads.splice(index, 1);
            console.log('item deleted');
          }
        }
        console.log(deleteId);
        deleteAds(index, deleteId);
        state.adForm = false;
        state.success = 'delete';
        render();
        displaySuccess();
      } else {
        console.log('invalid ad code!');
        state.codeInvalid = true;
        displayError();
      }
    });
}

function checkEditMode() {
  if (state.editing === true) {
    return 'Save Changes';
  }

  return 'Post Ad';
}
function render() {
  $('.ad-form-container').empty();

  if (state.adForm === true) {
    renderAdForm($('.ad-form-container'), deleteAd, cancelAd, state.editing ? editAd : postAd, checkEditMode());
    $('.createAd').hide();
    $('.adForm--code').val(randomCode);
  } else {
    $('.createAd').show();
  }

  if (state.editing === true) {
    $('.adForm--code').val('');
    $('.adForm--code').attr('readonly', false);
  }

  displayAds(state.ads);
}

function displayError() {
  $('.code-validator').show();
  state.codeInvalid = false;
}
function hideSuccess() {
  $('.delete-success').hide();
  $('.post-success').hide();
}
function displaySuccess() {
  if (state.success === 'delete') {
    $('.delete-success').show();
    setTimeout(hideSuccess, 5000);
  } else {
    $('.post-success').show();
    setTimeout(hideSuccess, 5000);
  }
}
function watchHandlers() {

}
function deleteAdHandler() {
  const title = $(event.target).closest('.adsblock').find('.title').text();
  const link = $(event.target).parent().find('.link').attr('href');
  const description = $(event.target).closest('.adsblock').find('.description').text();

  const adItem = {
    title,
    link,
    description: description,
  };
  for (let i = 0; i < state.ads.length; i++) {
    if (adItem.title === state.ads[i].title) {
      state.index = i;
    }
  }
}

// post ad functions


function addToState(listOfAds) {
  console.log(listOfAds);
  listOfAds.forEach((item) => {
    state.ads.push(item);
  });
}
$(() => {
  getAds().then(displayAds);
  getAds().then(addToState);
  displayAds(state.ads);
  render();
  watchHandlers();
  checkAdForm();
});

