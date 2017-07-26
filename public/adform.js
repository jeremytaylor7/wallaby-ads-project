
(function () {
    const HTML = `<form class="adForm--container" action="/posts" method="POST">
                <label>Title:</label>
                <input type="text" class="adForm--title" name="title"></input>
                <label>Website url:</label>
                <input type="text" class="adForm--url" name="URL"></input>
                <label>Description</label>
                <input type="text" class="adForm--description" name="Description"></input>
                <button type="submit" class="adForm--submit">Post Ad</button>
                <button type="submit" class="adForm--edit">Save Changes</button>
                <button class="adForm--cancel">Cancel</button>
            </form> `
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
            // editHandler();
        })
    };


})();
