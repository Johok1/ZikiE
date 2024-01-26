export default class Controller{
    constructor(){
        this.fetch_url_wiki = "https://www.zinxswiki.com/api/v1/wiki"
        this.fetch_url_file = "https://www.zinxswiki.com/api/v1/file"
        this.fetch_url_page = "https://www.zinxswiki.com/api/v1/page"
    }

    getFileContext(fileContextId) {
        return fetch(this.fetch_url_file + "/getFileContext/" + fileContextId, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    getPageName(token, pageId){
        return fetch(this.fetch_url_page + "/getPageName/" + token +"/" +pageId, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    deleteFile(wikiId, fileContextId) {
        return fetch(this.fetch_url_file + "/deleteFile/" + wikiId + "/" + fileContextId, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    getPageStatus(token, pageId){
        return fetch(this.fetch_url_page + "/getPageStatus/" + token + "/" + pageId, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    togglePageStatus(token, pageId) {
        return fetch(this.fetch_url_page + "/togglePageStatus/" + token +"/" + pageId, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    getImage(fileContextId) {
        return fetch(this.fetch_url_file + "/getImage/" + fileContextId, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    getVideo(fileContextId) {
        return fetch(this.fetch_url_file + "/getVideo/" + fileContextId, {
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