import BackendManager from './backend/backend_manager.js'


class Login {
    constructor() {
        this.backendManager = new BackendManager()
        this.loginBtn = document.getElementById("loginBtn")
        this.passwordInput = document.getElementById("passwordInput")
        this.emailInput = document.getElementById("emailInput")
        this.loginBtn.addEventListener("click", this.sendLoginRequest)
    }

    sendLoginRequest = () => {
        let backendManager = this.backendManager
        this.backendManager.controller.postLoginRequest(this.emailInput.value, this.passwordInput.value)
            .then(response => response.text())
            .then(response => {
                backendManager.cookie.setCookie("token", response, 8)
                window.location.href = "https://www.zinxswiki.com"
            })
    }



}

const app = new Login() 

function handleCredentialResponse(response) {
    app.backendManager.controller.postGoogleLoginRequest(response.credential)
        .then(response => response.text())
        .then(response =>{
            if (response != false) {
                app.backendManager.cookie.setCookie("token", response, 8)
                window.location.href = "https://www.zinxswiki.com"
            } else {
                console.error("google login request failed!")
            }
        })
}

document.getElementById("g-id-onload").dataCallback = this.handleCredentialResponse