import Cookie from './cookie.js'
import RegisterRequestFactory from './register_request_factory.js'
import RegisterView from './register_view.js'
import Controller from './controller.js'


//let cookie = new Cookie()
class Model {
    constructor() {
        this.view = new RegisterView()
        this.controller = new Controller()
        this.registerRequestFactory = new RegisterRequestFactory()
        this.view.handleRegisterBtn(this.handleRegisterBtn)
        this.view.error.classList.add("hidden")
    }

    handleRegisterBtn = () => {
        this.view.error.classList.add("hidden")
        let username = this.view.inputUsername.value
        let email = this.view.inputEmailAddress.value
        let password = this.view.inputPassword.value
        let confirmPassword = this.view.inputConfirmPassword.value
        let dob = this.view.dateOfBirth.value
        let pincode = this.view.regPincode1.value + this.view.regPincode2.value + this.view.regPincode3.value + this.view.regPincode4.value

        let registerBody = this.registerRequestFactory.constructRequest(username, email, password, confirmPassword, dob, pincode)

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

window.handleCredentialResponse = handleCredentialResponse

const app = new Model()
