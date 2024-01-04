import AccountPortal from './account_portal.js'
import Controller from './controller.js'
import Cookie from './cookie.js'


let cookie = new Cookie()

class View {
    constructor() {
        this.accountPopup = new AccountPortal()
        this.submitBtn = document.getElementById("submitBtn")
    }
}

class Model {
    constructor(view) {
        this.view = view
        this.controller = new Controller()

        this.initParams()

    }



    initParams() {

        this.initUsername()
        this.initNickname()
        this.initBio()
        this.initProfilePicture()
        this.initBannerImage()

    }

    init = () => {
        this.view.submitBtn.addEventListener("click", this.submitParams)
    }

    submitParams = () => {
        if (this.view.accountPopup.settings) {
            this.handleProfilePictureInput()
                .then(() => {
                    this.handleProfileBannerInput()
                })
                .then(() => {
                    this.handleProfileEmailInputEvent()
                })
                .then(() => {
                    this.handleProfileNicknameInputEvent()
                })
                .then(() => {
                    this.handleProfileUsernameInputEvent()
                })
                .then(() => {
                    this.handleProfileBioInputEvent()
                })
        } else if (this.view.accountPopup.advanced) {
            this.handleProfilePasswordInputEvent()
        }
    }

    handleProfilePasswordInputEvent = () => {
        let newPassword = this.view.accountPopup.newPassword.value
        let confirmPassword = this.view.accountPopup.confirmPassword.value
        if (newPassword != "" && confirmPassword != "") {
            return this.controller.postResetPassword(cookie.getCookie("token"), newPassword, confirmPassword)
                .then(response => response.text())
                .then(response => {
                    if (response != "true") {
                        this.view.accountPopup.successText.classList.add("hidden")
                        this.view.accountPopup.errorText.innerHTML = response
                    } else {
                        this.view.accountPopup.successText.classList.remove("hidden")
                        this.view.accountPopup.errorText.innerHTML = ""
                    }
                    console.log(response);
                }).catch(error => {
                    console.error(error)
                })
        }
    }

    handleProfilePictureInput = () => {

        return this.controller.setProfilePicture(cookie.getCookie("token"), this.view.accountPopup.profileImageInput.files.item(0))
            .then(response => {
                this.initProfilePicture()
                console.log(response);


            }).catch(error => {
                console.error(error)
            })
    }

    handleProfileBannerInput = () => {
        // console.log(this.view.accountPopup.bannerImageInput.files.item(0))
        return this.controller.setBannerImage(cookie.getCookie("token"), this.view.accountPopup.bannerImageInput.files.item(0))
            .then(response => {
                this.initBannerImage()
                console.log(response);

            }).catch(error => {
                console.error(error)
            })
    }

    handleProfileEmailInputEvent = () => {
        if (this.view.accountPopup.profileEmail.value.includes('@')) {
            return this.controller.setProfileEmail(cookie.getCookie("token"), this.view.accountPopup.profileEmail.value)
                .then(response => {
                    console.log(response);

                }).catch(error => {
                    console.error(error)
                })
        }
    }

    handleProfileNicknameInputEvent = () => {
        return this.controller.setProfileNickname(cookie.getCookie("token"), this.view.accountPopup.profileNickname.value)
            .then(response => {
                this.initNickname()
                console.log(response)
            }).catch(error => {
                console.error(error)
            })
    }

    handleProfileUsernameInputEvent = () => {
        return this.controller.setProfileUsername(cookie.getCookie("token"), this.view.accountPopup.profileUsername.value)
            .then(response => {
                this.initUsername()
                console.log(response);
            }).catch(error => {
                console.error(error)
            })
    }

    handleProfileBioInputEvent = () => {
        return this.controller.setProfileBio(cookie.getCookie("token"), this.view.accountPopup.profileBio.value)
            .then(response => {
                this.initBio()
                console.log(response)
            }).catch(error => {
                console.error(error)
            })
    }

    initNickname() {
        return this.controller.getProfileNickname(cookie.getCookie("token"))
            .then(response => {

                return response

            }).then(response => response.text())
            .then(response => {
                this.view.accountPopup.profileNickname.value = response;

            })
    }

    initUsername() {
        return this.controller.getProfileUsername(cookie.getCookie("token"))
            .then(response => {

                return response

            }).then(response => response.text())
            .then(response => {
                this.view.accountPopup.profileUsername.value = response;

            })
    }

    initBio() {
        return this.controller.getProfileBio(cookie.getCookie("token"))
            .then(response => {

                return response

            }).then(response => response.text())
            .then(response => {
                this.view.accountPopup.profileBio.value = response;

            })
    }

    initProfilePicture() {
        return this.controller.getProfilePicture(cookie.getCookie("token"))
            .then(response => {

                return response

            }).then(response => response.blob())
            .then(response => {
                console.log(response);
                this.view.accountPopup.profilePicture.src = URL.createObjectURL(response);

            })

    }

    initBannerImage() {
        return this.controller.getBannerImage(cookie.getCookie("token"))
            .then(response => {

                return response

            }).then(response => response.blob())
            .then(response => {
                console.log(response);
                this.view.accountPopup.bannerPicture.src = URL.createObjectURL(response);

            })
    }


}

const app = new Model(new View())
app.init()