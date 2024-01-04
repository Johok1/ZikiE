class Controller {
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

class Cookie {
    setCookie(cname, cvalue, exhours) {
        const d = new Date();
        d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
}
let cookie = new Cookie()


function handleCredentialResponse(response) {
    console.log(":P")
    let controller = new Controller()
    controller.postGoogleLoginRequest(response.credential)
        .then(response => response.text())
        .then(response => {
            console.log(response)
            if (response != "false") {
                cookie.setCookie("token", response)
                window.location.href = "https://www.zinxswiki.com"
            } else {

            }
        }).catch(error => {
            console.error(error)
        })
}
