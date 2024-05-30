export default class Controller {
    constructor() {
        this.fetch_url_page = "https://www.zinxswiki.com/api/v1/page"
        this.fetch_url_image = "https://www.zinxswiki.com/api/v1/image"
    }

    createAccountPage(token, name) {
        
        return fetch(this.fetch_url_page + "/postNewAccountPage/" + token + "/" + name, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }).catch(error => {
            console.error(error)
        });
    }

    postPageImage(token, pageId, imageObj) {
        return fetch(this.fetch_url_image + "/postPageImage/" + token + "/" + pageId, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(imageObj)
        }).catch(error => {
            console.error(error)
        });
    }

    

}