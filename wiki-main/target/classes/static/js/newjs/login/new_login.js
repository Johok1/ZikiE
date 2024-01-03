import LoginView from './login_view.js'
import Controller from './controller.js'
import Cookie from './cookie.js'
import LoginRequestFactory from './login_request_factory.js'


const cookie = new Cookie()

class Model {
    constructor() {
        this.view = new LoginView()
        this.controller = new Controller()
        this.request_factory = new LoginRequestFactory()
        this.view.handleLoginBtn(this.handleLoginBtn)
        this.view.error.classList.add("hidden")
     
    }

    

    handleLoginBtn = () => {
        this.view.error.classList.add("hidden")
        let loginBody = this.request_factory.constructRequest(this.view.inputEmailAddress.value, this.view.inputPassword.value)
        this.controller.postLoginRequest(JSON.parse(loginBody))
            .then(response => response.text())
            .then(response => {
                if (!(response.includes("Error"))) {
                    if (this.view.rememberPassword.checked) {
                        cookie.setCookie("rememberPassword", this.view.inputPassword.value)
                    }
                    cookie.setCookie("token", response, 1)
                    window.location.href = "new_index.html"
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

const app = new Model()


window.onload = function () {
    if (cookie.getCookie("rememberPassword") != "" && cookie.getCookie("rememberPassword") != undefined) {
        app.view.inputPassword.value = cookie.getCookie("rememberPassword")
        console.log("set password")
    } else {
        console.log("no remember password")
    }
}


