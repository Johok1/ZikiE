export default class Controller {
    constructor() {
        this.fetch_url_genre = "https://www.zinxswiki.com/api/v1/genre"
        this.fetch_url_wiki = "https://www.zinxswiki.com/api/v1/wiki"
        this.fetch_url_searchtag = "https://www.zinxswiki.com/api/v1/searchtag"
    }

    getAllSubGenres() {
        return fetch(this.fetch_url_genre + "/getAllSubGenres" {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    getWikiSubGenres(token, wikiId) {
        return fetch(this.fetch_url_wiki + "/getWikiSubGenre/" + token+"/"+wikiId, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    addWikiSubGenre(token, wikiId, subGenreId) {
        return fetch(this.fetch_url_wiki + "/addWikiSubGenre/" + token + "/" + wikiId + "/" + subGenreId, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    getAllSearchTags() {
        return fetch(this.fetch_url_searchtag + "/getAllSearchTags", {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    newSearchTag(token, name) {
        return fetch(this.fetch_url_searchtag + "/newSearchTag/" + token +"/" + name, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    addWikiSearchTag(token, wikiId, searchTagId) {
        return fetch(this.fetch_url_wiki + "/addWikiSearchTag/" + token + "/" + wikiId + "/" + searchTagId, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    getWikiCategories(token, wikiId) {
        return fetch(this.fetch_url_wiki + "/getWikiCategories/" + token + "/" + wikiId, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    addWikiCategory(token, wikiId, name) {
        return fetch(this.fetch_url_wiki + "/addWikiCategory/" + token +"/"+wikiId+"/"+name, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    getWikiSearchTags(token, wikiId) {
        return fetch(this.fetch_url_wiki + "/getWikiSearchTags/" + token + "/" + wikiId, {
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