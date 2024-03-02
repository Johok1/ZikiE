export default class Controller {
    constructor() {
        this.fetch_url_account = "https://www.zinxswiki.com/account"
    }

    postAccountPageContent(wixId, pageId, content) {
        return fetch(this.fetch_url_account + "/postAccountPageContent/"+wixId+"/"+pageId, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            },
            body: content
        }).catch(error => {
            console.error(error);
        });
    }

}
