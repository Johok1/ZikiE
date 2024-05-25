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
                    } else {
                        this.errorDiv.innerHTML = response
                        this.errorDiv.classList.remove("visually-hidden")
                    }
                })
        }
    }

}

const app = new Register()

function handleCredentialResponse(response) {
    app.backendManager.controller.postGoogleRegisterRequest(response.credential)
        .then(response => response.text())
        .then(response => {
            if (response == "true") {
                window.location.href = "https://www.zinxswiki.com/login"
            } else {
                console.error("google registration request failed in the backend")
            }
        })
}