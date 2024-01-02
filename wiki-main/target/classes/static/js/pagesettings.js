
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
 * 	<div style="padding-left: 10px; padding-top: 10px; color: white; position: absolute; background-color: #313338; width: 350px; height: 150px;"> 
		<div class="row">
			<div class="col-10">
				<h6>Tag Creation</h6>
			</div>
			<div class="col-1">
				<img src="resources/images/x_button.png" width="10px" height="10px">
			</div>
		</div>
		
		<div style="margin-top: 10px;"><label>Whats the name of this tag?</label></div>
		<input type="search" size="30px" style="height: 26px; border-radius: 6px; padding-left: 5px; padding-right: 5px;">
	</div>
 */
class CreateTagPopup {
	constructor(parent) {
		this.masterdiv = document.createElement("div");
		this.masterdiv.style.paddingLeft = "20px";
		this.masterdiv.style.paddingTop = "10px";
		this.masterdiv.style.color = "white";
		this.masterdiv.style.position = "relative";
		this.masterdiv.style.backgroundColor = "#313338";
		this.masterdiv.style.width = "350px";
		this.masterdiv.style.height = "120px";
		

		this.masterdiv.style.top = "10px";
		this.masterdiv.style.left = "400px";

		this.rowdiv = document.createElement("div");
		this.rowdiv.classList.add("row")
		this.headercol = document.createElement("div");
		this.headercol.classList.add("col-10");
		

		this.header = document.createElement("h6")
		this.header.innerHTML = "Tag Creation";
		this.headercol.appendChild(this.header);
		this.rowdiv.appendChild(this.headercol);

		this.imgcol = document.createElement("div");
		this.imgcol.classList.add("col-1")

		this.img = document.createElement("img");
		this.img.src = "resources/images/x_button.png"
		this.img.style.width = "20px";
		this.img.style.height = "20px";
		this.img.classList.add("userdiv");
		this.imgcol.appendChild(this.img)

		this.rowdiv.appendChild(this.imgcol);
		this.masterdiv.appendChild(this.rowdiv);

		this.labeldiv = document.createElement("div");
		this.labeldiv.style.marginTop = "10px";

		this.label = document.createElement("label");
		this.label.innerHTML = "What's the name of this tag?"
		this.labeldiv.appendChild(this.label);
		this.masterdiv.appendChild(this.labeldiv);

		this.searchinput = document.createElement("input");
		this.searchinput.type = "text"
		this.searchinput.style.size = "30px";
		this.searchinput.style.height = "26px";
		this.searchinput.style.borderRadius = "6px";
		this.searchinput.style.paddingLeft = "5px";
		this.searchinput.style.paddingRight = "5px";

		this.masterdiv.appendChild(this.searchinput);

		parent.appendChild(this.masterdiv);

	}

	handleSearchSubmitInput = (handler) => {
		this.searchinput.addEventListener("keypress", function (event) {
			if (event.key === "Enter") {
				event.preventDefault();
				handler()
			}
		})
	}

	handleCloseBtn = (handler) => {
		this.img.addEventListener("click", function () {
			handler();
		});
	}

	closeBtnHandler = () => {
		this.masterdiv.classList.add("hidden");
	}
}

class UserGraphic {
    constructor(username) {
		this.username = username;
		this.rowdiv = document.createElement("div");
		this.rowdiv.style.cursor = "default";
		this.rowdiv.classList.add("row");
		this.rowdiv.style.width = "350px";
		this.rowdiv.classList.add("usergraphic")
		

		this.col1 = document.createElement("div");
		this.col1.classList.add("col-3");
		this.profileImg = document.createElement("img");
		this.profileImg.src = "resources/images/profile.png";
		this.profileImg.style.width = "50px";
		this.profileImg.style.height = "50px";
		this.col1.appendChild(this.profileImg);

		this.col2 = document.createElement("div")
		this.col2.classList.add("col-3");
		this.header1 = document.createElement("h5");
		this.header1.style.color = "white";
		this.header1.style.position = "absolute";
		this.header1.style.top = "11px";
		this.header1.innerHTML = this.username;
		this.col2.appendChild(this.header1);
		this.header1.classList.add("usergraphicname")

		this.col3 = document.createElement("div");
		this.col3.classList.add("col-5")
		this.header2 = document.createElement("h5");
		this.header2.style.color = "white";
		this.header2.style.position = "absolute";
		this.header2.style.top = "5px"
		this.header2.style.left = "130px"
		this.header2.innerHTML = "...";
		this.col3.appendChild(this.header2);
		this.header2.classList.add("usergraphicselect")

		this.rowdiv.appendChild(this.col1);
		this.rowdiv.appendChild(this.col2);
		this.rowdiv.appendChild(this.col3);
    }
}

class UserPopup {
	constructor(parent,userlist) {
		this.div = document.createElement("div")
		this.div.style.width = "400px";
		this.div.style.height = "200px";
		this.div.style.backgroundColor = "black";
		this.div.style.position = "absolute";
		this.div.style.top = "170px";
		this.div.style.left = "80px";
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

class TagPopup {
	constructor(parent, userlist) {
		this.div = document.createElement("div")
		this.div.style.width = "400px";
		this.div.style.height = "200px";
		this.div.style.backgroundColor = "black";
		this.div.style.position = "absolute";
		this.div.style.top = "385px";
		this.div.style.left = "300px";
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
    constructor(view, controller) {
		this.view = view; 
		this.controller = controller; 

		this.users = ""
		this.token = getCookie("token")
		this.pageId = getCookie("pageId");
		this.controller.getUsersDump(this.token)
			.then(response => response.text())
			.then(response => {
				this.users = response 
				this.displayUsers(this.users);
				this.view.handleUserSelectInput(this.handleUserSelectInput);
			}).catch(error => {
				console.error(error)
			})
	

		this.controller.getPageTags(this.token, this.pageId)
			.then(response => response.text())
			.then(response => {
				this.view.internaltagslist = response
				this.view.internalTagPopup = new TagPopup(this.view.tagsdiv, this.view.internaltagslist.split(",").flat());
				this.view.internalTagPopup.div.classList.add("hidden")
				this.view.loadTags(this.view.internaltagslist.split(",").flat())
				this.view.createTagPopup.handleSearchSubmitInput(this.handleCreateInternalTagInput);
			});
		
		this.search = false; 
		this.view.handleSearchInput(this.searchInputHandler);
		this.userSelected = "";
		this.usermode = false; 
		this.rolesmode = false; 
		this.requestmode = false; 
		
		
		this.view.handlePermBackBtnClick(this.handlePermBackBtnInput);
		this.view.handleSearchEnter(this.searchEnterHandler);
		this.view.tagsButtonHeaderHander(this.handleTagsHeaderButton);
		this.view.handleExternalTagRequest(this.externalTagRequestHandler);
		this.view.divClickHandler(this.handleDocumentClick);
		this.userPopup = new UserPopup(this.view.body, this.users.split(","))
		this.userPopup.div.classList.add("hidden");

		this.view.handleBanDiv(this.banDivHandler);
		this.view.handleEditDiv(this.editDivHandler);

	}

	banDivInit = () => {
		this.controller.checkUserBanned(this.token, this.pageId, this.userSelected)
			.then(response => response.text())
			.then(response => {
				if (response == "true") {
					this.view.banBtn.classList.remove("togglebtnOff");
					this.view.banBtn.classList.add("togglebtnOn");
				} else if (response == "false") {
					this.view.banBtn.classList.add("togglebtnOff");
					this.view.banBtn.classList.remove("togglebtnOn");
				} else {
					throw new Error("response invalid");
				}
			}).catch(error => {
				console.error(error)
			})
		
	}

	editDivInit = () => {
		this.controller.checkUserEditAccess(this.token, this.pageId, this.userSelected)
			.then(response => response.text())
			.then(response => {
				if (response == "true") {
					this.view.editBtn.classList.remove("togglebtnOff");
					this.view.editBtn.classList.add("togglebtnOn");
				} else if (response == "false") {
					this.view.editBtn.classList.add("togglebtnOff");
					this.view.editBtn.classList.remove("togglebtnOn");
				} else {
					throw new Error("response invalid");
				}
			}).catch(error => {
				console.error(error)
			})
	}

	banDivHandler = () => {
		this.controller.checkUserBanned(this.token, this.pageId, this.userSelected)
			.then(response => response.text())
			.then(response => {
				if (response == "true") {
					this.controller.removeUserBanned(this.token, this.pageId, this.userSelected)
						.then(response => response.text())
						.then(response => {
							if (response == "true") {
								this.view.banBtn.classList.add("togglebtnOff");
								this.view.banBtn.classList.remove("togglebtnOn");
							} else {
								throw new Error("invalid response")
							}
						}).catch(error => {
							console.error(error);
						})
				} else if (response == "false") {
					this.controller.setUserBanned(this.token, this.pageId, this.userSelected)
						.then(response => response.text())
						.then(response => {
							if (response == "true") {
								this.view.banBtn.classList.remove("togglebtnOff");
								this.view.banBtn.classList.add("togglebtnOn");
							} else {
								throw new Error("invalid response")
							}
						}).catch(error => {
							console.error(error);
						})
				} else {
					throw new Error("response invalid");
				}
			}).catch(error => {
				console.error(error)
			})

	}


	editDivHandler = () => {
		this.controller.checkUserEditAccess(this.token, this.pageId, this.userSelected)
			.then(response => response.text())
			.then(response => {
				if (response == "true") {
					this.controller.removeUserEditAccess(this.token, this.pageId, this.userSelected)
						.then(response => response.text())
						.then(response => {
							if (response == "true") {
								this.view.editBtn.classList.add("togglebtnOff");
								this.view.editBtn.classList.remove("togglebtnOn");
							} else {
								throw new Error("invalid response")
							}
						}).catch(error => {
							console.error(error);
						})
				} else if (response == "false") {
					this.controller.setUserEditAccess(this.token, this.pageId, this.userSelected)
						.then(response => response.text())
						.then(response => {
							if (response == "true") {
								this.view.editBtn.classList.remove("togglebtnOff");
								this.view.editBtn.classList.add("togglebtnOn");
							} else {
								throw new Error("invalid response")
							}
						}).catch(error => {
							console.error(error);
						})
				} else {
					throw new Error("response invalid");
				}
			}).catch(error => {
				console.error(error)
			})
	}

	handleCreateInternalTagInput = () => {
		let value = this.view.createTagPopup.searchinput.value
		this.controller.newInternalTag(this.token, this.pageId, value)
			.then(response => response.text())
			.then(response => {
				if (response == "true") {
					let tag = new InternalTag(value);
					this.view.internaltagsrow.appendChild(tag.coldiv);
					this.view.internaltagslist += this.view.createTagPopup.searchinput.value + ",";
					this.view.handleCreateCloseBtn();
				}
			}).catch(error => {
				console.error(error)
			})
		
	}

	handleDocumentClick = () => {
		if (this.rolesmode) {

			this.view.tagsearch = false;
			this.view.internalTagPopup.div.classList.add("hidden");



		} else {
			this.search = false;
			
			this.userPopup.div.classList.add("hidden");
		}
	}

	externalTagRequestHandler = () => {
		this.requestmode = true; 
		this.view.tagsdiv.classList.add("hidden")
		this.view.tagrequestdiv.classList.remove("hidden");
	}


	handleTagsHeaderButton = () => {
		this.rolesmode = true; 
		this.view.bodydiv.classList.add("hidden")
		this.view.tagsdiv.classList.remove("hidden");

	}

	handlePermBackBtnInput = () => {

		if (this.requestmode) {
			this.view.tagsdiv.classList.remove("hidden");
			this.view.tagrequestdiv.classList.add("hidden");
			this.requestmode = false;
		}
		else if (this.rolesmode) {
			this.view.bodydiv.classList.remove("hidden");
			this.view.tagsdiv.classList.add("hidden");
			this.rolesmode = false;
		}
		else if (this.usermode) {
			this.view.bodydiv.classList.remove("hidden");
			this.view.permsdiv.classList.add("hidden");
			this.userSelected = "";
			this.usermode = false; 
		} else {
			window.location.href = "page_editor.html";
		}
	}

	handleUserSelectInput = (username) => {
		this.usermode = true;
		this.username = username; 
		this.view.bodydiv.classList.add("hidden");
		this.view.permsdiv.classList.remove("hidden");
		this.view.permstitle.innerHTML = username + " Perms";
		this.userSelected = username;
		this.editDivInit();
		this.banDivInit();
	}

	searchEnterHandler = () => {
		if (!this.search) {
			
			this.search = true;
			
		}
	}
	
	searchInputHandler = () => {

		let searchsub = this.view.searchInput.value;
		console.log(searchsub);
		let userList = this.users.split(",");
		let returnList = [];
		for (let x = 0; x < userList.length; x++) {
			let sub = userList[x];
			if (sub.includes(searchsub)) {
				if (userList[x] != undefined) {
					returnList[x] = userList[x];
				}
					
			}
		}
			
		this.updateDiscoveryPopup(this.view.body, returnList.flat())
	}

	updateDiscoveryPopup(body, list){

		body.removeChild(this.userPopup.div);
		this.userPopup = new UserPopup(body, list)
	}

	displayUsers(users) {
		let userlist = users.split(",");
		for (let x = 0; x < userlist.length; x++) {
			console.log("userlist[x] " + userlist[x])
			if (userlist[x] != "") {
				let usergraphic = new UserGraphic(userlist[x])
				this.view.userdiv.appendChild(usergraphic.rowdiv);
			}
		}
	}
}

/*
 * <div class="col-1">
					<div style="background-color: #313338; width: 60px; height: 30px; border-radius: 7px; text-align: center">
						<label class="tag" style="font-size: 10px; color: white">Nations</label>
					</div>
				</div>
*/
class InternalTag {
	constructor(tagname) {
		this.tagname = tagname
		this.coldiv = document.createElement("div");
		this.coldiv.classList.add("col-1");

		this.btndiv = document.createElement("div");
		this.btndiv.style.backgroundColor = "#313338"
		this.btndiv.style.width = "60px"
		this.btndiv.style.height = "30px"
		this.btndiv.style.borderRadius = "7px";
		this.btndiv.style.textAlign = "center"
		this.btndiv.classList.add("tag")
		this.coldiv.appendChild(this.btndiv);

		this.taglabel = document.createElement("label")
		this.taglabel.style.fontSize = "10px"
		this.taglabel.style.color = "white"
		this.taglabel.innerHTML = this.tagname
		this.btndiv.appendChild(this.taglabel);
		

	}

}

class View{
	constructor(){
		this.userdiv = document.getElementById("userdiv");
		this.body = document.getElementById("bodydiv");
		this.searchInput = document.getElementById("searchbar");
		this.bodydiv = document.getElementById("bodydiv");
		this.permsdiv = document.getElementById("permsdiv");
		this.permbackbtn = document.getElementById("permbackbtn");
		this.tagsheader = document.getElementById("tagsheader");
		this.tagsdiv = document.getElementById("tagsdiv");
		this.permstitle = document.getElementById("permstitle");
		this.internaltagsrow = document.getElementById("internaltagsrow");
		this.tagrequestdiv = document.getElementById("tagrequest");
		this.externalTagBtn = document.getElementById("externaltagbtn");
		this.internalTagSearch = document.getElementById("internalTagSearchbar")
		this.editBtn = document.getElementById("editDiv");
		this.banBtn = document.getElementById("banDiv");

		this.internaltagslist = "";
		
		this.tagsearch = false; 

		this.createTagBtn = document.getElementById("createtagbtn");
		this.createTagPopup = new CreateTagPopup(this.tagsdiv);
		this.createTagPopup.masterdiv.classList.add("hidden");
		this.createtag = false; 

		this.createTagBtnHandler(this.handleCreateTagBtn);
		this.createTagPopup.handleCloseBtn(this.handleCreateCloseBtn);

		this.handleInternalTagSearchEvent(this.internalTagsSearchHandler);
		this.handleTagSearchEnter(this.tagSearchEnterHandler);
	}

	handleEditDiv = (handler) => {
		this.editBtn.addEventListener("click", function () {
			handler();
		});
	}

	handleBanDiv = (handler) => {
		this.banBtn.addEventListener("click", function () {
			handler();
		});
	}

	

	internalTagsSearchHandler = () => {
		let searchsub = this.internalTagSearch.value
		let userList = this.internaltagslist.split(",");
		let returnList = [];
		for (let x = 0; x < userList.length; x++) {
			let sub = userList[x];
			if (sub.includes(searchsub)) {
				if (userList[x] != undefined) {
					returnList[x] = userList[x];
				}

			}
		}

		this.tagsdiv.removeChild(this.internalTagPopup.div);
		this.internalTagPopup = new TagPopup(this.tagsdiv, returnList.flat());
	}

	divClickHandler = (handler) => {
		document.addEventListener("click", function () {
			handler();
		});
	}

	tagSearchEnterHandler = () => {
		this.tagsearch = true 
	}

	handleTagSearchEnter = (handler) => {
		this.internalTagSearch.addEventListener("click", function () {
			handler();
		});
	}

	handleInternalTagSearchEvent = (handler) => {
		this.internalTagSearch.addEventListener("keypress", function () {
			handler();
		});
	}

	handleExternalTagRequest = (handler) => {
		this.externalTagBtn.addEventListener("click", function () {
			handler();
		});
	}

	loadTags(taglist) {
		for (let x = 0; x < taglist.length; x++) {
			if (taglist[x] != "") {
				let tag = new InternalTag(taglist[x])
				this.internaltagsrow.appendChild(tag.coldiv)
			}
		}
	}

	

	handleCreateCloseBtn = () => {
		this.createtag = false; 
		this.createTagPopup.closeBtnHandler();
		
	}


	handleCreateTagBtn = () => {
		console.log(this.createtag);
		if (this.createtag) {
			this.createtag = false; 
			this.createTagPopup.masterdiv.classList.add("hidden");
			
		} else {
			this.createtag = true;
			this.createTagPopup.masterdiv.classList.remove("hidden");
			
		}
		
	}

	createTagBtnHandler = (handler) => {
		this.createTagBtn.addEventListener("click", function () {
			handler();
		});
	}
	

	tagsButtonHeaderHander = (handler) => {
		this.tagsheader.addEventListener("click", function () {
			handler();
		});
	}

	handlePermBackBtnClick = (handler) => {
		this.permbackbtn.addEventListener("click", function () {
			handler();
		});
	}

	handleUserSelectInput = (handler) => {
			document.querySelectorAll(".usergraphic").forEach((item) => {
			item.querySelector(".usergraphicselect").addEventListener("click", function () {
				let username = item.querySelector(".usergraphicname").innerHTML;
				console.log("handleUserSelectInput: " + username)
				handler(username);
			});
		});
	}

	handleSearchInput = (handler) => {
		this.searchInput.addEventListener("keypress", function () {
			
			handler();
		});
	}

	handleSearchEnter = (handler) => {
		this.searchInput.addEventListener("click", function () {
			handler();
		});
	}
	
}

class Controller {
	constructor() {
		this.fetch_url_page = "http://158.69.52.39/api/v1/page";
	}

	getUsersDump(token) {
		return fetch(this.fetch_url_page + "/dumpUsers/" + token, {
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

	getPageTags(token, pageId) {
		return fetch(this.fetch_url_page + "/dumpPageTags/" + token + "/" + pageId, {
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

	newInternalTag(token, pageId, value) {
		return fetch(this.fetch_url_page + "/newInternalTag/" + token + "/" + pageId + "/" + value, {
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

	checkUserBanned(token, pageId, user) {
		return fetch(this.fetch_url_page + "/checkUserBanned/" + token + "/" + pageId + "/" + user, {
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

	checkUserEditAccess(token, pageId, user) {
		return fetch(this.fetch_url_page + "/checkUserEditPerms/" + token + "/" + pageId + "/" + user, {
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

	setUserEditAccess(token, pageId, user) {
		return fetch(this.fetch_url_page + "/setEditPerm/" + token + "/" + pageId + "/" + user, {
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

	removeUserEditAccess(token, pageId, user) {
		return fetch(this.fetch_url_page + "/removeEditPerm/" + token + "/" + pageId + "/" + user, {
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

	setUserBanned(token, pageId, user) {
		return fetch(this.fetch_url_page + "/setBanUser/" + token + "/" + pageId + "/" + user, {
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

	removeUserBanned(token, pageId, user) {
		return fetch(this.fetch_url_page + "/removeBanUser/" + token + "/" + pageId + "/" + user, {
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

const app = new Model(new View(), new Controller())