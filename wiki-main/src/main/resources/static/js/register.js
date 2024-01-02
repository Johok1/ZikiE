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
        this.view.handleRegisterBtn(this.handleRegisterBtn)
        this.view.error.classList.add("hidden")
    }

    handleRegisterBtn = () => {
        this.view.error.classList.add("hidden")
        let registerBody = `{
                "username": "`+ this.view.inputUsername.value + `",
                "email": "`+ this.view.inputEmailAddress.value + `",
                "password": "`+ this.view.inputPassword.value + `",
                "confirmPassword": "`+ this.view.inputConfirmPassword.value + `",
                "dob": "`+ this.view.dateOfBirth.value + `",
                "pincode": "`+ this.view.regPincode1.value +this.view.regPincode2.value +this.view.regPincode3.value + this.view.regPincode4.value+ `"
                }`

        this.controller.postRegistrationRequest(JSON.parse(registerBody))
            .then(response => response.text())
            .then(response => {
                if (response == "true") {
                    window.location.href = "auth-login-basic.html"
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
        this.error = document.getElementById("error")
        this.inputFirstName = document.getElementById("inputFirstName");
        this.inputLastName = document.getElementById("inputLastName");
        this.inputEmailAddress = document.getElementById("inputEmailAddress");
        this.inputUsername = document.getElementById("inputUsername");
        this.inputPassword = document.getElementById("inputPassword");
        this.inputConfirmPassword = document.getElementById("inputConfirmPassword");
        this.dateOfBirth = document.getElementById("inputDateOfBirth");
        this.regPincode1 = document.getElementById("regPincode1");
        this.regPincode2 = document.getElementById("regPincode2");
        this.regPincode3 = document.getElementById("regPincode3");
        this.regPincode4 = document.getElementById("regPincode4");
        this.registerBtn = document.getElementById("registerBtn");

    }

    handleRegisterBtn = (handler) => {
        this.registerBtn.addEventListener("click", function () {
            handler()
        })
    }
}

class Controller {
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

function parseJwt(token) {

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


function handleCredentialResponse(response) {
    let email = parseJwt(response.credential).email
    app.view.inputEmailAddress.value = email
}

const app = new Model(new View(), new Controller())