export default class LoginPopup {
    constructor() {
        this.mainDiv = document.getElementById("loginDropdown")
    }

    hide() {
        this.mainDiv.classList.add("hidden")
    }

    show() {
        this.mainDiv.classList.remove("hidden")
    }
}