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

/*
 * <div style="background-color: #232323; height: 130px; width: 100px; color: white; padding-left: 20px; padding-top: 10px">
		<label>Perms</label>
		<br><br><br>
		<label id="addPageLabel">Add Page</label>
	</div>
 */
class MorePopup{
    constructor(parent) {
        this.div = document.createElement("div")
        this.div.style.backgroundColor = "#232323"
        this.div.style.height = "130px"
        this.div.style.width = "100px"
        this.div.style.color = "white"
        this.div.style.paddingLeft = "20px"
        this.div.style.paddingTop = "15px"

        this.permslabel = document.createElement("label")
        this.permslabel.innerHTML = "Perms"
        this.pagelabel = document.createElement("label")
        this.pagelabel.innerHTML = "Add Page"
        this.pagelabel.style.cursor = "pointer"
        this.pagelabel.style.userSelect = "none"
        this.pagelabel.classList.add("pagelabel")

        this.div.appendChild(this.permslabel)
        this.div.appendChild(document.createElement("br"))
        this.div.appendChild(document.createElement("br"))
        this.div.appendChild(this.pagelabel)

        parent.appendChild(this.div)
    }

    handlePageLabel = (handler) => {
        this.pagelabel.addEventListener("click", function () {
            handler()
        })
    }
}

class Model{
    constructor(view, controller){
        this.view = view
        this.controller = controller 
        this.view.handleMoreBtn(this.moreBtnHandler)
        this.isMorePopup = false 

        this.token = getCookie("token");
        this.wikiId = getCookie("wikiId")
        setCookie("wikiPageId", "", 1);
        if (this.wikiId == "") {
            //call to backend to create wiki get and set id
            this.controller.getNewWiki(this.token)
                .then(response => response.text())
                .then(response => {
                    if (response != undefined) {
                        console.log("newWiki response: " + response)
                        setCookie("wikiId", response, 1);
                        this.wikiId = response
                    } else {
                        throw new Error("newWiki response was undefined " + response)
                    }
                });
        } else {
            console.log("wikiId already set: " + this.wikiId);
        }
        this.view.handlePageIcon(this.pageIconHandler)
    }

    pageIconHandler = () => {
        window.location.href = "wiki_page_list.html"
    }

    pageLabelHandler = () => {
        //backend calls to create new wiki page and set wiki page id... or could do in wikipage editor
        window.location.href = "wikipage-editor.html"
    }

    moreBtnHandler = () => {
        if (!this.isMorePopup) {
            this.morePopup = new MorePopup(this.view.popupDiv)
            this.morePopup.handlePageLabel(this.pageLabelHandler)
            this.isMorePopup = true
        } else {
            this.isMorePopup = false
            this.view.popupDiv.removeChild(this.morePopup.div)
        }
    }
}

class View{
    constructor(){
        this.moreBtn = document.getElementById("moreIcon")
        this.popupDiv = document.getElementById("popupDiv")
        this.pageIcon = document.getElementById("pageIcon")
    }

    handlePageIcon = (handler) => {
        this.pageIcon.addEventListener("click", function () {
            handler()
        })
    }

    handleMoreBtn = (handler) => {
        this.moreBtn.addEventListener("click", function () {
            handler()
        })
    }
}

class Controller {
    constructor() {
        this.fetch_url_wiki = "http://localhost/api/v1/wiki"
    }

    getNewWiki(token) {
        return fetch(this.fetch_url_wiki + "/newWiki/" + token, {
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
}

const app = new Model(new View(), new Controller())
