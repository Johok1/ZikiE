export default class Controller {
    constructor() {
        this.fetch_url_wiki = "https://www.zinxswiki.com/api/v1/wiki"
    }

    setWikiImg(token, wikiId, formData) {
        return fetch(this.fetch_url_wiki + "/setWikiImg/" + token + "/" + wikiId , {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            },
            body: formData
        }).catch(error => {
            console.error(error);
        });
    }

    setWikiName(token, wikiId, name) {
        return fetch(this.fetch_url_wiki + "/setWikiName/" + token + "/" + wikiId + "/" + name, {
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

    getWikiImg(token, wikiId) {
        return fetch(this.fetch_url_wiki + "/getWikiImg/" + token + "/" + wikiId, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
            }
        }).catch(error => {
            console.error(error);
        });
    }

    getWikiName(token, wikiId) {
        return fetch(this.fetch_url_wiki + "/getWikiName/" + token + "/" + wikiId, {
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

}