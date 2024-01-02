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

class View {
    constructor() {
        this.resetPasswordBtn = document.getElementById("resetPasswordBtn")
        this.inputNewPassword = document.getElementById("inputNewPassword")
        this.inputConfirmPassword = document.getElementById("inputConfirmPassword")
        this.errorMessage = document.getElementById("error")
    }
    handleResetPasswordBtnClick = (handler) => {
        this.resetPasswordBtn.addEventListener("click", function () {
            handler()
        })
    }
}

class Model {
    constructor(view, controller) {
        this.view = view
        this.controller = controller
        this.token = getCookie("emailToken")
        if (this.token != undefined && this.token != "") {
            this.tokenValid = this.token
        } else {
            //error page instead?
            window.location.href = "login"
        }
        this.view.handleResetPasswordBtnClick(this.handleResetPasswordBtnClick)
    }

    handleResetPasswordBtnClick = () => {
        let newPassword = this.view.inputNewPassword.value
        let confirmPassword = this.view.inputConfirmPassword.value
        console.log(newPassword + " " + confirmPassword)
        if (newPassword != "") {
            this.controller.postResetPassword(getCookie("emailToken"), newPassword, confirmPassword)
                .then(response => response.text())
                .then(response => {
                    if (response == "true") {
                        window.location.href = "login"
                    } else {
                        this.view.errorMessage.classList.remove("hidden")
                        this.view.errorMessage.innerHTML = response 
                    }
                }).catch(error => {
                    console.error(error)
                    this.view.errorMessage.classList.remove("hidden")
                })
        } 
    }
}

class Controller {
    constructor() {
        this.domain = "https://www.zinxswiki.com"
        this.fetch_url_validation = this.domain + "/api/v1/validation"
        this.fetch_url_resetpassword = "/resetpassword"
    }

    postResetPassword(emailToken, newPassword, confirmPassword) {
        let body = `{
                          "newPassword": "`+ newPassword + `",
                          "confirmPassword": "`+ confirmPassword + `"
                        }`
        let result = JSON.parse(body)
        return fetch(this.fetch_url_resetpassword + "/resetPassword/" + emailToken, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result)
        }).catch(error => {
            console.error(error);
        });
    }
}

const app = new Model(new View(), new Controller())