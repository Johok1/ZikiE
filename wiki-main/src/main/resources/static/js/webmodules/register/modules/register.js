/*
 * 
 * read all of the fields, put them into an appropriate json format, pass them into the backend to submit registration requestion upon
 * button press, redirection should happen automatically to the login page, perhaps need a message here telling them to check their email,
 * otherwise they might not even know they need to verify first. 
 * 
 */
import BackendManager from './backend/backend_manager.js'

class Register {
    constructor() {
        this.backendManager = new BackendManager()
        this.createAccountBtn = document.getElementById("createAccountBtn")
        this.usernameInput = document.getElementById("usernameInput")
        this.passwordInput = document.getElementById("passwordInput")
        this.emailInput = document.getElementById("emailInput")
        this.confirmPasswordInput = document.getElementById("confirmPasswordInput")
        this.errorDiv = document.getElementById("errorDiv")
        this.errorDiv.classList.add("visually-hidden")
        this.createAccountBtn.addEventListener("click", this.sendRegisterRequest)
    }

    sendRegisterRequest = () => {
        if (this.passwordInput.value != this.confirmPasswordInput.value) {
            this.errorDiv.classList.remove("visually-hidden")
            this.errorDiv.innerHTML = "Passwords do not match!"
        } else {
            this.backendManager.controller.postRegisterRequest(this.usernameInput.value, this.emailInput.value, this.passwordInput.value)
                .then(response => response.text())
                .then(response => {
                    if (response == "true") {
                        this.errorDiv.classList.remove("visually-hidden")
                        this.errorDiv.innerHTML = "Check your email and login!"
                    }
                })
        }
    }

}

const app = new Register()