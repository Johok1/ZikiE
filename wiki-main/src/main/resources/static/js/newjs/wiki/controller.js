export default class Controller {
    constructor() {
        this.fetch_url_wiki = "https://www.zinxswiki.com/api/v1/wiki"
    }

    getWikiName(id) {
        return fetch(this.fetch_url_wiki + "/getWikiName/" + id, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    getWikiImg(id) {
        return fetch(this.fetch_url_wiki + "/getWikiImage/" + id, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
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

