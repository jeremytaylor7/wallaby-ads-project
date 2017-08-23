
(function () {
    const HTML = btnTitle => `
                <form class="adForm--container" action="/api/ads" method="POST">
                <div class="form-group">
                <label>Title:</label>
                <input type="text" class="adForm--title" name="title"></input>
                <label>Website url:</label>
                <input type="text" class="adForm--url" name="link"></input>
                <label>Description</label>
                <textarea class="adForm--description" name="description"></textarea>
                <label>Your Ad Pin</label>
                <input class="adForm--code" name="adCode" value="5513" readonly="true"></input>
                <p class="code-validator">Your ad code is invalid! Please try again!</p>
                <button type="submit" class="adForm--submit btn btn-success">${btnTitle}</button>
                <button class="adForm--cancel btn btn-danger">Cancel</button>
                </div>
            </form>`

    window.renderAdForm = function (element, cancelClickHandler, postHandler, btnTitle) {

        const component = element.html(HTML(btnTitle));

        component.find('.adForm--cancel').on('click',
            (e) => {
                e.preventDefault();
                cancelClickHandler(e);
            });



        component.find('form').on('submit', (e) => {

            e.preventDefault();

            const adItem = {
                "title": e.target.title.value,
                "link": e.target.link.value,
                "description": e.target.description.value,
                "adCode": e.target.adCode.value
            }
            const formCode = $('.adForm--code').val()
            postHandler(adItem, formCode);


        })
    };


})();
