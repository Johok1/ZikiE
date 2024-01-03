export default class Controller {
    constructor() {
        this.fetch_url_validation = "https://www.zinxswiki.com/api/v1/validation"
    }

    postRegistrationRequest(body) {
        return fetch(this.fetch_url_validation + "/register", {
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
}
