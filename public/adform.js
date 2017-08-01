
(function () {
    const HTML = `<div class="container">
                <div class="row">
                <form class="adForm--container" action="/posts" method="POST">
                <div class="col-md-6">
                <label>Title:</label>
                <input type="text" class="adForm--title" name="title"></input>
                </div>
                <div class="col-md-6">
                <label>Website url:</label>
                <input type="text" class="adForm--url" name="URL"></input>
                </div>
                <label>Description</label>
                <textarea class="adForm--description" name="Description"></textarea>
                <button type="submit" class="adForm--submit">Post Ad</button>
                <button type="submit" class="adForm--edit">Save Changes</button>
                <button class="adForm--cancel">Cancel</button>
            </form>
            </div> 
            </div>`
    window.renderAdForm = function (element, cancelClickHandler, postHandler, editHandler) {

        const component = element.html(HTML);

        component.find('.adForm--cancel').on('click',
            (e) => {
                e.preventDefault();
                cancelClickHandler(e);
            });



        component.find('form').on('submit', (e) => {

            e.preventDefault();

            const adItem = {
                "title": e.target.title.value,
                "link": e.target.URL.value,
                "description": e.target.Description.value
            }
            postHandler(adItem);
            createAd(adItem).then(saveAds());


        })
        component.find('.adForm--edit').on('click', (e) => {
            e.preventDefault();
            editItem = {
                "title": $('.adForm--title').val(),
                "link": $('.adForm--url').val(),
                "description": $('.adForm--description').val(),
            }
            console.log(editItem);
            editHandler(editItem);
        })
    };


})();
