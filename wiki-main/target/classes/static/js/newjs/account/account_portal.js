export default class AccountPortal {
    constructor() {
        this.settings = true
        this.advanced = false
        this.profileNickname = document.getElementById("profileNickname");
        this.profileUsername = document.getElementById("profileUsername");
        this.profileEmail = document.getElementById("profileEmail");

        this.newPassword = document.getElementById("newPassword")
        this.confirmPassword = document.getElementById("confirmPassword")
        this.profileBio = document.getElementById("profileBio");
        this.profileImageInput = document.getElementById("profileImageInput");
        this.profilePicture = document.getElementById("profilePicture");
        this.bannerPicture = document.getElementById("profileBanner");
        this.bannerImageInput = document.getElementById("bannerImageInput")
        this.errorText = document.getElementById("errorText")
        this.successText = document.getElementById("successText")

        this.settingsBtn = document.getElementById("settingsTab")
        this.advancedBtn = document.getElementById("advancedTab")

        this.settingsDiv = document.getElementById("settingsDiv")
        this.advancedDiv = document.getElementById("advancedDiv")
        this.settingsBtnInputListener(this.handleSettingsBtn)
        this.advancedBtnInputListener(this.handleAdvancedBtn)
    }

    handleSettingsBtn = () => {
        this.showSettingsDiv()
        this.hideAdvancedDiv()
        this.settings = true
        this.advanced = false
    }

    handleAdvancedBtn = () => {
        this.showAdvancedDiv()
        this.hideSettingsDiv()
        this.advanced = true
        this.settings = false
        this.successText.classList.add("hidden")
        this.errorText.innerHTML = ""
    }

    hideAdvancedDiv() {
        this.advancedDiv.classList.add("hidden")
    }

    showAdvancedDiv() {
        this.advancedDiv.classList.remove("hidden")
    }

    hideSettingsDiv() {
        this.settingsDiv.classList.add("hidden")
    }

    showSettingsDiv() {
        this.settingsDiv.classList.remove("hidden")
    }

    settingsBtnInputListener = handler => {
        this.settingsBtn.addEventListener('click', function () {
            handler()
        })
    }

    advancedBtnInputListener = handler => {
        this.advancedBtn.addEventListener('click', function () {
            handler()
        })
    }
}