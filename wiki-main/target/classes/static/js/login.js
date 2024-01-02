function setCookie(cname, cvalue, exhours) {
    const d = new Date();
    d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
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

class Model {
    constructor(view, controller) {
        this.view = view
        this.controller = controller
        this.view.handleLoginBtn(this.handleLoginBtn)
        this.view.error.classList.add("hidden")
        this.bindRememberPassword(this.handleRememberPassword, this.view.rememberPassword)
        
    }

    bindRememberPassword = (handler,input) => {
        input.addEventListener("click", function () {
            handler(input)
        })
    }

    handleRememberPassword = (input) => {
        console.log(input.checked)
    }

    handleLoginBtn = () => {
        this.view.error.classList.add("hidden")
        let loginBody = `{
                          "email": "`+ this.view.inputEmailAddress.value + `",
                          "password": "`+ this.view.inputPassword.value + `"
                        }`
        this.controller.postLoginRequest(JSON.parse(loginBody))
            .then(response => response.text())
            .then(response => {
                if (!(response.includes("Error"))) {
                    if (this.view.rememberPassword.checked) {
                        setCookie("rememberPassword", this.view.inputPassword.value)
                    }
                    setCookie("token", response, 1)
                    window.location.href = "index.html"
                } else if (response != "" && response != undefined) {
                    this.view.error.classList.remove("hidden")
                    this.view.error.innerHTML = response 
                }
            }).catch(error => {
                this.view.error.classList.remove("hidden")
                console.error(error)
                this.view.error.innerHTML = "An error has occured in the system"
            })
    }
}

class View {
    constructor() {
        this.inputEmailAddress = document.getElementById("inputEmailAddress")
        this.inputPassword = document.getElementById("inputPassword")
        this.loginBtn = document.getElementById("loginBtn")
        this.error = document.getElementById("error")
        this.rememberPassword = document.getElementById("rememberPassword")
    }

    handleLoginBtn = (handler) => {
        this.loginBtn.addEventListener("click", function () { 
            handler()
        })
    }
}

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

window.onload = function () {
    if (getCookie("rememberPassword") != "" && getCookie("rememberPassword") != undefined) {
        app.view.inputPassword.value = getCookie("rememberPassword")
        console.log("set password")
    } else {
        console.log("no remember password")
    }
}

/*
window.onload = function () {
    google.accounts.id.initialize({
        client_id: '168876054670-t977a0o6isruvtsk2ieumtak6qrio1pa.apps.googleusercontent.com',
        callback: handleCredentialResponse
    });
    google.accounts.id.prompt();
};
*/

/*
function parseJwt(token) {

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
*/
function handleCredentialResponse(response) {
    let controller = new Controller()
   // console.log(response)
   // console.log(parseJwt(response.credential))
  //  console.log(parseJwt(response.credential).email)
    controller.postGoogleLoginRequest(response.credential)
        .then(response => response.text())
        .then(response => {
            console.log(response)
            if (response != "false") {
                setCookie("token", response)
                window.location.href = "https://www.zinxswiki.com"
            } else {
                
            }
        }).catch(error => {
            console.error(error)
        })

    //this function is called after the response is validated, then you can send the email to a special endpoint
    //and a token can be returned, this is the "messy" solution until i implement the more complete solution of validating the token in the
    //backend, this can come with a security update 

    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.
  //  const responsePayload = decodeJwtResponse(response.credential);
    /*
    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);
    */
}




const app = new Model(new View(), new Controller())