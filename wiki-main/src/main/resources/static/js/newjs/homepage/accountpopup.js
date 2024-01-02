export default class AccountPopup {
    constructor() {
        this.mainDiv = document.getElementById("accountDropdown")
        this.signout = document.getElementById("signout")
    }

    attachSignoutHandler = (handler,cookie) => {
        this.signout.addEventListener("click", function () {
            handler(cookie)
        })
    }

    hide() {
        this.mainDiv.classList.add("hidden")
    }

    show() {
        this.mainDiv.classList.remove("hidden")
    }
}