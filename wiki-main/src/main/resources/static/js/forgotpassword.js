
class View {
    constructor() {
        this.inputEmailAddress = document.getElementById("inputEmailAddress")
        this.resetPasswordBtn = document.getElementById("resetPasswordBtn")
        this.errorMessage = document.getElementById("error")
        this.message = document.getElementById("message")
    }

    handleResetPaswordBtnClick = (handler) => {
        this.resetPasswordBtn.addEventListener("click", function () {
            handler()
        })
    }
}

class Model {
    constructor(view, controller) {
        this.view = view
        this.controller = controller
        this.view.handleResetPaswordBtnClick(this.handleResetPaswordBtnClick)
    }

    handleResetPaswordBtnClick = () => {
        let email = this.view.inputEmailAddress.value
        if (email == undefined || email == "") {
            //show error ?
            console.log("email bad: " + email)
        } else {
            this.controller.resetPassword(email)
                .then(response => response.text())
                .then(response => {
                    if (response == "true") {
                        this.view.message.innerHTML = "Email sent!"
                        this.view.errorMessage.classList.add("hidden")
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
        this.domain = "www.zinxswiki.com"
        this.fetch_url_validation = "/api/v1/validation"
    }

    resetPassword(email) {
        return fetch(this.fetch_url_validation + "/resetPassword/" + email, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            }
        }).catch(error => {
            console.error(error)
        });
    }

}

const app = new Model(new View(), new Controller())