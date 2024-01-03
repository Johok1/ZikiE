export default class Controller {
    constructor() {
        this.fetch_url_validation = "https://www.zinxswiki.com/api/v1/validation"
    }

    postLoginRequest(body) {
        return fetch(this.fetch_url_validation + "/login", {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).catch(error => {
            console.error(error);
        });
    }

    postGoogleLoginRequest(idTokenStr) {
        return fetch(this.fetch_url_validation + "/googleLogin/" + idTokenStr, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        }).catch(error => {
            console.error(error);
        });
    }
}
