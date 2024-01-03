export default class View {
    constructor() {
        this.error = document.getElementById("error")
        this.inputFirstName = document.getElementById("inputFirstName");
        this.inputLastName = document.getElementById("inputLastName");
        this.inputEmailAddress = document.getElementById("inputEmailAddress");
        this.inputUsername = document.getElementById("inputUsername");
        this.inputPassword = document.getElementById("inputPassword");
        this.inputConfirmPassword = document.getElementById("inputConfirmPassword");
        this.dateOfBirth = document.getElementById("inputDateOfBirth");
        this.regPincode1 = document.getElementById("regPincode1");
        this.regPincode2 = document.getElementById("regPincode2");
        this.regPincode3 = document.getElementById("regPincode3");
        this.regPincode4 = document.getElementById("regPincode4");
        this.registerBtn = document.getElementById("registerBtn");

    }

    handleRegisterBtn = (handler) => {
        this.registerBtn.addEventListener("click", function () {
            handler()
        })
    }
}