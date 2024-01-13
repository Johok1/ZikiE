export default class Controller {
    constructor() {
        this.fetch_url_wiki = "http://localhost/api/v1/wiki"
    }

    getNewWiki(token) {
        return fetch(this.fetch_url_wiki + "/newWiki/" + token, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            }
        }).catch(error => {
            console.error(error);
        });
    }
}

