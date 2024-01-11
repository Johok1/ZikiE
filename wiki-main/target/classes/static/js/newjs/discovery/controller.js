export default class Controller {
    constructor() {
        this.fetch_url_validation = "https://www.zinxswiki.com/api/v1/validation"
        this.fetch_url_profile = "https://www.zinxswiki.com/api/v1/profile"
        this.fetch_url_page = "https://www.zinxswiki.com/api/v1/page"
        this.fetch_url_wiki = "https://www.zinxswiki.com/api/v1/wiki"
        this.fetch_url_tag = "https://www.zinxswiki.com/api/v1/tag"
        this.fetch_url_genre = "https://www.zinxswiki.com/api/v1/genre"
        this.fetch_url_subgenre = "https://www.zinxswiki.com/api/v1/subgenre"
    }

    getTopGenres() {
        return fetch(this.fetch_url_genre + "/getTopGenres", {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            }
        }).catch(error => {
            console.error(error)
        })
    }

    getGenres() {
        return fetch(this.fetch_url_genre + "/getGenres", {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            }
        }).catch(error => {
            console.error(error)
        })
    }

    getGenreName(id) {
        return fetch(this.fetch_url_genre + "/getGenreName" + "/" + id, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            }
        }).catch(error => {
            console.error(error)
        })
    }

    getSubGenreName(id) {
        return fetch(this.fetch_url_subgenre + "/getSubGenreName" + "/" + id, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            }
        }).catch(error => {
            console.error(error)
        })
    }
    
    getTopSubGenres(id) {
        return fetch(this.fetch_url_genre + "/getTopSubGenres/"+id, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            }
        }).catch(error => {
            console.error(error)
        })
    }

    getSubGenres(id) {
        return fetch(this.fetch_url_genre + "/getSubGenres/" + id, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            }
        }).catch(error => {
            console.error(error)
        })
    }

    getSubGenreCommunityWikis(id) {
        return fetch(this.fetch_url_genre + "/getSubGenreCommunityWikis/" + id, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            }
        }).catch(error => {
            console.error(error)
        })
    }

    getSubGenreWikis(id) {
        return fetch(this.fetch_url_genre + "/getSubGenreWikis/" + id, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            }
        }).catch(error => {
            console.error(error)
        })
    }

    getSubGenrePages(id) {
        return fetch(this.fetch_url_genre + "/getSubGenrePages/" + id, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            }
        }).catch(error => {
            console.error(error)
        })
    }


    getIsAdmin(token) {
        return fetch(this.fetch_url_validation + "/isAdmin/" + token, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            }
        }).catch(error => {
            console.error(error)
        });
    }

}