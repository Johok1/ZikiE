
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

class TextBox {
    constructor(page) {

        this.label = document.createElement("div");
        this.label.innerHTML = "New Text Element";
        this.label.style.color = "black";
        this.label.style.position = "static"
        this.label.style.paddingLeft = "20px";
        this.label.style.paddingTop = "20px";
        this.label.style.height = "100px";
        this.label.style.width = "200px";
        this.label.style.overflow = "hidden";
        // this.label.contentEditable = "true";


        page.appendChild(this.label);
    }
}


class Link {
    constructor(page) {

        this.label = document.createElement("a");
        this.label.innerHTML = "New Link";
        this.label.pointerEvents = "none";
        this.label.draggable = false;
        this.label.style.color = "blue";
        /*
        this.div = document.createElement("div");
        this.div.style.position = "static";
        this.div.style.paddingLeft = "20px";
        this.div.style.paddingTop = "20px";
        this.div.style.height = "200px";
        this.div.style.width = "200px";
        this.div.appendChild(this.label)
        // this.label.contentEditable = "true";
       */
        page.appendChild(this.label);
    }

}

class Image {
    constructor(page, img) {
        this.img = document.createElement("img");
        this.img.setAttribute("draggable", false);
        let fr = new FileReader();
        let place = this.img;
        // when image is loaded, set the src of the image where you want to display it
        fr.onload = function () {
            var dataURL = fr.result;
            var output = place;
            output.src = dataURL;
        };

        fr.readAsDataURL(img);

        page.appendChild(this.img);
    }
}
class Model {
    constructor(view, controller) {
        this.view = view;
        this.controller = controller;
        this.view.handleTextBtnClickEvent(this.view.textBtnClickHandler);
        this.view.handleSelectBtnClickEvent(this.view.selectBtnClickHandler);
        this.view.handleDragBtnClickEvent(this.view.dragBtnClickHandler);
        this.view.handleLinkBtnClickEvent(this.view.linkBtnClickHandler);
        this.view.handleSettingsBtnClick(this.settingsBtnClickHandler);

        this.token = getCookie("token");
        this.wikiId = getCookie("wikiId")
        this.wikiPageId = getCookie("wikiPageId")

        if (this.wikiPageId == "") {
            this.controller.getNewWikiPage(this.token, this.wikiId)
                .then(response => response.text())
                .then(response => {
                    console.log(response);
                    this.wikiPageId = response
                }).catch(error => {
                    console.error(error)
                })

        } else {
            console.log("wikiPageId: " + this.wikiPageId)
            this.controller.getPageContent(this.token, this.wikiId, this.wikiPageId)
                .then(response => response.text())
                .then(response => {
                    this.view.page.innerHTML = response;
                })
        }

        this.view.handlePublishBtn(this.publishBtnClickHandler);
        this.view.handleHomeBtn(this.homeBtnHandler);
        this.controller.hasAccess(this.token, this.wikiId)
            .then(response => response.text())
            .then(response => {
                if (response != "true") {
                    this.view.toolbar.classList.add("hidden")
                    this.view.publishBtn.classList.add("hidden")
                    this.view.settingsBtn.classList.add("hidden")
                }
            }).catch(error => {
                console.error(error)
                this.view.toolbar.classList.add("hidden")
                this.view.publishBtn.classList.add("hidden")
                this.view.settingsBtn.classList.add("hidden")
            })
    }

    homeBtnHandler = () => {
        setCookie("wikiPageId", "", 1);
    }

    settingsBtnClickHandler = () => {
        setCookie("wikiPageId", this.wikiPageId, 1);
        console.log(getCookie("wikiPageId"));
        window.location.href = "wikipage_settings.html";
    }

    publishBtnClickHandler = () => {
        let content = this.view.page.innerHTML
        this.controller.setPageContent(this.token, this.wikiId, this.wikiPageId, content)
    }

}

class View {
    constructor() {
        this.page = document.getElementById("page");
        this.moveBtn = document.getElementById("moveIcon");
        this.selectBtn = document.getElementById("selectIcon");
        this.textBtn = document.getElementById("textIcon");
        this.linkBtn = document.getElementById("linkIcon");
        this.imgBtn = document.getElementById("imageIcon");
        this.src = document.getElementById("myInput");
        this.publishBtn = document.getElementById("publishBtn");
        this.settingsBtn = document.getElementById("settingsBtn");
        this.toolbar = document.getElementById("toolbar")
        this.settingsBar = document.getElementById("settingsBar")
        this.select = false;
        this.drag = false;
        this.handleImageInput();
        this.homeBtn = document.getElementById("home")

    }

    handleHomeBtn = handler => {
        this.homeBtn.addEventListener("click", function () {
            handler();
        })
    }

    handleSettingsBtnClick = handler => {
        this.settingsBtn.addEventListener("click", function () {
            handler();
        });
    }

    handlePublishBtn = (handler) => {
        this.publishBtn.addEventListener("click", function () {
            handler();
        });
    }

    handleImageInput = () => {
        let page = this.page;
        let src = this.src;
        this.src.addEventListener("change", function () {
            let image = new Image(page, src.files[0]);
        });
    }

    onMouseDrag({ movementX, movementY }) {
        let getContainerStyle = window.getComputedStyle(this);
        let leftValue = parseInt(getContainerStyle.left);
        let topValue = parseInt(getContainerStyle.top);
        this.style.left = `${leftValue + (movementX * 1.2)}px`;
        this.style.top = `${topValue + (movementY * 1.2)}px`;
    }


    textBtnClickHandler = () => {

        let textbox = new TextBox(this.page);

    }

    linkBtnClickHandler = () => {
        let link = new Link(this.page);
    }


    selectBtnClickHandler = () => {

        if (!this.drag) {
            if (this.select) {
                this.select = false;
                this.page.style.cursor = "default";
                //set css style to all elements in page
                const childElements = this.page.querySelectorAll('*');

                childElements.forEach(function (child) {
                    child.style.cursor = 'default';
                    child.contentEditable = 'false';
                });
            } else {
                this.page.style.cursor = "pointer";
                //set css style to all elements in page
                const childElements = this.page.querySelectorAll('*');

                childElements.forEach(function (child) {
                    child.style.cursor = 'pointer';
                    child.contentEditable = 'true';
                });
                this.select = true;
            }
        }

    }

    dragBtnClickHandler = () => {

        if (!this.select) {
            if (this.drag) {

                this.drag = false;

                this.page.style.cursor = "default";
                document.body.style.cursor = "default";
                const childElements = this.page.querySelectorAll('*');

                let page = this.page;

                let handleChildMouseDownListener = this.handleChildMouseDownListener;
                let handlePageMouseMoveListener = this.handlePageMouseMoveListener;

                childElements.forEach(function (child) {
                    child.style.userSelect = "auto";
                    child.style.cursor = 'default';
                    child.classList.remove("selected");
                    child.removeEventListener("mousedown", () => {
                        handleChildMouseDownListener;
                    });
                    child.removeEventListener("mouseup", () => {
                        handlePageMouseMoveListener(child);
                    });
                    page.removeEventListener("mouseup", () => {
                        handlePageMouseMoveListener;
                    });
                });

            } else {
                this.drag = true;

                this.page.style.cursor = "grab";
                document.body.style.cursor = "grab";
                let page = this.page;
                const childElements = this.page.querySelectorAll('*');

                let handleChildMouseDownListener = this.handleChildMouseDownListener;
                let handlePageMouseMoveListener = this.handlePageMouseMoveListener;

                childElements.forEach(function (child) {

                    child.style.userSelect = "none";
                    child.style.position = "relative";
                    child.style.cursor = 'grab';
                    child.addEventListener("mousedown", () => {
                        child.classList.add("selected");
                        handleChildMouseDownListener(child);
                    });
                    child.addEventListener("mouseup", () => {
                        child.classList.remove("selected");
                        handlePageMouseMoveListener(child);
                    });
                    page.addEventListener("mouseup", () => {
                        child.classList.remove("selected");
                        handlePageMouseMoveListener(child);
                    });
                });
            }
        }
    }


    handleChildMouseDownListener = (child) => {
        if (this.drag) {
            child.addEventListener("mousemove", this.onMouseDrag);
        }
    }

    handlePageMouseMoveListener = (child) => {
        if (this.drag) {
            child.removeEventListener("mousemove", this.onMouseDrag);
        }
    }

    handleDragBtnClickEvent = (handler) => {
        this.moveBtn.addEventListener('click', function () {
            handler();
        });
    }

    handleSelectBtnClickEvent = (handler) => {
        this.selectBtn.addEventListener("click", function () {
            handler();
        });
    }

    handleTextBtnClickEvent = (handler) => {
        this.textBtn.addEventListener("click", function () {
            handler();
        });
    }

    handleLinkBtnClickEvent = (handler) => {
        this.linkBtn.addEventListener("click", function () {
            handler();
        });
    }

}

class Controller {
    constructor() {
        this.fetch_url_wiki = "http://localhost/api/v1/wiki"
    }

    hasAccess(token, wikiId) {
        return fetch(this.fetch_url_wiki + "/hasAccess/" + token + "/" + wikiId, {
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

    getNewWikiPage(token, wikiId) {
        return fetch(this.fetch_url_wiki + "/newWikiPage/" + token + "/" + wikiId, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    setPageContent(token, wikiId, wikiPageId, content) {
        return fetch(this.fetch_url_wiki + "/setPageContent/" + token + "/" + wikiId + "/" + wikiPageId, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'plain/text'
            },
            body: content
        }).catch(error => {
            console.error(error);
        });
    }

    getPageContent(token, wikiId, wikiPageId) {
        return fetch(this.fetch_url_wiki + "/getWikiPage/" + token + "/" + wikiId + "/" + wikiPageId, {
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

}
const app = new Model(new View(), new Controller());