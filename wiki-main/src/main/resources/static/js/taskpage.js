/*<div class="" style="position: absolute; z-index: 1; margin-top: 20px ;margin-left: 450px; background-color: #4A535C; width: 40%; height: 650px; border-radius: 8px; box-shadow: 0px 0px 10px black;">
	<div class="row">
		<h4 style="color: white; padding-top: 2%; padding-left: 20%">Description</h4>
		<img id="descBtn" src="resources/images/more_icon.png" width="25px;" height="25px" style="margin-left: 45%; margin-top: 2%" class="click">
			<div class="" style="position: absolute; z-index: 1; margin-top: 0% ;margin-left: 97%; background-color: #4A535C; width: 7%; height: 5%; border-radius: 8px; box-shadow: 0px 0px 10px black; text-align: center">
				<label style="color: white; padding-top: 10%; user-select: none" class="click">Edit</label>
			</div>
	</div>
	<hr>
		<div style="height: 80%; background-color: #1B1E21;  border: thick solid #4A535C; border-radius: 2%;overflow-y: scroll">
			<label id="descLabel" style="padding-left: 10px; padding-top: 10px;" contenteditable="true">
				Default
			</label>
		</div>

</div>
*/
class Description {
    constructor() {
        this.container = document.createElement("div");
        this.container.style.position = "absolute";
        this.container.style.zIndex = "1";
        this.container.style.marginTop = "20px";
        this.container.style.marginLeft = "450px";
        this.container.style.backgroundColor = "#4A535C";
        this.container.style.width = "40%";
        this.container.style.height = "650px";
        this.container.style.borderRadius = "8px";
        this.container.style.boxShadow = "0px 0px 10px black";

        this.rowDiv = document.createElement("div");
        this.rowDiv.classList.add("row");

        this.header = document.createElement("h4");
        this.header.textContent = "Description";
        this.header.style.color = "white";
        this.header.style.paddingTop = "2%";
        this.header.style.paddingLeft = "20%";

        this.imgBtn = document.createElement("img");
        this.imgBtn.id = "descBtn";
        this.imgBtn.src = "resources/images/more_icon.png";
        this.imgBtn.width = "25px";
        this.imgBtn.height = "25px";
        this.imgBtn.style.marginLeft = "45%";
        this.imgBtn.style.marginTop = "2%";
        this.imgBtn.classList.add("click");

        this.editDiv = document.createElement("div");
        this.editDiv.style.position = "absolute";
        this.editDiv.style.zIndex = "1";
        this.editDiv.style.marginTop = "0%";
        this.editDiv.style.marginLeft = "97%";
        this.editDiv.style.backgroundColor = "#4A535C";
        this.editDiv.style.width = "7%";
        this.editDiv.style.height = "5%";
        this.editDiv.style.borderRadius = "8px";
        this.editDiv.style.boxShadow = "0px 0px 10px black";
        this.editDiv.style.textAlign = "center";
        this.editDiv.classList.add("click")

        this.editLabel = document.createElement("label");
        this.editLabel.textContent = "Edit";
        this.editLabel.style.color = "white";
        this.editLabel.style.paddingTop = "10%";
        this.editLabel.style.userSelect = "none";
        //this.editLabel.classList.add("click");

        this.editDiv.appendChild(this.editLabel);

        this.rowDiv.appendChild(this.header);
        this.rowDiv.appendChild(this.imgBtn);
        this.rowDiv.appendChild(this.editDiv);

        this.contentDiv = document.createElement("div");
        this.contentDiv.style.height = "80%";
        this.contentDiv.style.backgroundColor = "#1B1E21";
        this.contentDiv.style.border = "thick solid #4A535C";
        this.contentDiv.style.borderRadius = "2%";
        this.contentDiv.style.overflowY = "scroll";

        this.descLabel = document.createElement("label");
        this.descLabel.id = "descLabel";
        this.descLabel.textContent = "Default";
        this.descLabel.style.paddingLeft = "10px";
        this.descLabel.style.paddingTop = "10px";
        this.descLabel.setAttribute("contenteditable", "false");

        this.contentDiv.appendChild(this.descLabel);

        this.container.appendChild(this.rowDiv);
        this.container.appendChild(document.createElement("hr"));
        this.container.appendChild(this.contentDiv);
    }
}

/*
<div class="click" class="row" style="margin-left: 1%">
    <label class="#username">Johok:</label>
    <label class="#msg">&nbsp;Message is very long i wonder how it will wrap to the next row ah i see well that works better than nothing anyways</label>
</div>
*/
class ChatMessage {
    constructor(username, msg) {
        this.username = username
        this.msg = msg 
        this.container = document.createElement("div");
        this.container.classList.add("click", "row");
        this.container.style.marginLeft = "0%";
        this.container.style.paddingLeft = "1%"
        this.container.style.position = "relative"
        this.container.style.wordWrap = "normal"

        this.usernameLabel = document.createElement("label");
        this.usernameLabel.classList.add("#username");
        this.usernameLabel.textContent = username+":";

        this.msgLabel = document.createElement("label");
        this.msgLabel.classList.add("#msg");
        this.msgLabel.innerHTML = "&nbsp;" + msg;

        this.container.appendChild(this.usernameLabel);
        this.container.appendChild(this.msgLabel);
    }
}


class ChangeResearchForm {
    constructor() {
        this.mainDiv = document.createElement("div");
        this.mainDiv.style.position = "static";
        this.mainDiv.style.width = "170px";
        this.mainDiv.style.height = "100px";
        this.mainDiv.style.backgroundColor = "#ADADAD";

        const label = document.createElement("label");
        label.style.color = "black";
        label.style.paddingLeft = "7px";
        label.style.paddingTop = "5px";
        label.style.fontSize = "15px";
        label.textContent = "Change Research Name";

        this.input = document.createElement("input");
        this.input.type = "text";
        this.input.style.width = "140px";
        this.input.style.height = "25px";
        this.input.style.marginLeft = "10px";

        this.submitBtn = document.createElement("div");
        this.submitBtn.textContent = "Submit";
        this.submitBtn.style.width = "70px";
        this.submitBtn.style.height = "25px";
        this.submitBtn.style.backgroundColor = "#2B2B2B";
        this.submitBtn.style.marginLeft = "10px";
        this.submitBtn.style.marginTop = "5px";
        this.submitBtn.style.textAlign = "center";
        this.submitBtn.style.color = "white";
        this.submitBtn.style.borderRadius = "10px";
        this.submitBtn.classList.add("click");

        this.mainDiv.appendChild(label);
        this.mainDiv.appendChild(this.input);
        this.mainDiv.appendChild(this.submitBtn);

    }

    handleClickSubmitBtn = (handler) => {
        this.submitBtn.addEventListener("click", function () {
            handler()
        })
    }
}

/*
<div class="hidden" style="position: absolute; width: 100px; height: 70px; background-color: #ADADAD; text-align: center; margin-left: 32%; z-index: 1; margin-top: 0%;">
    <label class="click" style="color: black; padding-top:5px; font-size: 15px;">Edit Name</label>
    <label class="click" style="color: black; padding-top:5px; font-size: 15px;">Delete</label>

</div>
*/
class ResearchMorePopup {
    constructor() {
        this.container = document.createElement("div");
        this.container.style.position = "absolute";
        this.container.style.width = "100px";
        this.container.style.height = "70px";
        this.container.style.backgroundColor = "#ADADAD";
        this.container.style.textAlign = "center";
        this.container.style.marginLeft = "32%";
        this.container.style.zIndex = "1";
        this.container.style.marginBottom = "0%";

        this.editLabel = document.createElement("label");
        this.editLabel.classList.add("click");
        this.editLabel.textContent = "Edit Name";
        this.editLabel.style.color = "black";
        this.editLabel.style.paddingTop = "5px";
        this.editLabel.style.fontSize = "15px";

        this.deleteLabel = document.createElement("label");
        this.deleteLabel.classList.add("click");
        this.deleteLabel.textContent = "Delete";
        this.deleteLabel.style.color = "black";
        this.deleteLabel.style.paddingTop = "5px";
        this.deleteLabel.style.fontSize = "15px";

        this.container.appendChild(this.editLabel);
        this.container.appendChild(this.deleteLabel);
    }
}
/*
<div class="" style=" position: relative; margin-left: 5%; background-color: #4A535C; width: 90%; border-radius: 8px; box-shadow: 0px 0px 10px black;">
    <h4 style="color: white; text-align: center; padding-top: 5px;">Research Logs</h4>
    <hr>
        <div style="height: 80%; background-color: #1B1E21;  border: thick solid #4A535C; border-radius: 5%;overflow-y: scroll; padding-left: 10px;">

        </div>
    <input type="text" placeholder="Send a message..." style="background-color: hsla(210,10%,12%,1.00); margin-left: 10px; border: none; border-radius: 10px; color: gold; width: 95%; padding-left: 10px; margin-bottom: 2%">
</div>
*/
class ResearchLogs {
    constructor() {
        this.container = document.createElement("div");
        this.container.style.position = "absolute";
        this.container.style.marginLeft = "5%";
        this.container.style.backgroundColor = "#4A535C";
        this.container.style.width = "90%";
        this.container.style.height = "80%"
        this.container.style.borderRadius = "8px";
       // this.container.style.overflowY = "scroll"
        this.container.style.boxShadow = "0px 0px 10px black";

        this.header = document.createElement("h4");
        this.header.textContent = "Research Logs";
        this.header.style.color = "white";
        this.header.style.textAlign = "center";
        this.header.style.paddingTop = "5px";

        this.hr = document.createElement("hr");

        this.contentDiv = document.createElement("div");
        this.contentDiv.style.height = "70%";
        this.contentDiv.style.backgroundColor = "#1B1E21";
        this.contentDiv.style.border = "thick solid #4A535C";
        this.contentDiv.style.borderRadius = "5%";
        this.contentDiv.style.overflowY = "scroll";
        this.contentDiv.style.paddingLeft = "10px";

        this.input = document.createElement("input");
        this.input.type = "text";
        this.input.placeholder = "Send a message...";
        this.input.style.backgroundColor = "hsla(210,10%,12%,1.00)";
        this.input.style.marginLeft = "10px";
        this.input.style.border = "none";
        this.input.style.borderRadius = "10px";
        this.input.style.color = "gold";
        this.input.style.width = "95%";
        this.input.style.paddingLeft = "10px";
        this.input.style.marginBottom = "5%";

        this.container.appendChild(this.header);
        this.container.appendChild(this.hr);
        this.container.appendChild(this.contentDiv);
        this.container.appendChild(this.input);
    }
}
/*
<div style="margin-left: 100px;background-color: #373E44; width: 60%; height: 20%; overflow-y:auto; overflow-x: hidden; overflow-y: hidden">


    <div class="row" >
        <div class="col-10">
            <h5 style="text-align: center; padding-top: 10px;color: white">Research Name</h5>
        </div>
        <div class="col-1">
            <img class="click" src="resources/images/more_icon.png">
        </div>
       
    </div>


    <img class="btn" style="margin-left: 86%; width: 50px; height: 40px" src="resources/images/dropdown.png">
        <div class="hidden" id="chatDiv">
            
            </div>
        </div>
*/
class ResearchDetails {
    constructor(morePopup, researchLogs, name) {
        this.morePopup = morePopup
        this.researchLogs = researchLogs
        this.researchChatList = ""
        this.name = name 
        this.researchMore = false
        this.isEdit = false 
        this.isDropped = false 
        this.container = document.createElement("div");
        this.container.style.marginLeft = "100px";
        this.container.style.backgroundColor = "#373E44";
        this.container.style.position = "relative"
        this.container.style.width = "60%";
        this.container.style.height = "20%";
        this.container.style.overflowY = "auto";
        this.container.style.overflowX = "hidden";
        this.container.style.overflowY = "hidden";
        this.container.style.boxShadow = "0px 0px 10px black";

        this.innerDiv = document.createElement("div");
        this.innerDiv.classList.add("row");

        this.col10 = document.createElement("div");
        this.col10.classList.add("col-10");

        this.header = document.createElement("h5");
        this.header.textContent = name;
        this.header.style.textAlign = "center";
        this.header.style.paddingTop = "10px";
        this.header.style.color = "white";

        this.col10.appendChild(this.header);

        this.col1 = document.createElement("div");
        this.col1.classList.add("col-1");

        this.img = document.createElement("img");
        this.img.classList.add("click");
        this.img.src = "resources/images/more_icon.png";

        this.col1.appendChild(this.img);

        this.innerDiv.appendChild(this.col10);
        this.innerDiv.appendChild(this.col1);

        this.dropdownImg = document.createElement("img");
        this.dropdownImg.classList.add("btn");
        this.dropdownImg.style.marginLeft = "86%";
        this.dropdownImg.style.width = "50px";
        this.dropdownImg.style.height = "40px";
        this.dropdownImg.src = "resources/images/dropdown.png";

        this.hiddenDiv = document.createElement("div");
        this.hiddenDiv.classList.add("hidden");
        this.hiddenDiv.id = "chatDiv";

        this.container.appendChild(this.innerDiv);
        this.container.appendChild(this.dropdownImg);
        this.container.appendChild(this.hiddenDiv);
        //this.container.appendChild(morePopup.container)
        this.hiddenDiv.appendChild(researchLogs.container)
    }
}

class ResearchChat {
    constructor() {
        this.master = document.createElement("div");
        this.master.style.height = "85%";

        this.innerDiv = document.createElement("div");
        this.innerDiv.style.height = "80%";
        this.innerDiv.style.backgroundColor = "#1B1E21";
        this.innerDiv.style.border = "thick solid #4A535C";
        this.innerDiv.style.borderRadius = "5%";
        this.innerDiv.style.overflowY = "scroll";
        this.innerDiv.style.paddingLeft = "10px";

        this.master.appendChild(this.innerDiv);

        this.input = document.createElement("input");
        this.input.setAttribute("type", "text");
        this.input.setAttribute("placeholder", "Send a message...");
        this.input.style.backgroundColor = "hsla(210,10%,12%,1.00)";
        this.input.style.marginLeft = "10px";
        this.input.style.border = "none";
        this.input.style.borderRadius = "10px";
        this.input.style.color = "gold";
        this.input.style.width = "95%";
        this.input.style.paddingLeft = "10px";
        this.input.style.marginBottom = "2%";

        this.imageInput = document.createElement("input")
        this.imageInput.setAttribute("type", "file")
        this.imageInput.style.color = "#1B1E21"

        this.master.appendChild(this.imageInput)
        this.master.appendChild(this.input);
    }
}


/*
<div class="" style="position: absolute; width: 170px; height: 100px; background-color: #ADADAD; margin-left: 30%">
    <label style="color: black; padding-left: 7px; padding-top:5px; font-size: 15px;">New Research Name:</label>
    <input type="text" style="width:140px; height: 25px; margin-left: 10px"></input>
    <div style="width: 70px; height: 25px; background-color: #2B2B2B; margin-left: 10px; margin-top: 5px; text-align: center; color: white; border-radius: 10px;" class="click">Submit</div>
</div>
*/
class NewResearchForm {
    constructor() {
        this.container = document.createElement("div");
        this.container.style.position = "absolute";
        this.container.style.width = "170px";
        this.container.style.height = "100px";
        this.container.style.backgroundColor = "#ADADAD";
        this.container.style.marginLeft = "30%";

        this.label = document.createElement("label");
        this.label.textContent = "New Research Name:";
        this.label.style.color = "black";
        this.label.style.paddingLeft = "7px";
        this.label.style.paddingTop = "5px";
        this.label.style.fontSize = "15px";

        this.input = document.createElement("input");
        this.input.type = "text";
        this.input.style.width = "140px";
        this.input.style.height = "25px";
        this.input.style.marginLeft = "10px";

        this.submitButton = document.createElement("div");
        this.submitButton.textContent = "Submit";
        this.submitButton.style.width = "70px";
        this.submitButton.style.height = "25px";
        this.submitButton.style.backgroundColor = "#2B2B2B";
        this.submitButton.style.marginLeft = "10px";
        this.submitButton.style.marginTop = "5px";
        this.submitButton.style.textAlign = "center";
        this.submitButton.style.color = "white";
        this.submitButton.style.borderRadius = "10px";
        this.submitButton.classList.add("click");

        this.container.appendChild(this.label);
        this.container.appendChild(this.input);
        this.container.appendChild(this.submitButton);
    }
}

class Model{
    constructor(view, controller) {
        this.view = view 
        this.controller = controller 

        
        this.researchList = ""
        this.researchSelected = ""
        this.username = ""

        this.getUsername()
        this.setPollGeneralInterval(800)
        this.getResearchList()
       

        this.isDesc = false 
        this.isDescEdit = false 
        this.isNewResearch = false

        this.generalChatList =""
     
        this.desc = this.loadDesc()
       
        this.bindDescHandler(this.handleDescBtn, this.desc)
        this.bindDescEditSave(this.handleDescEditSave, this.desc)
        this.bindGeneralChatMsg(this.handleGeneralChatMsg)

        this.createResearchForm()
        this.addGeneralChatInputListener()
    }

    getUsername() {
        this.controller.getUsername(getCookie("token"))
            .then(response => response.text())
            .then(response => {
                this.username = response
            })
    }


     /*
      * 
      * General Chat functions
      * 
      */

   


    //binds addfile function with general chat input listener
    addGeneralChatInputListener = () => {
        let handleGeneralChatImage = this.handleGeneralChatImage
        this.view.genImageInput.addEventListener("input", function () {
            handleGeneralChatImage()
        })
    }

    //test function to add a msg to general chat with an img in it 
    addGeneralFile = () => {
        this.addGeneralChatImg(this.username, this.view.genImageInput.files[0])
    }

    handleGeneralChatImage = () => {
        var reader = new FileReader();
        reader.readAsDataURL(this.view.genImageInput.files[0])
        reader.onload =  () => {
            const base64Str = reader.result
            console.log("reader.result: " + base64Str)
            let request = this.imageMessageJsonRequest(this.username, base64Str)
            this.controller.postGeneralMsg(getCookie("token"), getCookie("taskId"), request)
                .then(response => response.text())
                .then(response => {

                    this.generalChatList += response + ","
                    this.addGeneralChatImg(this.username, base64Str)


                })
        };
    }

    //appends img to container div of msg to display chat with img in it
    addGeneralChatImg(username, img) {
        let msg = new ChatMessage(username, "")
        let inputImg = document.createElement("img")
        inputImg.src = img;
        msg.container.appendChild(inputImg)
        this.view.generalChatDiv.appendChild(msg.container)
      //  this.generalChatList += msg.username + "*" + img + ","
    }

    //function to add a string msg to general chat 
    addGeneralChatMsg(username, value) {
        let msg = new ChatMessage(username, value)
        this.view.generalChatDiv.appendChild(msg.container)
        this.view.generalChatInput.value = ""
    //    this.generalChatList += msg.username + "*" + msg.msg + ","
    }

    //sets interval with given delay to call function to load general msgs from frontend
    setPollGeneralInterval(interval) {
        setInterval(this.loadGeneralMsgs, interval)
    }

    //polls backend for general chat msg list and calls function to load list, setting it to a class variable
    loadGeneralMsgs = () => {
        this.controller.getGeneralMsgList(getCookie("token"), getCookie("taskId"))
            .then(response => response.json())
            .then(response => {
               
                console.log("response: " + response)
                
                for (let i = 0; i < response.length; i++) {
                    if (!this.generalChatList.includes(response[i].id)) {
                        console.log(response[i])
                        console.log("type: " + response[i].type)
                        console.log("username: " + response[i].username)
                        if (response[i].type == "string") {
                            this.addGeneralChatMsg(response[i].username, response[i].message)

                        } else if (response[i].type == "image") {
                            this.addGeneralChatImg(response[i].username, response[i].imageContent)

                        }
                        this.generalChatList += response[i].id +","
                    } else {

                    }
                    

                }
                
                
              
            }).catch(error => {
                console.error(error)
            })
    }


    //loads given message list to frontend
    loadGeneralMsgList(list) {
        for (let x = 0; x < list.split(",").length; x++) {
            if (list.split(",")[x] != "") {
                let username = list.split(",")[x].split("*")[0]
                let msg = list.split(",")[x].split("*")[1]
                let chatMsg = new ChatMessage(username, msg)
                this.view.generalChatDiv.appendChild(chatMsg.container)
            }
        }
    }

    //calls handler if general input detects enter keypress
    bindGeneralChatMsg = (handler) => {
        this.view.generalChatInput.addEventListener("keypress", function (event) {
            // Check if the key pressed is 'Enter' (key code 13)
            if (event.keyCode === 13 || event.which === 13) {
                handler()
            }
        })
    }

    //posts a general chat msg to backend and adds it to display
    handleGeneralChatMsg = () => {
        let request = this.stringMessageJsonRequest(this.username, this.view.generalChatInput.value)
        this.controller.postGeneralMsg(getCookie("token"), getCookie("taskId"), request)
            .then(response => response.text())
            .then(response => {

                    this.generalChatList += response + ","
                    let msg = this.view.generalChatInput.value
                    msg.replaceAll(",", " ")
                    msg.replaceAll("*", " ")
                    msg.replaceAll("/", " ")
                    msg.replaceAll("\"", " ")

                    this.addGeneralChatMsg(this.username, msg)
               

            })

    }

    //posts a general chat msg to backend and adds it to display
   

    stringMessageJsonRequest(username, message) {
        let registerBody = `{
                "username": "`+ username + `",
                "message": "` + message + `",
                "type": "` + "string" + `",
                "imageContent": "` + null + `"
                }`

        return JSON.parse(registerBody)
    }

    imageMessageJsonRequest(username, imageContent) {
        let registerBody = `{
                "username": "`+ username + `",
                "message": "` + null + `",
                "type": "` + "image" + `",
                "imageContent": "` + imageContent + `"
                }`
        console.log("image request: " + JSON.parse(registerBody))
        return JSON.parse(registerBody)
    }

   

   

  

     /*
      * 
      * Research functions
      * 
      */

    /*
     * Create new research popup functions
     */
    createResearchForm() {
        let researchForm = new NewResearchForm()
        this.bindNewResearchBtn(this.handleNewResearchBtn, researchForm)
    }

    bindNewResearchBtn = (handler, researchForm) => {
        this.view.researchBtn.addEventListener("click", function () {
            handler(researchForm)
        })
    }

    handleNewResearchBtn = (researchForm) => {
        let form = researchForm
        if (this.isNewResearch) {
            this.deleteNewResearchForm(form)
        } else {
            this.createNewResearchForm(form)
        }
    }

    createNewResearchForm(form) {
        this.isNewResearch = true
        this.view.researchForumDiv.appendChild(form.container)
        form.input.value = ""
        this.bindNewResearchSubmit(this.handleNewResearchSubmit, form)
    }

    deleteNewResearchForm(newResearchForm) {
        this.view.researchForumDiv.removeChild(newResearchForm.container)
        this.isNewResearch = false
    }

    //Submit new research handlers

    bindNewResearchSubmit = (handler, newResearchForm) => {
        newResearchForm.submitButton.addEventListener("click", function () {
            handler(newResearchForm)
        })
    }

    unBindNewResearchSubmit = (handler, newResearchForm) => {
        newResearchForm.submitButton.removeEventListener("click", function () {
            handler(newResearchForm)
        })
    }

    handleNewResearchSubmit = (newResearchForm) => {
        if (newResearchForm.input.value != "") {
            this.controller.postNewResearch(getCookie("token"), getCookie("taskId"), newResearchForm.input.value)
                .then(response => response.text())
                .then(response => {
                    if (response == "true") {
                        this.deleteNewResearchForm(newResearchForm)
                        let value = newResearchForm.input.value
                        this.researchList += value + ","
                        this.createResearch(value)
                    }
                })


        }

    }

    /*
     * Research List Functions
     */ 

    getResearchList() {
        this.controller.getResearchList(getCookie("token"), getCookie("taskId"))
            .then(response => response.text())
            .then(response => {
                this.researchList = response
                this.loadResearchList(this.researchList)
            })
    }

    loadResearchList(list) {

        for (let x = 0; x < list.split(",").length; x++) {
            if (list.split(",")[x] != "") {
                this.createResearch(list.split(",")[x])
            }
        }
    }

    //create new research for display 
    createResearch(name) {
        let researchMorePopup = new ResearchMorePopup()
        let researchLogs = new ResearchLogs()
        let researchHeader = new ResearchDetails(researchMorePopup, researchLogs, name)
        this.bindResearchMore(this.handleResearchMoreClick, researchHeader)
        this.bindResearchDelete(this.handleResearchDelete, researchHeader)
        this.bindResearchEdit(this.handleResearchEdit, researchHeader)
        this.bindResearchDropdown(this.handleResearchDropdown, researchHeader)

        researchMorePopup.container.classList.add("hidden")
        this.view.researchDiv.appendChild(researchHeader.container)
        this.view.researchDiv.appendChild(document.createElement("br"))
    }

    /*
     * Research More popup functions
     */

    bindResearchMore = (handler, research) => {
        this.view.researchDiv.appendChild(research.morePopup.container)
        research.img.addEventListener("click", function () {
            handler(research)
        })
    }

    handleResearchMoreClick = (research) => {
        if (research.researchMore) {
            this.hideResearchMore(research)
        } else {
            this.showResearchMore(research)
        }
    }

    hideResearchMore(research) {
        research.researchMore = false
        research.morePopup.container.classList.add("hidden")
    }

    showResearchMore(research) {
        research.researchMore = true
        research.morePopup.container.classList.remove("hidden")
    }

    /*
    * Research edit popup functions
    */

    bindResearchEdit = (handler, research) => {
        research.morePopup.editLabel.addEventListener("click", function () {
            handler(research)
        })
    }

    handleResearchEdit = (research) => {
        this.createChangeResearchPopup(research)
        this.hideResearchMore(research)
    }

    createChangeResearchPopup(research) {
        let changeResearchPopup = new ChangeResearchForm()
        this.view.bodyDiv.appendChild(changeResearchPopup.mainDiv)
        let handleResearchSubmit = this.handleResearchSubmit

        changeResearchPopup.submitBtn.addEventListener("click", function () {
            handleResearchSubmit(research, changeResearchPopup)
        })
    }

    handleResearchSubmit = (research, changeResearchPopup) => {
        let name = research.name
        let newName = changeResearchPopup.input.value
        this.controller.editResearch(getCookie("token"), getCookie("taskId"), name, newName)
            .then(response => response.text())
            .then(response => {
                if (response == "true") {
                    this.changeResearchName(research, newName)
                    this.view.bodyDiv.removeChild(changeResearchPopup.mainDiv)

                }
            })
    }

    changeResearchName(research, newName) {
        this.researchList.replace(name, newName)
        research.name = newName
        research.header.textContent = newName
    }


    /*
    * Research delete popup functions
    */


    bindResearchDelete = (handler, research) => {
        research.morePopup.deleteLabel.addEventListener("click", function () {
            handler(research)
        })
    }

    handleResearchDelete = (research) => {
        this.controller.deleteResearch(getCookie("token"), getCookie("taskId"), research.name)
            .then(response => response.text())
            .then(response => {
                if (response == "true") {
                    this.deleteResearch(research)
                }
            })
    }

    deleteResearch(research) {
        this.researchList = this.researchList.replace(research.name + ",", "")
        this.view.researchDiv.removeChild(research.container)
    }

    /*
     * Research Chat functions
     */

    //load msg list functions
    loadResearchMsgs = () => {
        this.controller.getResearchMsgList(getCookie("token"), getCookie("taskId"), this.research.name)
            .then(response => response.json()) 
            .then(response => {
                if (response != undefined) {
                    console.log("loadResearchMsgList : " + response)
                    for (let x = 0; x < response.length; x++) {
                        console.log("loadResearchResponse: " + response[x])
                        console.log("loadResearchMsgList id : " + response[x].id)
                        console.log("research chatlist: " + this.research.researchChatList)
                        if (!this.research.researchChatList.includes(response[x].id)) {
                            if (response[x].type == "string") {
                                let username = response[x].username
                                let msg = response[x].message
                                this.newResearchMsg(username, msg, this.researchChat)
                            } else if (response[x].type == "image") {
                                let username = response[x].username
                                let img = response[x].imageContent
                                this.addResearchChatImg(this.researchChat, username, img)
                            }
                            if (response[x].id != undefined) {
                                this.research.researchChatList += response[x].id + ","
                            }
                        } else {
                            console.log("loadResearchMsg chatlist: " + this.research.researchChatList)
                        }
                    }
                }
            })
    }

    loadResearchMsgList = (list) => {
       
    }

    newResearchMsg(username, msg, researchChat) {
        let chatMsg = new ChatMessage(username, msg)
        researchChat.innerDiv.appendChild(chatMsg.container)
    }

   //msg send functions

    bindResearchImageSend = (research, researchChat) => {
        let handleResearchImgSend = this.handleResearchImgSend
        researchChat.imageInput.addEventListener("input", function () {
            handleResearchImgSend(research, researchChat)
        })
    }

    handleResearchImgSend = (research, researchChat) => {
        var reader = new FileReader();
        reader.readAsDataURL(researchChat.imageInput.files[0])
        reader.onload = () => {
            const base64Str = reader.result
            console.log("reader.result: " + base64Str)
            let request = this.imageMessageJsonRequest(this.username, base64Str)
            this.controller.postResearchMsg(getCookie("token"), getCookie("taskId"), research.name,
                request)
                .then(response => response.text())
                .then(response => {

                    research.researchChatList += response + ","
                    this.addResearchChatImg(researchChat, this.username, base64Str)


                })
        };
    }

    addResearchChatImg(researchChat, username, img) {
        let msg = new ChatMessage(username, "")
        let inputImg = document.createElement("img")
        inputImg.src = img;
        msg.container.appendChild(inputImg)
        researchChat.innerDiv.appendChild(msg.container)
        //  this.generalChatList += msg.username + "*" + img + ","
    }

    bindResearchMsgSend = (handler, research, researchChat) => {
        researchChat.input.addEventListener("keypress", function (event) {
            // Check if the key pressed is 'Enter' (key code 13)
            if (event.keyCode === 13 || event.which === 13) {
                handler(research, researchChat)
            }
        })
    }

    handleResearchMsgSend = (research, researchChat) => {
        let input = researchChat.input
        let inputValue = researchChat.input.value
        let request = this.stringMessageJsonRequest(this.username, inputValue)
       
            this.controller.postResearchMsg(getCookie("token"), getCookie("taskId"), research.name,request)
                .then(response => response.text())
                .then(response => {
                     research.researchChatList += response +","
                    input.value = ""
                    this.newResearchMsg(this.username, inputValue, researchChat)
                    
                })
        
    }

   //research dropdown functions

    bindResearchDropdown = (handler, research) => {
        research.dropdownImg.addEventListener("click", function () {
            handler(research)
        })
    }

    handleResearchDropdown = (research) => {


        this.showResearchDrop(research)
    }

    showResearchDrop = (research, researchChat) => {
        console.log("showDrop researchChatList: " + research.researchChatList)

        this.research = research 
        this.research.researchChatList = ""
        this.researchChat = new ResearchChat()
        this.bindResearchImageSend(research, this.researchChat)
        this.view.researchDiv.classList.add("hidden")
        this.bindResearchMsgSend(this.handleResearchMsgSend, research, this.researchChat)
        this.view.mainResearchDiv.appendChild(this.researchChat.master)
        setInterval(this.loadResearchMsgs, 800)
        console.log(this.researchMsgIntervalId)
        this.view.researchForumHeader.innerHTML = research.name
        this.handleHideResearch(this.bindHideResearch, research)
    }

   

    hideResearchDrop = (research, researchChat, researchDiv, mainResearchDiv, intervalId, researchForumHeader) => {
       
        researchDiv.classList.remove("hidden")
        //clearInterval(intervalId)
        researchForumHeader.removeEventListener("click", this.bindHideResearch)
        mainResearchDiv.removeChild(researchChat.master)

    }

    handleHideResearch(handler, research) {
        this.view.researchForumHeader.addEventListener("click", function(){
            handler(research)
        })
    }

    bindHideResearch = (research) => {
        let researchForumHeader = this.view.researchForumHeader
        let researchDiv = this.view.researchDiv
        let mainResearchDiv = this.view.mainResearchDiv
        let intervalId = this.researchMsgIntervalId
        this.researchForumHeaderFunction(research,this.researchChat,
            researchForumHeader, researchDiv, mainResearchDiv, intervalId)

    }

    researchForumHeaderFunction = (research,researchChat, researchForumHeader, researchDiv, mainResearchDiv, intervalId) => {
        researchForumHeader.innerHTML = "Research Forum"
        this.hideResearchDrop(research,researchChat, researchDiv, mainResearchDiv, intervalId, researchForumHeader)

    }



 
    /*
     * 
     * Description functions
     * 
     */

    loadDesc() {
        let desc = new Description()
        this.controller.getTaskDesc(getCookie("token"), getCookie("taskId"))
            .then(response => response.text())
            .then(response => {
                desc.descLabel.textContent = response
            })
        return desc
    }

    bindDescEditSave = (handler, desc) => {
        desc.editDiv.addEventListener("click", function () {
            handler(desc)
        })
    }

    handleDescEditSave = (desc) => {
        if (this.isDescEdit) {
            this.saveDesc(desc)
        } else {
            this.setDescEditMode(desc)
        }
    }

    saveDesc(desc) {
        this.controller.postTaskDesc(getCookie("token"), getCookie("taskId"), desc.descLabel.textContent)
            .then(response => response.text())
            .then(response => {
                if (response == "true") {
                    this.setDescViewMode(desc)
                }
            })
    }

    setDescViewMode(desc) {
        this.isDescEdit = false
        desc.descLabel.setAttribute("contenteditable", "false");
        desc.editLabel.textContent = "Edit"
    }

    setDescEditMode(desc) {
        this.isDescEdit = true
        desc.descLabel.setAttribute("contenteditable", "true");
        desc.editLabel.textContent = "Save"
    }

    bindDescHandler = (handler, desc) => {
        this.view.descBtn.addEventListener("click", function () {
            handler(desc)
        })
    }

    handleDescBtn = (desc) => {
        if (this.isDesc) {
            this.showDesc(desc)
        } else {
            this.removeDesc(desc)
        }
    }

    showDesc(desc) {
        this.isDesc = false
        this.view.bodyDiv.removeChild(desc.container)
    }

    removeDesc(desc) {
        this.isDesc = true
        this.view.bodyDiv.appendChild(desc.container)
    }
}

class View{
    constructor() {
        this.bodyDiv = document.getElementById("rowDiv")
        this.researchDiv = document.getElementById("researchDiv")
        this.researchForumDiv = document.getElementById("researchForum")
        this.researchBtn = document.getElementById("researchBtn")
        this.generalChatDiv = document.getElementById("generalChat")
        this.generalChatInput = document.getElementById("genInput")
        this.backBtn = document.getElementById("backBtn")
        this.descBtn = document.getElementById("descBtn")
        this.researchForumHeader = document.getElementById("forumHeader")
        this.mainResearchDiv = document.getElementById("mainResearchDiv")
        this.genImageInput = document.getElementById("genImageInput")
    }
}

class Controller {
    constructor() {
        this.domain = "https://www.zinxswiki.com"
        this.fetch_url_taskpage = "/admin/projectmanager/taskpage/"
    }

    getGeneralMsgList(token, taskId) {
        return fetch(this.fetch_url_taskpage + "getGeneralMsgList/" + token + "/" + taskId, {
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

    getUsername(token) {
        return fetch(this.fetch_url_taskpage + "getUsername/" + token, {
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

    postGeneralMsg(token, taskId, body) {
        return fetch(this.fetch_url_taskpage + "postGeneralMsg/" + token + "/" + taskId , {
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

    getTaskDesc(token, taskId) {
        return fetch(this.fetch_url_taskpage + "getTaskDesc/" + token + "/" + taskId, {
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

    postTaskDesc(token, taskId, desc) {
        let ret = `{
                          "desc": "`+ desc + `"     
                   }`
        console.log(ret)
        ret = JSON.parse(ret)
        return fetch(this.fetch_url_taskpage + "postTaskDesc/" + token + "/" + taskId, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ret)
        }).catch(error => {
            console.error(error);
        });
    }

    getResearchList(token, taskId) {
        return fetch(this.fetch_url_taskpage + "getResearchList/" + token + "/" + taskId, {
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

    postNewResearch(token, taskId, name) {
        return fetch(this.fetch_url_taskpage + "postNewResearch/" + token + "/" + taskId + "/" + name, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    getResearchMsgList(token, taskId, researchName) {
        return fetch(this.fetch_url_taskpage + "getResearchMsgList/" + token + "/" + taskId + "/" + researchName, {
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

    postResearchMsg(token, taskId, researchName, body) {
        
        return fetch(this.fetch_url_taskpage + "postResearchMsg/" + token + "/" + taskId + "/" + researchName, {
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

    deleteResearch(token, taskId, name) {
        return fetch(this.fetch_url_taskpage + "deleteResearch/" + token + "/" + taskId + "/" + name, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        }).catch(error => {
            console.error(error);
        });
    }

    editResearch(token, taskId, name, newName) {
        return fetch(this.fetch_url_taskpage + "editResearch/" + token + "/" + taskId + "/" + name + "/" + newName, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        }).catch(error => {
            console.error(error);
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