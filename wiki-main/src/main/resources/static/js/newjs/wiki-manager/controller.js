export default class Controller {
    constructor() {
        this.fetch_url_wiki = "https://www.zinxswiki.com/api/v1/wiki"
    }

    setWikiImg(token, wikiId, input) {
        let formData = new FormData()
        formData.append('file', input)
        return fetch(this.fetch_url_wiki + "/setWikiImg/" + token + "/" + wikiId , {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
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

    getWikiImg(wikiId) {
        return fetch(this.fetch_url_wiki + "/getWikiImage/" + wikiId, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
            }
        }).catch(error => {
            console.error(error);
        });
    }

    getWikiName(wikiId) {
        return fetch(this.fetch_url_wiki + "/getWikiName/" + wikiId, {
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