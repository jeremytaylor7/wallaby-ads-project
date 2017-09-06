
(function () {
  const HTML = btnTitle => `
                <form class="adForm--container" action="/api/ads" method="POST">
                <div class="form-group row">
                <label class="col-md-2 col-form-label">Title:</label>
                <div class="col-md-8">
                <input required  type="text" class="form-control adForm--title" name="title"></input>
                </div>
                </div>
                <div class="form-group row">
                <label class="col-md-2 col-form-label">Website:</label>
                <div class="col-md-8">
                <input required  type="text" class="form-control adForm--url" name="link"></input>
                </div>
                </div>
                <div class="form-group row">
                <label class="col-md-2 col-form-label">Description:</label>
                <div class="col-md-8">
                <textarea  type="text" class="form-control adForm--description" name="description"></textarea>
                </div> 
                </div>
                <div class="form-group row">
                <label class="col-md-2 col-form-label">Your Ad Pin:</label>
                <div class="col-md-8">
                <input required type="text" class="form-control adForm--code" name="adCode" value="5513" readonly="true"></input>
                </div>
                </div>
                <p class="code-validator">Your ad code is invalid! Please try again!</p>
                <div class="row">
                <button type="submit" class="col-4 adForm--submit btn btn-success">${btnTitle}</button>
                <button type="button" class="col-4 btn btn-danger delete-btn ">Delete</button>
                <button class="col-4 adForm--cancel btn btn-danger">Cancel</button>
                </div>
                
            </form>`;

  window.renderAdForm = function (element, deleteHandler, cancelClickHandler, postHandler, btnTitle) {
    const component = element.html(HTML(btnTitle));

    component.find('.adForm--cancel').on('click',
      (e) => {
        e.preventDefault();
        cancelClickHandler(e);
      });

    component.find('.delete-btn').on('click',
      (e) => {
        e.preventDefault();
        const formCode = $('.adForm--code').val();
        deleteHandler(formCode);
      });


    component.find('form').on('submit', (e) => {
      e.preventDefault();

      const adItem = {
        title: e.target.title.value,
        'link': e.target.link.value,
        description: e.target.description.value,
        'adCode': e.target.adCode.value,
      };
      const formCode = $('.adForm--code').val();
      postHandler(adItem, formCode);
    });
  };
}());
