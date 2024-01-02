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
 * <a href="wikipage-editor.html">
					 <div style="background-color: black; width: 120px; height: 100px; margin-left: 37px"></div>
					 <h4 style="color: black; margin-left: 60px">Name</h4>	 
					 </a> 
 */
class PageCard {
	//TODO only show first 7 characters of name or dynamically decrease font size
	constructor(parent, name) {
		this.hrefDiv = document.createElement("a")
		this.hrefDiv.href = "wikipage-editor.html"
		this.div = document.createElement("div")
		this.div.style.backgroundColor = "black"
		this.div.style.width = "120px"
		this.div.style.height = "100px"
		this.div.style.marginLeft = "37px"
		this.nameHeader = document.createElement("h4")
		this.nameHeader.style.color = "black"
		this.nameHeader.style.marginLeft = "55px"
		this.nameHeader.innerHTML = name

		this.hrefDiv.appendChild(this.div)
		this.hrefDiv.appendChild(this.nameHeader)
		parent.appendChild(this.hrefDiv)
	}
}

class UserPopup {
	constructor(parent, userlist) {
		this.div = document.createElement("div")
		this.div.style.width = "400px";
		this.div.style.height = "200px";
		this.div.style.backgroundColor = "black";
		this.div.style.position = "relative";
		this.div.style.top = "10px";
		this.div.style.left = "350px";
		this.div.style.opacity = "80%";
		this.div.style.paddingLeft = "5px";
		this.div.style.paddingTop = "3px";
		this.div.style.paddingRight = "5px";
		this.div.style.paddingBottom = "3px";
		parent.appendChild(this.div);
		this.userlist = userlist;
		this.applyUsers(userlist)
	}

	applyUsers(userlist) {
		for (let x = 0; x < userlist.length; x++) {
			if (x < 6) {
				let user = userlist[x];
				let userLabel = document.createElement("h5");
				let userdiv = document.createElement("div");
				userdiv.classList.add("userdiv");
				userdiv.appendChild(userLabel);
				userLabel.style.color = "white";
				userLabel.innerHTML = user;
				userLabel.style.cursor = "default"
				this.div.appendChild(userdiv);
			}
		}
	}
}

class Model {
	constructor(view) {
		this.view = view
		this.featuredList = ""
		this.popularList = ""
		this.pagesList = "Elysium,Sactum,Taoism,Ghost_Town"
		this.tagsList = ""
		this.discoveryPopup = new UserPopup(this.view.discoveryDiv, this.pagesList.split(","))
		this.view.handleSearchInput(this.searchInputHandler)
	}

	searchInputHandler = () => {

		let searchsub = this.view.searchbar.value;
		console.log(searchsub);
		let userList = this.pagesList.split(",");
		let returnList = [];
		for (let x = 0; x < userList.length; x++) {
			let sub = userList[x];
			if (sub.includes(searchsub)) {
				if (userList[x] != undefined) {
					returnList[x] = userList[x];
				}

			}
		}
		this.updateDiscoveryPopup(this.view.discoveryDiv, returnList.flat())
	}
	updateDiscoveryPopup(body, list) {

		body.removeChild(this.discoveryPopup.div);
		this.discoveryPopup = new UserPopup(body, list)
	}
}

class View {
	constructor() {
		
		this.featuredDiv = document.getElementById("featuredDiv")
		this.testCard = new PageCard(this.featuredDiv, "Elysium")
		this.testCard = new PageCard(this.featuredDiv, "Elysium")
		this.testCard = new PageCard(this.featuredDiv, "Elysium")
		this.testCard = new PageCard(this.featuredDiv, "Elysium")
		
		this.popularPagesDiv = document.getElementById("popularPagesDiv")
		this.testcard2 = new PageCard(this.popularPagesDiv, "Mario")
		this.testcard2 = new PageCard(this.popularPagesDiv, "Mario")
		this.testcard2 = new PageCard(this.popularPagesDiv, "Mario")
		this.testcard2 = new PageCard(this.popularPagesDiv, "Mario")

		this.discoveryDiv = document.getElementById("discoveryDiv")
	

		this.searchbar = document.getElementById("searchbar")


	}

	handleSearchInput = (handler) => {
		this.searchbar.addEventListener("keypress", function () {
			handler();
		});
	}
}

class Controller {

	constructor() {
		this.fetch_url_page = "http://localhost/api/v1/page";
		this.fetch_url_wiki = "http://localhost/api/v1/wiki";
	}

	getWikiTags(token, wikiId) {
		return fetch(this.fetch_url_wiki + "/getWikiTags/" + token + "/" + wikiId, {
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

	getWikiPages(token, wikiId) {
		return fetch(this.fetch_url_wiki + "/getWikiPages/" + token + "/" + wikiId, {
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

const app = new Model(new View())
