/*
 * 
 * read all of the fields, submit to backend, attempt to set response as cookie for token, redirection should
 * happen automatically to the homepage, the backend should load the correct one if the user is logged in. Perhaps it would be better to
 * not simply be redirected back into the login-register page upon failure, but instead given an error message and the chance to try agai
 * 
 */
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