export default class Controller {
    constructor() {
        this.fetch_url_wiki = "https://www.zinxswiki.com/api/v1/wiki"
        this.fetch_url_category = "https://www.zinxswiki.com/api/v1/category"
    }

    getWikiPages(token, wikiId) {
        return fetch(this.fetch_url_wiki + "/getWikiPages/" + token + "/" + wikiId, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    getCategoryPages(categoryId) {
        return fetch(this.fetch_url_category + "/getCategoryPages/" + categoryId, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }
    getWikiTopPages(token, wikiId) {
        return fetch(this.fetch_url_wiki + "/getWikiTopPages/" + token +"/" + wikiId, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

}

/*
  POST() {
        return fetch(this.fetch_url_ + "/endpoint/"+pathparam, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    GET() {
        return fetch(this.fetch_url_ + "/endpoint/" + pathparam, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }
 */