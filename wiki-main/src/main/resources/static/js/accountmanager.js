class AccountPortal {
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

class View {
    constructor() {
        this.accountPopup = new AccountPortal()
        this.submitBtn = document.getElementById("submitBtn")
    }

}

class Model {
    constructor(view, controller) {
        this.view = view
        this.controller = controller


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
            return this.controller.postResetPassword(getCookie("token"), newPassword, confirmPassword)
                .then(response => response.text())
                .then(response=>{
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

     handleProfilePictureInput = ()=>{

        return this.controller.setProfilePicture(getCookie("token"), this.view.accountPopup.profileImageInput.files.item(0))
            .then(response => {
                this.initProfilePicture()
                console.log(response);
               

            }).catch(error => {
                console.error(error)
            })
    }

    handleProfileBannerInput = () => {
        // console.log(this.view.accountPopup.bannerImageInput.files.item(0))
        return this.controller.setBannerImage(getCookie("token"), this.view.accountPopup.bannerImageInput.files.item(0))
            .then(response => {
                this.initBannerImage()
                console.log(response);
         
            }).catch(error => {
                console.error(error)
            })
    }

   

    handleProfileEmailInputEvent = () => {
        if (this.view.accountPopup.profileEmail.value.includes('@')) {
            return this.controller.setProfileEmail(getCookie("token"), this.view.accountPopup.profileEmail.value)
                .then(response => {
                    console.log(response);

                }).catch(error => {
                    console.error(error)
                })
        }
    }

    handleProfileNicknameInputEvent = () => {
        return this.controller.setProfileNickname(getCookie("token"), this.view.accountPopup.profileNickname.value)
            .then(response => {
                this.initNickname()
                console.log(response)
            }).catch(error => {
                console.error(error)
            })
    }

    handleProfileUsernameInputEvent = () => {
        return this.controller.setProfileUsername(getCookie("token"), this.view.accountPopup.profileUsername.value)
            .then(response => {
                this.initUsername()
                console.log(response);
            }).catch(error => {
                console.error(error)
            })
    }

    handleProfileBioInputEvent = () => {
        return this.controller.setProfileBio(getCookie("token"), this.view.accountPopup.profileBio.value)
            .then(response => {
                this.initBio()
                console.log(response)
            }).catch(error => {
                console.error(error)
            })
    }


  


    initNickname () {
       return this.controller.getProfileNickname(getCookie("token"))
            .then(response => {
               
                    return response
                
            }).then(response => response.text())
            .then(response => {
                this.view.accountPopup.profileNickname.value = response;
               
            })
    }

    initUsername () {
      return this.controller.getProfileUsername(getCookie("token"))
            .then(response => {
               
                    return response
               
            }).then(response => response.text())
            .then(response => {
                this.view.accountPopup.profileUsername.value = response;
               
            })
    }

    initBio ()  {
        return this.controller.getProfileBio(getCookie("token"))
            .then(response => {
               
                    return response
              
            }).then(response => response.text())
            .then(response => {
                this.view.accountPopup.profileBio.value = response;
               
            })
    }

    initProfilePicture ()  {
        return this.controller.getProfilePicture(getCookie("token"))
            .then(response => {
                
                    return response
               
            }).then(response => response.blob())
            .then(response => {
                console.log(response);
                this.view.accountPopup.profilePicture.src = URL.createObjectURL(response);
            
        })

    }

    initBannerImage () {
       return this.controller.getBannerImage(getCookie("token"))
            .then(response => {
               
                    return response
               
            }).then(response => response.blob())
            .then(response => {
                console.log(response);
                this.view.accountPopup.bannerPicture.src = URL.createObjectURL(response);

            })
    }

  
}

class Controller {
    constructor() {
        this.fetch_url_validation = "https://www.zinxswiki.com/api/v1/validation"
        this.fetch_url_profile = "https://www.zinxswiki.com/api/v1/profile"
        this.fetch_url_page = "https://www.zinxswiki.com/api/v1/page"
        this.fetch_url_wiki = "https://www.zinxswiki.com/api/v1/wiki"
        this.fetch_url_tag = "https://www.zinxswiki.com/api/v1/tag"
        this.fetch_url_validation = this.domain + "/api/v1/validation"
        this.fetch_url_resetpassword = "/resetpassword"
    }

    postResetPassword(emailToken, newPassword, confirmPassword) {
        let body = `{
                          "newPassword": "`+ newPassword + `",
                          "confirmPassword": "`+ confirmPassword + `"
                        }`
        let result = JSON.parse(body)
        return fetch(this.fetch_url_resetpassword + "/resetPassword/" + emailToken, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result)
        }).catch(error => {
            console.error(error);
        });
    }

    getProfilePicture(token) {
        return fetch(this.fetch_url_profile + "/getProfileImage/" + token, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
            }
        }).catch(error => {
            console.error(error)
        });

    }

    setProfilePicture(token, input) {
        let formData = new FormData()
        formData.append('file', input)
        return fetch(this.fetch_url_profile + "/setProfileImage/" + token, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            },
            body: formData
        }).catch(error => {
            console.error(error)
        });
    }

    getBannerImage(token) {
        return fetch(this.fetch_url_profile + "/getBannerImage/" + token, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
            }
        }).catch(error => {
            console.error(error)
        });

    }

    setBannerImage(token, input) {
        let formData = new FormData()
        formData.append('file', input)
        return fetch(this.fetch_url_profile + "/setBannerImage/" + token, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*'
            },
            body: formData
        }).catch(error => {
            console.error(error)
        });
    }

    getProfileEmail(token) {
        return fetch(this.fetch_url_profile + "/getEmail/" + token, {
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

    setProfileEmail(token, email) {
        return fetch(this.fetch_url_profile + "/setEmail/" + token + "/" + email, {
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

    setProfilePassword(token, password) {
        return fetch(this.fetch_url_profile + "/setPassword/" + token + "/" + password, {
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

    getProfileBio(token) {
        return fetch(this.fetch_url_profile + "/getBio/" + token, {
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

    setProfileBio(token, bio) {
        return fetch(this.fetch_url_profile + "/setBio/" + token + "/" + bio, {
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

    getProfileUsername(token) {
        return fetch(this.fetch_url_profile + "/getUsername/" + token, {
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

    setProfileUsername(token, username) {
        return fetch(this.fetch_url_profile + "/setUsername/" + token + "/" + username, {
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

    setProfileNickname(token, nickname) {
        return fetch(this.fetch_url_profile + "/setNickname/" + token + "/" + nickname, {
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

    getProfileNickname(token) {
        return fetch(this.fetch_url_profile + "/getNickname/" + token, {
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


function setCookie(cname, cvalue, exhours) {
    const d = new Date();
    d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const app = new Model(new View(), new Controller())
app.init()



   
