
(function () {
    const HTML = `<form class="adForm--container" action="/posts" method="POST">
                <label>Title:</label>
                <input type="text" class="adForm--title" name="title"></input>
                <label>Website url:</label>
                <input type="text" class="adForm--url" name="URL"></input>
                <label>Description</label>
                <input type="text" class="adForm--description" name="Description"></input>
                <button type="submit" class="adForm--submit">Post Ad</button>
                <button class="adForm--cancel">Cancel</button>
            </form> `
    window.renderAdForm = function (element, cancelClickHandler) {

        $(HTML).find('.adForm--cancel').click(
            (e) => {
                e.preventDefault();
                cancelClickHandler(e);
            });
        element.html(HTML)
    };
})();
