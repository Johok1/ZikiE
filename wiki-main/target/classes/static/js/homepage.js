class Pinlock {
    constructor(parent, element) {
        this.element = element;
        //Initialize the parent div for the pinlock element
        this.pinLockElement = document.createElement("div");
        //TODO: construct the pinlock element
        this.pinLockElement.style = "background-color: #6B6B6B; width: 300px; height: 100px; margin-left: 450px; position: absolute; border-radius: 10px";
        let background = document.createElement("div");
        background.style = "background-color: #191919; width: 253px; height: 70px; position: absolute; right: 25px; top: 15px;"
        

        let inputDiv1 = document.createElement("div");
        inputDiv1.style = "background-color: #D8D8D8; width: 50px; height: 50px; position: absolute; top: 10px; left: 10px"

        this.input1 = document.createElement("input");
        this.input1.style = "background-color: transparent; width: 50px; height: 50px; padding-left: 18px;"
        this.input1.type = "text";
        this.input1.maxlength = "1";
        this.input1.placeholder = "0";

        inputDiv1.appendChild(this.input1);
        background.appendChild(inputDiv1);

        let inputDiv2 = document.createElement("div");
        inputDiv2.style = "background-color: #D8D8D8; width: 50px; height: 50px; position: absolute; top: 10px; left: 70px"

        this.input2 = document.createElement("input");
        this.input2.style = "background-color: transparent; width: 50px; height: 50px; padding-left: 18px;"
        this.input2.type = "text";
        this.input2.maxlength = "1";
        this.input2.placeholder = "0";

        inputDiv2.appendChild(this.input2);
        background.appendChild(inputDiv2);

        let inputDiv3 = document.createElement("div");
        inputDiv3.style = "background-color: #D8D8D8; width: 50px; height: 50px; position: absolute; top: 10px; left: 130px"

        this.input3 = document.createElement("input");
        this.input3.style = "background-color: transparent; width: 50px; height: 50px; padding-left: 18px;"
        this.input3.type = "text";
        this.input3.maxlength = "1";
        this.input3.placeholder = "0";

        inputDiv3.appendChild(this.input3);
        background.appendChild(inputDiv3);

        let inputDiv4 = document.createElement("div");
        inputDiv4.style = "background-color: #D8D8D8; width: 50px; height: 50px; position: absolute; top: 10px; left: 190px"

        this.input4 = document.createElement("input");
        this.input4.style = "background-color: transparent; width: 50px; height: 50px; padding-left: 18px;"
        this.input4.type = "text";
        this.input4.maxlength = "1";
        this.input4.placeholder = "0";

        inputDiv4.appendChild(this.input4);
        background.appendChild(inputDiv4);


        this.pinLockElement.appendChild(background);

        parent.appendChild(this.pinLockElement);

       // console.log(this.pinLockElement);
     //   console.log(background);


        //set the position of the pinlock element to the position of the element passed in
        this.pinLockElement.style.top = element.style.top;
        this.pinLockElement.style.left = element.style.left;

        //lock the passed element
        this.lockElement();
        this.lock = true; 
    }

    attachInputEventListenerHandler = handler => {
        let isfull = this.isFull;
        this.input4.addEventListener("input", function () {
          //  console.log("pinlock input event handler isfull " + isfull)
            if (isfull) {
              //  console.log("class pinlock input handler")
                handler();
            }
        });
    }

    clearInput() {
        this.input1.value = null;
        this.input2.value = null;
        this.input3.value = null;
        this.input4.value = null;
    }

    lockElement() {
        this.clearInput();
        this.element.classList.add("hidden");
        this.pinLockElement.classList.remove("hidden");
        this.lock = true 
    }

    showElement() {
        this.element.classList.remove("hidden");
    }

    removePinlock() {
        this.pinLockElement.classList.add("hidden");
        this.showElement();
        this.lock = false 
    }

    input() {
        let input = "";
        input = this.input1.value + this.input2.value  + this.input3.value  + this.input4.value
        return input
    }

    isFull() {
       // console.log("class pinlcok isFull() " + this.input1.value.length) 
       // console.log("class pinlcok isFull() " + this.input2.value.length)
       // console.log("class pinlcok isFull() " + this.input3.value.length)
       // console.log("class pinlcok isFull() " + this.input4.value.length)
        if (this.input1.value.length > 0) {
            if (this.input2.value.length > 0) {
                if (this.input3.value.length > 0) {
                    if (this.input4.value.length > 0) {
                        return true;
                    } 
                } 
            }
        }
        return false; 
    }

}

class AccountPortal {
    constructor() {
        this.accountPopup = document.getElementById("accountPopup");
        this.section = document.getElementById("popups");
        this.cancelButton = document.getElementById("profileCancel");
        this.lockedSection = document.getElementById("lockedSection");
        this.parentSection = document.getElementById("parentSection");
        this.profileNickname = document.getElementById("profileNickname");
        this.profileUsername = document.getElementById("profileUsername");
        this.profileEmail = document.getElementById("profileEmail");
        this.profilePassword = document.getElementById("profilePassword");
        this.profileBio = document.getElementById("profileBio");
        this.profileImageInput = document.getElementById("profileImageInput");
        this.profilePicture = document.getElementById("profilePicture");
        this.bannerPicture = document.getElementById("profileBanner");
        this.bannerImageInput = document.getElementById("bannerImageInput")

        this.sectionPinLock = new Pinlock(this.parentSection, this.lockedSection);
        this.sectionPinLock.pinLockElement.style.marginLeft = "50px";
    }

    bannerImageInputListener = handler => {
        this.bannerImageInput.addEventListener('input', function () {
            handler();
        });
    }

    profileImageInputListener = handler => {
        this.profileImageInput.addEventListener('input', function () {
            handler();
        });
    }

    profilePasswordInputListener = handler => {
        this.profilePassword.addEventListener('input', function () {
            handler();
        })
    }

    profileEmailInputListener = handler => {
        this.profileEmail.addEventListener('input', function () {
            handler();
        });
    }

    profileNicknameInputListener = handler => {
        this.profileNickname.addEventListener('input', function () {
            handler();
        });
    }

    profileUsernameInputListener = handler => {
        this.profileUsername.addEventListener('input', function () {
            handler();
        });
    }

    profileBioInputListener = handler => {
        this.profileBio.addEventListener('input', function () {
            handler();
        });
    }

    sectionPinlockInputListener = handler => {
        this.sectionPinLock.attachInputEventListenerHandler(handler);
    }

    cancelButtonClickEventListener = handler => {
        this.cancelButton.addEventListener("click", function () {
            handler();
        });
    }

    hidePopup() {
        this.accountPopup.classList.add("hidden");
    }

    showPopup() {
        this.accountPopup.classList.remove("hidden");
    }

    hideSection() {
        this.section.classList.add("hidden");
    }

    showSection() {
        this.section.classList.remove("hidden");
    }

}

class LoginRegisterPopup {
    constructor() {
        this.popupsDiv = document.getElementById("profilepopups");
        this.popup = document.getElementById("LoginRegisterPopup");
        this.loginLabel = document.getElementById("LoginLabel");
        this.registerLabel = document.getElementById("RegisterLabel");
    }

    attachLoginLabelEventHandler = handler => {
        this.loginLabel.addEventListener("click", function () {
            handler();
        });
    }

    attachRegisterLabelEventHandler = handler => {
        this.registerLabel.addEventListener("click", function () {
            handler();
        });
    }

    hidePopup() {
        this.popup.classList.add("hidden");
    }

    hideSection() {
        this.popupsDiv.classList.add("hidden");
    }

    showSection() {
        this.popupsDiv.classList.remove("hidden");
    }

    showPopup() {
        this.popup.classList.remove("hidden");
    }
}

class LoginPopup {
    constructor() {
        this.loginPopup = document.getElementById("loginPopup");
        this.popups = document.getElementById("popups");
        this.cancelButton = document.getElementById("loginCancel");
       // this.username = document.getElementById("loginUsernameInput");
        this.email = document.getElementById("loginEmailInput");
        this.password = document.getElementById("loginPasswordInput");
        this.loginButton = document.getElementById("loginButton");
    }

    attachLoginButtonEventHandler = handler => {
        this.loginButton.addEventListener("click", function () {
            handler();
        });
    }

    isInputFull() {
       
            if (this.email.value.length > 0) {
                if (this.password.value.length > 0) {
                    return true;
                }
            }

        return false;
    }

    attachLoginCancelEventHandler = handler => {
        this.cancelButton.addEventListener("click", function () {
            handler();
        });
    }

    showPopup() {
        this.loginPopup.classList.remove("hidden");
    }
    hidePopup() {
        this.loginPopup.classList.add("hidden");
    }
    showSection() {
        this.popups.classList.remove("hidden");
    }
    hideSection() {
        this.popups.classList.add("hidden");
    }
}

class RegisterPopup {
    constructor() {
        this.registerPopup = document.getElementById("registerpopup");
        this.popups = document.getElementById("popups");
        this.cancelButton = document.getElementById("registerCancel");
        this.username = document.getElementById("regUsernameInput");
        this.email = document.getElementById("regEmailInput");
        this.dob = document.getElementById("regDobInput");
        this.pincode1 = document.getElementById("regPincode1");
        this.pincode2 = document.getElementById("regPincode2");
        this.pincode3 = document.getElementById("regPincode3");
        this.pincode4 = document.getElementById("regPincode4");
        this.password = document.getElementById("regPasswordInput");
        this.confirmPassword = document.getElementById("regConfirmPasswordInput");
        this.registerButton = document.getElementById("registerButton");
    }

    attachRegisterCancelEventHandler = handler => {
        this.cancelButton.addEventListener("click", function () {
            handler();
        });
    }

    attachRegisterButtonClickHandler = handler => {
        this.registerButton.addEventListener("click", function () {
            handler();
        });
    }

    isInputFull() {
        if (this.username.value.length > 0) {
            if (this.email.value.length > 0) {
                if (this.dob.value.length > 0) {
                    if (this.pincode1.value.length > 0) {
                        if (this.pincode2.value.length > 0) {
                            if (this.pincode3.value.length > 0) {
                                if (this.pincode4.value.length > 0) {
                                    if (this.password.value.length > 0) {
                                        if (this.confirmPassword.value.length > 0) {
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    }

    showPopup() {
        this.registerPopup.classList.remove("hidden");
    }
    hidePopup() {
        this.registerPopup.classList.add("hidden");
    }
    showSection() {
        this.popups.classList.remove("hidden");
    }
    hideSection() {
        this.popups.classList.add("hidden");
    }
}

class AccountLogoutPopup {
    constructor() {
        this.section = document.getElementById("profilepopups");
        this.accountLogoutPopup = document.getElementById("accountLogoutPopup");
        this.accountLabel = document.getElementById("accountLabel");
        this.logoutLabel = document.getElementById("logoutLabel");
        this.zikilabel = document.getElementById("zikilabel")
    }

    showZikiLabel() {
        this.zikilabel.classList.remove("hidden")
    }

    hideZikiLabel() {
        this.zikilabel.classList.add("hidden")
    }

    attachZikiLabelClickHandler = handler => {
        this.zikilabel.addEventListener("click", function () {
            handler()
        })
    }

    attachLogoutLabelClickHandler = handler => {
        this.logoutLabel.addEventListener("click", function () {
            handler();
        });
    }

    attachAccountLabelClickHandler = handler => {
        this.accountLabel.addEventListener("click", function () {
            handler();
        });
    }

    showPopup() {
        this.accountLogoutPopup.classList.remove("hidden");
    }

    hidePopup() {
        this.accountLogoutPopup.classList.add("hidden");
    }

    showSection() {
        this.section.classList.remove("hidden");
    }
    hideSection() {
        this.section.classList.add("hidden");
    }
}

class PageLoginRegister {
    constructor(parent) {
        this.div = document.createElement("div");
        this.div.classList.add("loginRegisterPopup");
        this.div.appendChild(document.createElement("br"));

        this.loginHeader = document.createElement("a");
        this.loginHeader.innerHTML = "Login";
        this.loginHeader.href = "auth-login-basic.html";
        this.loginHeader.classList.add("createPageLabel");
        this.loginHeader.style.color = "white";
        this.loginHeader.style.textAlign = "center";
        this.loginHeader.style.fontSize = "20px";

        this.registerHeader = document.createElement("a");
        this.registerHeader.innerHTML = "Register";
        this.registerHeader.href = "auth-register-basic.html";
        this.registerHeader.classList.add("createPageLabel");
        this.registerHeader.style.color = "white";
        this.registerHeader.style.textAlign = "center";
        this.registerHeader.style.fontSize = "20px";

        this.message = document.createElement("p");
        this.message.innerHTML = "Please login to create wikis and pages";
        this.message.style.color = "white";
        this.message.style.textAlign = "center";
        this.message.style.fontSize = "16px";

        this.div.appendChild(this.message);
        this.div.appendChild(document.createElement("br"));
        this.div.appendChild(this.loginHeader);
        this.div.appendChild(document.createElement("br"));
        this.div.appendChild(document.createElement("br"));
        this.div.appendChild(this.registerHeader);
        this.div.style.textAlign = "center";
        this.div.style.position = "absolute";
        parent.appendChild(this.div);
        this.div.style.bottom = "100px";
        this.div.style.left = "100px";
    }
}

class NewPagePopup {
    constructor(parent) {
        this.div = document.createElement("div");
        this.div.classList.add("createPagePopup");
        this.div.appendChild(document.createElement("br"));
        this.header = document.createElement("a");
        this.wikiheader = document.createElement("a")
        this.wikiheader.innerHTML = "Create Wiki";
        this.wikiheader.href = "wiki_editor.html";
        this.wikiheader.classList.add("createPageLabel")
        this.wikiheader.style.color = "white"
        this.wikiheader.style.textAlign = "center";
        this.wikiheader.style.fontSize = "20px";
        
        this.div.appendChild(this.wikiheader)
        this.div.appendChild(document.createElement("br"))
        this.div.appendChild(document.createElement("br"))
        this.div.appendChild(this.header);
        this.header.innerHTML = "Create Page";
        this.header.style.color = "white";
        this.div.style.textAlign = "center";
        this.header.classList.add("createPageLabel");
        this.div.style.position = "absolute";
        parent.appendChild(this.div);
        this.div.style.bottom = "100px";
        this.div.style.left = "100px";
        this.header.href = "page_editor.html";
        this.header.style.fontSize = "20px";
        
    }
}

/*
 *<div class="col-1" style="margin-left: 10px; margin-right: 10px; background-color: black; width: 70px; height: 100px; text-align: center">
 * <label style="color:white; padding-top: 100px;">
 * Name
 * </label>
 * </div>
 */
class PageGraphic {
    constructor(name) {
        this.pageName = name
        this.div = document.createElement("div");
        this.div.classList.add("col-1")
        this.div.style.marginLeft = "10px";
        this.div.style.marginRight = "10px";
        this.div.style.backgroundColor = "black";
        this.div.style.width = "70px";
        this.div.style.height = "100px";
        this.div.style.textAlign = "center";

        this.label = document.createElement("label");
        this.label.style.color = "white";
        this.label.style.paddingTop = "100px";
        this.label.innerHTML = "Page: " + name
        this.div.appendChild(this.label);
        
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

class Model {
    constructor(view, controller) {
        this.view = view;
        this.controller = controller;
        setCookie("paegId", "", 1);
        setCookie("wikiId", "", 1);
        this.view.attachPinlockHomepageEventHandler(this.homePinInputEventHandler);
        this.view.attachProfilePicClickEventHandler(this.profilePicClickEventHandler);
      
  
        this.view.attachLoginCancelHandler(this.loginCancelEventHandler);
        this.view.attachRegisterCancelHandler(this.registerCancelEventHandler);
        this.view.attachLoginButtonClickHandler(this.loginButtonClickHandler);
        this.view.attachLogoutLabelClickHandler(this.logoutClickEventHandler);
        this.view.attachRegisterButtonClickHandler(this.registerButtonClickHandler);
        this.view.attachAccountLabelClickHandler(this.accountLabelClickHandler);
        this.view.cancelButtonClickEventListener(this.cancelButtonProfileClickHandler);

        this.view.attachSectionPinlockInputListener(this.sectionPinlockInputEventHandler);

        //account manager
        this.view.attachProfileNicknameInputHandler(this.handleProfileNicknameInputEvent);
        this.view.attachProfileUsernameInputHandler(this.handleProfileUsernameInputEvent);
        this.view.attachProfileBioInputHandler(this.handleProfileBioInputEvent);
        this.view.attachProfilePasswordInputHandler(this.handleProfilePasswordInputEvent);
        this.view.attachProfileEmailInputHandler(this.handleProfileEmailInputEvent);
        this.view.attachProfileImageInputHandler(this.handleProfilePictureInput);
        this.view.attachBannerImageInputHandler(this.handleProfileBannerInput);

        this.view.handleGenreBtn(this.handleGenreBtnClick);
        this.view.handleGenreHomeBtn(this.handleGenreHomeBtnClick);
        this.view.accountLogoutPopup.attachZikiLabelClickHandler(this.zikiLabelHandler)
        this.isGenre = false; 
        this.isPopupShown = false;
        this.isLoggedIn = false;
       
        this.pageList = ""
        this.wikiList = ""
       
        if (getCookie("token")) {
            this.isLoggedIn = true;
            this.handleCheckAdmin()
        }
    }

    handleCheckAdmin = () => {
        this.controller.getIsAdmin(getCookie("token"))
            .then(response => response.text())
            .then(response => {
                if (response == "true") {
                    this.view.accountLogoutPopup.showZikiLabel()

                }
            })
    }

    handleGenreHomeBtnClick = () => {
        this.view.homepageBody.classList.remove("hidden");
        this.view.genreBody.classList.add("hidden");
        this.view.homepageSidebar.classList.remove("hidden");
        this.view.genreSidebar.classList.add("hidden");
        this.view.pagesDiv.innerHTML = "";
        this.isGenre = false;
    }

    handleGenreBtnClick = () => {
        //TODO: only allow after user is logged in
        this.view.homepageBody.classList.add("hidden");
        this.view.genreBody.classList.remove("hidden");
        this.view.homepageSidebar.classList.add("hidden");
        this.view.genreSidebar.classList.remove("hidden");
        this.isGenre = true;

        this.controller.getPages()
            .then(response => response.text())
            .then(response => {
                this.pageList = response; 
                let pagesArray = this.pageList.split(",");
                while (pagesArray.length > 0) {
                    let row = document.createElement("div");
                    row.classList.add("row")
                    for (let x = 0; x < 9; x++) {
                        if (pagesArray[x] != undefined && pagesArray[x] != "") {
                            let pageGraphic = new PageGraphic(pagesArray[x])
                            pageGraphic.div.addEventListener("click", function () {
                                setCookie("pageId", pageGraphic.pageName, 1)
                                window.location.href = "page_editor.html"
                            })
                            row.appendChild(pageGraphic.div);
                        }

                    }
                    pagesArray = pagesArray.slice(9)
                    console.log(pagesArray)
                    this.view.pagesDiv.appendChild(row);
                    let br = document.createElement("br")
                     this.view.pagesDiv.appendChild(br);
                }
        }).catch(error => {
            console.error(error);
        })

        this.controller.getWikis()
            .then(response => response.text())
            .then(response => {
                this.wikiList = response;
                let wikiArray = this.wikiList.split(",");
                while (wikiArray.length > 0) {
                    let row = document.createElement("div");
                    row.classList.add("row")
                    for (let x = 0; x < 9; x++) {
                        if (wikiArray[x] != undefined && wikiArray[x] != "") {
                            let wikiGraphic = new PageGraphic(wikiArray[x])
                            wikiGraphic.div.addEventListener("click", function () {
                                setCookie("wikiId", wikiGraphic.pageName, 1)
                                window.location.href = "wiki_editor.html"
                            })
                            row.appendChild(wikiGraphic.div);
                        }

                    }
                    wikiArray = wikiArray.slice(9)
                    console.log(wikiArray)
                    this.view.wikisDiv.appendChild(row);
                    let br = document.createElement("br")
                    this.view.wikisDiv.appendChild(br);
                }
            }).catch(error => {
                console.error(error)
            })
        this.controller.getGenres()
            .then(response => response.text())
            .then(response => {
                if (response != "" && response != undefined) {
                    let list = response.split(",").flat()
                    for (let x = 0; x < list.length; x++) {
                        let genre = document.createElement("h5")
                        genre.style.color = "white"
                        genre.classList.add("homediv")
                        genre.style.userSelect = "none"
                        genre.innerHTML = list[x]
                        this.view.genres.appendChild(genre)
                    }
                }
            }).catch(error => {
                console.error(error)
            })
        
    }

   

    sectionPinlockInputEventHandler = () => {
        let pin = this.view.accountPopup.sectionPinLock.input();
       // console.log("Model homePinInput hander pin " + pin);
        this.controller.checkProfilePin(getCookie("token"),pin)
            .then(response => response.text())
            .then(response => {
                console.log(response)
                if (response == "true") {
                    this.view.accountPopup.sectionPinLock.removePinlock();
                } else {
                    this.view.accountPopup.sectionPinLock.clearInput();
                }
            })
    }
   
    cancelButtonProfileClickHandler = () => {
        this.view.accountPopup.sectionPinLock.lockElement();
        this.view.accountPopup.hideSection();
        this.view.accountLogoutPopup.showSection();
        this.view.accountPopup.hidePopup();
        this.isPopupShown = false;
    }
   
    accountLabelClickHandler = () => {
        this.view.accountLogoutPopup.hidePopup();
        this.view.accountLogoutPopup.hideSection();
        this.view.accountPopup.showSection();
        this.view.accountPopup.showPopup();

        this.controller.getProfileNickname(getCookie("token"))
        .then(response => {
            if (response.ok) {
                return response
            } else {
                throw new Error("nickname response error")
            }
        }).then(response => response.text())
        .then(response => {
            this.view.accountPopup.profileNickname.value = response;
        })

        this.controller.getProfileUsername(getCookie("token"))
        .then(response => {
            if (response.ok) {
                return response
            } else {
                throw new Error("nickname response error")
            }
        }).then(response => response.text())
        .then(response => {
            this.view.accountPopup.profileUsername.value = response;
        })

        this.controller.getProfileBio(getCookie("token"))
        .then(response => {
            if (response.ok) {
                return response
            } else {
                throw new Error("nickname response error")
            }
        }).then(response => response.text())
        .then(response => {
            this.view.accountPopup.profileBio.value = response;
        })

        this.controller.getProfilePicture(getCookie("token"))
            .then(response => {
                if (response.ok) {
                    return response
                } else {
                    throw new Error("nickname response error")
                }
            }).then(response => response.blob())
            .then(response => {
                console.log(response);
                this.view.accountPopup.profilePicture.src = URL.createObjectURL(response);
            })

        this.controller.getBannerImage(getCookie("token"))
            .then(response => {
                if (response.ok) {
                    return response
                } else {
                    throw new Error("nickname response error")
                }
            }).then(response => response.blob())
            .then(response => {
                console.log(response);
                this.view.accountPopup.bannerPicture.src = URL.createObjectURL(response);
            })
        
    }

    registerButtonClickHandler = () => {
        if (this.view.registerPopup.isInputFull()) {
            let regPincode = this.view.registerPopup.pincode1.value +
                this.view.registerPopup.pincode2.value +
                this.view.registerPopup.pincode3.value +
                this.view.registerPopup.pincode4.value;
            let body = `{
                "username": "`+ this.view.registerPopup.username.value + `",
                "email": "`+ this.view.registerPopup.email.value + `",
                "password": "`+ this.view.registerPopup.password.value+`",
                "confirmPassword": "`+ this.view.registerPopup.confirmPassword.value + `",
                "dob": "`+ this.view.registerPopup.dob.value + `",
                "pincode": "`+ regPincode + `"
                }`;
            console.log("Register string body " + body);
            console.log("Register json body " + JSON.stringify(JSON.parse(body)))
            this.controller.postRegistrationRequest(JSON.parse(body))
                .then(response => response.text())
                .then(response => {
                    console.log("Model register request response " +response)
                    if (response == "true") {
                        this.view.registerPopup.hidePopup();
                        this.view.registerPopup.hideSection();
                        this.view.accountLogoutPopup.showSection();
                       // this.isLoggedIn = true;
                        this.isPopupShown = false;
                    }
                }).catch(error => {

                });
            
        }
    }

    loginButtonClickHandler = () => {
        if (this.view.loginPopup.isInputFull()) {
            let body = `{
                          "email": "`+ this.view.loginPopup.email.value + `",
                          "password": "`+ this.view.loginPopup.password.value + `"
                        }`
            console.log("Login request body " + body);

            this.controller.postLoginRequest(JSON.parse(body))

                .then(response => {
                    console.log("Login request response " + response)
                    if (response.ok) {
                        return response;
                    } else {
                        throw new Error("false login");
                    }
                })
                .then(response => response.text())
                .then(response => {
                  
                            setCookie("token", response, 1);
                            console.log("Login request cookie status " + getCookie("token"));
                            this.view.loginPopup.hideSection();
                            this.view.loginPopup.hidePopup();
                            this.view.loginregisterPopup.showSection();
                            this.isLoggedIn = true;
                            this.isPopupShown = false;
                            this.handleCheckAdmin()
                
                }).catch(error => {
                    console.error(error);
                });
        } else {
            console.log("you should make a red text on the popup show in this case!")
        }
    }

    logoutClickEventHandler = () => {
        setCookie('token', '', 0);
        console.log("logout reset token cookie: " + getCookie("token"))
        this.isLoggedIn = false;
        this.view.accountLogoutPopup.hidePopup();
        this.isPopupShown = false;
    }

    loginCancelEventHandler = () => {
        this.view.loginPopup.hidePopup();
        this.view.loginPopup.hideSection();
        this.view.loginregisterPopup.showSection();
        this.isPopupShown = false;
    }

    registerCancelEventHandler = () => {
        this.view.registerPopup.hidePopup();
        this.view.registerPopup.hideSection();
        this.view.loginregisterPopup.showSection();
        this.isPopupShown = false;
    }

    profilePicClickEventHandler = () => {
        if (!this.isPopupShown) {
            if (!this.isLoggedIn) {
                this.view.loginregisterPopup.showSection()
                this.view.loginregisterPopup.showPopup()
            } else {
                this.view.accountLogoutPopup.showSection();
                this.view.accountLogoutPopup.showPopup();
            }
            this.isPopupShown = true;
        } else {
            if (!this.isLoggedIn) {
                this.view.loginregisterPopup.hidePopup();
            } else {
                this.view.accountLogoutPopup.hidePopup();
            }
            this.isPopupShown = false; 
        }
    }

    loginLabelEventHandler = () => {
        this.view.loginregisterPopup.hidePopup();
        this.view.loginregisterPopup.hideSection();
        this.view.loginPopup.showSection();
        this.view.loginPopup.showPopup();
    }

    registerLabelEventHandler = () => {
        this.view.loginregisterPopup.hidePopup();
        this.view.loginregisterPopup.hideSection();
        this.view.registerPopup.showSection();
        this.view.registerPopup.showPopup();
    }

    zikiLabelHandler = () => {
       
        window.location.href = "zikipanel.html"
       
    }

    homePinInputEventHandler = () => {
        let pin = this.view.homepagePinlock.input();
        console.log("Model homePinInput hander pin " + pin);
        this.controller.getCheckHomepagePin(pin)
            .then(response => response.text())
            .then(response => {
                console.log(response)
                if (response == "true") {
                    this.view.homepagePinlock.removePinlock();
                } else {
                    this.view.homepagePinlock.clearInput();
                }
        })
    }
}

class View {
    constructor() {
        this.profilePic = document.getElementById("profilepic");
        this.homePinDiv = document.getElementById("pinlock");
        this.homepageBody = document.getElementById("homepageBody");
        this.genreBody = document.getElementById("genreBody")
        this.homepageSidebar = document.getElementById("homepageSidebar")
        this.genreSidebar = document.getElementById("genreSidebar")
        this.createBtn = document.getElementById("createPageBtn");
        this.homepagePinlock = new Pinlock(this.homePinDiv, this.homepageBody);
        this.homepagePinlock.pinLockElement.style.marginTop = "250px";
        this.genreBtn = document.getElementById("genreBtn");
        this.genreHomeBtn = document.getElementById("homeBtnGenre")
        this.pagesDiv = document.getElementById("pagesDiv");
        this.wikisDiv = document.getElementById("wikisDiv")
        this.loginregisterPopup = new LoginRegisterPopup();
        this.loginPopup = new LoginPopup();
        this.registerPopup = new RegisterPopup();
        this.accountLogoutPopup = new AccountLogoutPopup();
        this.accountPopup = new AccountPortal();
        this.pageLoginPopup = new PageLoginRegister(this.homepageBody)
        this.pageLoginPopup.div.classList.add("hidden")
        this.newPagePopup = new NewPagePopup(this.homepageBody);
        this.newPagePopup.div.classList.add("hidden");
        this.attachCreatePageBtnHandler()
        this.genres = document.getElementById("genres")
    }

    handleGenreHomeBtn = (handler) => {
        this.genreHomeBtn.addEventListener("click", function () {
            handler();
        })
    }

    handleGenreBtn = (handler) => {
        this.genreBtn.addEventListener("click", function () {
            handler();
        })
    }

    attachCreatePageBtnHandler = () => {
        if (getCookie("token") == "") {
            let pageLoginPopup = this.pageLoginPopup
            this.createBtn.addEventListener("click", function () {
                pageLoginPopup.div.classList.toggle("hidden")
            })
        } else {
            let newPagePopup = this.newPagePopup;
            this.createBtn.addEventListener("click", function () {
                newPagePopup.div.classList.toggle("hidden");
            });
        }
    }

    attachProfileImageInputHandler = handler => {
        this.accountPopup.profileImageInputListener(handler);
    }

    attachBannerImageInputHandler = handler => {
        this.accountPopup.bannerImageInputListener(handler);
    }

    attachProfilePasswordInputHandler = handler => {
        this.accountPopup.profilePasswordInputListener(handler);
    }

    attachProfileEmailInputHandler = handler => {
        this.accountPopup.profileEmailInputListener(handler);
    }

    attachProfileBioInputHandler = handler => {
        this.accountPopup.profileBioInputListener(handler);
    }

    attachProfileUsernameInputHandler = handler => {
        this.accountPopup.profileUsernameInputListener(handler);
    }

    attachProfileNicknameInputHandler = handler => {
        this.accountPopup.profileNicknameInputListener(handler);
    }

    attachSectionPinlockInputListener = handler => {
        this.accountPopup.sectionPinlockInputListener(handler);
    }

    cancelButtonClickEventListener = handler => {
        this.accountPopup.cancelButtonClickEventListener(handler);
    }

    attachAccountLabelClickHandler = handler => {
        this.accountLogoutPopup.attachAccountLabelClickHandler(handler);
    }

    attachRegisterButtonClickHandler = handler => {
        this.registerPopup.attachRegisterButtonClickHandler(handler);
    }

    attachLogoutLabelClickHandler = handler => {
        this.accountLogoutPopup.attachLogoutLabelClickHandler(handler);
    }

    attachLoginButtonClickHandler = handler => {
        this.loginPopup.attachLoginButtonEventHandler(handler);
    }

    attachLoginCancelHandler = handler => {
        this.loginPopup.attachLoginCancelEventHandler(handler);
    }

    attachRegisterCancelHandler = handler => {
        this.registerPopup.attachRegisterCancelEventHandler(handler);
    }

    attachPinlockHomepageEventHandler = handler => {
        this.homepagePinlock.attachInputEventListenerHandler(handler);
    }

    attachProfilePicClickEventHandler = handler => {
        this.profilePic.addEventListener("click", function () {
            handler();
        });
    }

    attachLoginLabelEventHandler = handler => {
        this.loginregisterPopup.attachLoginLabelEventHandler(handler);
    }

    attachRegisterLabelEventHandler = handler => {
        this.loginregisterPopup.attachRegisterLabelEventHandler(handler);
    }

}

class Controller {
    constructor() {
        this.fetch_url_validation = "https://www.zinxswiki.com/api/v1/validation"
        this.fetch_url_profile = "https://www.zinxswiki.com/api/v1/profile"
        this.fetch_url_page = "https://www.zinxswiki.com/api/v1/page"
        this.fetch_url_wiki = "https://www.zinxswiki.com/api/v1/wiki"
        this.fetch_url_tag = "https://www.zinxswiki.com/api/v1/tag"
    }



    getNewPage(token) {
        return fetch(this.fetch_url_page + "/newPage/" + token, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    getCheckHomepagePin(pin) {
        return fetch(this.fetch_url_validation + "/checkHomepagePin/" + pin, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            }
        }).catch(error => { 
            console.error(error);
        });
    }

    postRegistrationRequest(body) {
        return fetch(this.fetch_url_validation + "/register", {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).catch(error => {
            console.error(error);
        });
    }

    postLoginRequest(body) {
        return fetch(this.fetch_url_validation + "/login", {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
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
    
    checkProfilePin(token, pin) {
        return fetch(this.fetch_url_profile + "/checkPin/" + token+"/"+pin, {
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

    getPages() {
        return fetch(this.fetch_url_page + "/getPages", {
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

    getWikis() {
        return fetch(this.fetch_url_wiki + "/getWikis", {
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

    getIsAdmin(token) {
        return fetch(this.fetch_url_validation + "/isAdmin/" + token, {
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

    getGenres() {
        return fetch(this.fetch_url_tag + "/getGenres", {
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

const app = new Model(new View(), new Controller());



