
export default class Controller {
    constructor() {
        this.fetch_url_wiki = "https://www.zinxswiki.com/api/v1/wiki"
        this.fetch_url_file = "https://www.zinxswiki.com/api/v1/file"
    }

    getWikiImages(token, wikiId) {
        return fetch(this.fetch_url_wiki + "/getWikiImages/" + token +"/" + wikiId, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    postWikiImage(token, wikiId, filename) {
        return fetch(this.fetch_url_wiki + "/addWikiImage/" + token +"/" + wikiId +"/" + filename, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    getWikiVideos(token, wikiId) {
        return fetch(this.fetch_url_wiki + "/getWikiVideos/" + token + "/" + wikiId, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    postWikiVideo(token, wikiId, filename) {
        return fetch(this.fetch_url_wiki + "/addWikiVideo/" + token + "/" + wikiId + "/" + filename, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    getImage(filename) {
        return fetch(this.fetch_url_file + "/getImage/" + filename, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    getVideo(filename) {
        return fetch(this.fetch_url_file + "/getVideo/" + filename, {
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