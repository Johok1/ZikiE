export default class LoginView {
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