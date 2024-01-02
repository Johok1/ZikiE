/**
let fileContent = "";

let path = "";

let endpoint = "";

function fetchDataInit() {
    endpoint += '&home&server&ftp';
    // send GET request to backend to get list of files
    fetch('http://www.zinxshosting.com/api/v1/cpcontrol/getConsoleDirectory/'+getCookie("tempToken")+"/"+endpoint+"/"+getCookie("panel"))
        .then(response => response.text())
        .then(data => {
            data = data.replaceAll('[','');
            data = data.replaceAll(']','');
            initFileList(data.split(","));
        });
}

function fetchData() {
    console.log(endpoint);
    // send GET request to backend to get list of files
    fetch('http://www.zinxshosting.com/api/v1/cpcontrol/getConsoleDirectory/'+getCookie("tempToken")+"/"+endpoint+"/"+getCookie("panel"))
        .then(response => response.text())
        .then(data => {
            data = data.replaceAll('[','');
            data = data.replaceAll(']','');
            initFileList(data.split(","));
        });
}

function postFileData(){
  filepath = endpoint.replaceAll('&home&server','');
  fetch('http://www.zinxshosting.com/api/v1/cpcontrol/postFtpFile/'+getCookie("tempToken")+"/"+filepath+getCookie("paenl"),{
    method: 'POST',
    headers:{
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'plain/text'
    },
    body: fileContent,
  })
  .then((response) =>{
    endpoint = endpoint.replaceAll(endpoint.slice(endpoint.lastIndexOf('&')),'');
    console.log(endpoint);
    fetchData()
});
}

function getContent(filepath){
  filepath = filepath.replaceAll('&home&server','');
  fetch('http://www.zinxshosting.com/api/v1/cpcontrol/getFtpFile/'+getCookie("tempToken")+"/"+filepath+"/"+getCookie("panel"))
  .then(response => response.text())
  .then(data => {
    data = data.replaceAll('[','');
    data = data.replaceAll(']','');
    data = data.replaceAll(',','');
    displayFileContent(data.split("\n"))
  });
}


function displayFileContent(files) {
    let filesElement = document.getElementById("files");
    // clear existing file elements
    filesElement.innerHTML = '';
    let masterLabel = document.createElement('label');
    //masterLabel.setText("<html>")
    masterLabel.style.color = "yellow";
    masterLabel.contentEditable = "true";
    for (let i = 0; i < files.length; i++) {
        console.log("1: " + i + ': ' + files[i]);
        let fileName = files[i].trim();
        let indent = files[i].length - fileName.length;
        fileContent += files[i] + "\n";

    //    let label = document.createElement('label')
      //  label.contentEditable="true"
        masterLabel.innerHTML += files[i]+"<br>";
      //  label.style.color = "yellow";
      //  masterLabel.appendChild(label);
      //  masterLabel.appendChild(document.createElement('br'));
      }
      filesElement.appendChild(masterLabel);
      //filesElement.appendChild(iframe);
      console.log(fileContent);
      createDownloadButton(filesElement,masterLabel);
      createBackButton(filesElement);
    //  addBottomBar(filesElement);
  }

  function createBackButton(filesElement){
    if(!(endpoint.normalize() === "&home&server".normalize())){
    // create download button
    let backButton = document.createElement('button');
    backButton.id = 'backButton';
    backButton.innerHTML = 'Back';
    backButton.addEventListener('click', function() {
      let endpoints = endpoint.split('&');
      endpoint = '';
      for(let i = 0; i< endpoints.length;i++){
        if(i != endpoints.length-1){
          if(endpoints[i] != ""){
            endpoint += "&" + endpoints[i];
          }
        }
      }
      fetchData();
    });
    filesElement.appendChild(backButton);
}
  }




  function createDownloadButton(filesElement, masterLabel){
    // create download button
    let downloadButton = document.createElement('button');
    downloadButton.id = 'downloadButton';
    downloadButton.innerHTML = 'Save Changes';
    downloadButton.addEventListener('click', function() {
        fileContent = masterLabel.innerHTML;
        postFileData();
    });
    filesElement.appendChild(downloadButton);

  }

function stringData(str) {
    let files = str.split("\n");
    updateFileList(files);
}

function initFileList(files) {
    let filesElement = document.getElementById("files");
    // clear existing file elements
    filesElement.innerHTML = '';

    for (let i = 0; i < files.length; i++) {

        let fileName = files[i].trim();
        let indent = files[i].length - fileName.length;

        // create checkbox input element
        if(fileName != ""){

        let button = document.createElement('button');
        button.id = 'dir'+i;
        button.innerHTML = fileName;
        button.style.marginLeft = (indent * 10) + 'px';
        button.addEventListener('click',function(){

           if(fileName.includes(".")){
             endpoint +=  "&"+fileName;
             getContent(endpoint);
           }else{
             endpoint += "&"+fileName;
             fetchData(endpoint);
           }

        });

        filesElement.appendChild(button);
        filesElement.appendChild(document.createElement('br'));
      }
    }
    createBackButton(filesElement);
    //  addBottomBar(filesElement);
  }

  function addBottomBar(filesElement){
    // create move button
    let moveButton = document.createElement('button');
    moveButton.id = 'moveButton';
    moveButton.innerHTML = 'Move Selected Files';
    moveButton.addEventListener('click', function() {
      // show overlay and move form
      document.getElementById("overlay").style.display = "block";
    });
    //filesElement.appendChild(moveButton);


    // create download button
    let downloadButton = document.createElement('button');
    downloadButton.id = 'downloadButton';
    downloadButton.innerHTML = 'Download Selected Files';
    downloadButton.addEventListener('click', function() {
        postFileData();
    });
    filesElement.appendChild(downloadButton);

    // create delete button
    let deleteButton = document.createElement('button');
    deleteButton.id = 'deleteButton';
    deleteButton.innerHTML = 'Delete Selected Files';
    deleteButton.addEventListener('click', function() {
        // get all checked checkboxes
        let checkedBoxes = document.querySelectorAll("input[type='checkbox']:checked");
        // create array of file names to delete
        let filesToDelete = [];
        for (let i = 0; i < checkedBoxes.length; i++) {
            let fileName = checkedBoxes[i].dataset.fileName;
            filesToDelete.push(fileName);
        }
        // send request to backend to delete selected files
        //fetch('/delete-files', {
          //  method: 'POST',
        //    headers: {
          //      'Content-Type': 'application/json'
    //        },
     //       body: JSON.stringify({files: filesToDelete})
    //    }).then(() => {
            // update file list after deleting selected files
      //      fetchData();
 //       });
});
    filesElement.appendChild(deleteButton);
  }

  function updateFileList(files) {
      let filesElement = document.getElementById("files");
      // clear existing file elements
      filesElement.innerHTML = '';

      for (let i = 0; i < files.length; i++) {
          console.log(i + ': ' + files[i]);
          let fileName = files[i].trim();
          let indent = files[i].length - fileName.length;

          // create checkbox input element
          if(fileName != ""){
          if(fileName.includes(".")){
          let checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.id = 'file' + i;
          checkbox.dataset.fileName = fileName;
          checkbox.innerHTML = fileName;
          filesElement.appendChild(checkbox);
          let label = document.createElement('label')
          label.innerHTML = fileName;
          filesElement.appendChild(label);
        }else{
          let button = document.createElement('button');
          button.id = 'dir'+i;
          button.innerHTML = fileName;
          button.style.marginLeft = (indent * 10) + 'px';
          button.addEventListener('click',function(){
          //  console.log(fileName);
            fetchData("&opt&minecraft&"+fileName+"&",button)
        });
          filesElement.appendChild(button);
        }

          filesElement.appendChild(document.createElement('br'));
        }
      }
      //  addBottomBar(filesElement);
    }

function logEndpoint(){
  console.log(endpoint);
}
setInterval(logEndpoint, 1000);
fetchDataInit(); // update file list using data from string
*/

function setCookie(cname, cvalue, exhours) {
  const d = new Date();
  d.setTime(d.getTime() + (exhours*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
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


//Model class binds the view class which manages the display and the controller class
//which manages all the endpoints to the backend. Listeners from the view class trigger calls to the backend
//through the model class so that the view and controller class never directly communicate. 
class Model{

    //construct model get temp token for authentication and panel profile info to access panel
    //initialize variables for the view and controller classes, set the first endpoint for the root filepath,
    //and then get the file list for that root directory and send it into the view class using the initFileList method
    //to initialize the file view
    constructor(view, controller) {
        //set a controller instance variable for this class
        this.controller = controller;
        //set a view instance variable for this class
        this.view = view;

        //get the temp token cookie 
        this.temp = getCookie("tempToken");
        //get the panel variable 
        this.panel = getCookie("panel");
        //set a endpoint instance variable to the root directory
        this.endpoint = '&home&server';

        //get the controller variables list directories method and pass in the root endpoint
        //to get the files of the root
        this.controller.getListDirectories(this.temp, this.panel, this.endpoint)
            .then(files => {
                console.log("model constructor getListDirectories files " + files);
                //get the view and initialize the file list with the files data and passing in
                //the listener method used for the file buttons in the file list GUI 
                this.view.initFileList(files, this.fileListButtonHandler);
            });
        console.log("model constructed!");
    }

    //check the filename if its a file then display the file content with the save button if its a directory then display
    // and updated directory list if its empty then display the same directory list
    fileListButtonHandler = (fileName) => {
     
        console.log("fileListButtonHandler filename: " + fileName);
        //check if the filename that was passed in has a . 
        //in it which would mean its a file and not a folder
        if (fileName.includes(".")) {
            console.log("fileListButtonHandler fileName.includes(.)");
            //set the newEndpoint variable to the current endpoint with the filename added on 
            let newEndpoint = this.endpoint + "&" + fileName;
            console.log("fileListButtonHandler newEndpoint: " + newEndpoint);
            //call the backend for the file content based on the updated endpoint
            this.controller.getFileContent(this.temp, this.panel, newEndpoint)
                .then(fileContent => {
                    console.log("fileListButtonHandler fileContent: " + fileContent);
                    //set the current endpoint to the newendpoint
                    this.endpoint = newEndpoint;
                    //call the view to display the text editor with the file content 
                    this.view.displayTextEditor(fileContent);
                    //after the display text editor function is called the back and save buttons need to be bound
                    this.view.handleBackButtonClickEvent(this.backButtonClickEventHandler);
                    //bind the save button 
                    this.view.handleSaveButtonClickEvent(this.saveButtonClickEventHandler);

                }).catch(error => {
                    console.error(error);
                });
        //if the file name is does not include . but its not empty then its a directory (hopefully) 
        } else if (!(fileName == "")) {
            console.log("fileListButtonHandler else");
            //set the new endpoint 
            let newEndpoint = this.endpoint + "&" + fileName;
            console.log("fileListButtonHandler newEndpoint: " + newEndpoint)
            //list directories based on the updated endpoint 
            this.controller.getListDirectories(this.temp, this.panel, newEndpoint)
            .then(fileContent => {
                console.log("fileListButtonHandler fileContent: " + fileContent);
                //initialize the file list with the new directories and the handler (this function)
                this.view.initFileList(fileContent, this.fileListButtonHandler);
                //set the endpoint variable to the new endpoint 
                this.endpoint = newEndpoint;
                //bind the back button handler because calling initFileList reset it 
                this.view.handleBackButtonClickEvent(this.backButtonClickEventHandler);
            }).catch(error => {
               console.error(error);
            });
        //the fileName must have just been empty
        } else {
            console.log("fileListButtonHandler else");
            //keep the endpoint the same
            let newEndpoint = this.endpoint;
            console.log("fileListButtonHandler newEndpoint: " + newEndpoint)
            //list the directories (should be the same with the same endpoint)
            this.controller.getListDirectories(this.temp, this.panel, newEndpoint)
            .then(fileContent => {
               console.log("fileListButtonHandler fileContent: " + fileContent);
               this.endpoint = newEndpoint;
               this.view.initFileList(fileContent, this.fileListButtonHandler);
               this.view.handleBackButtonClickEvent(this.backButtonClickEventHandler);
               //this.view.handleSaveButtonClickEvent(this.saveButtonClickEventHandler);
            }).catch(error => {
               console.error(error);
            });
        }
    }

    //split the file content by line break and replace it with new line character then post the updated
    //file content to the backend 
    saveButtonClickEventHandler = fileContentRaw => {
        console.log("saveButtonClickEventHandler fileContentRaw " + fileContentRaw)
        //split the raw file content by the line breaks
        let fileContentSplit = fileContentRaw.split('<br>')
        console.log("saveButtonClickEventHandler fileContentSplit " + fileContentSplit);
        //initialize a filecontent variable to empty 
        let fileContent = "";
        //loop through the split file content 
        for (let i = 0; i < fileContentSplit.length; i++){
            //set a variable to the file content with a new line added
            let addition = fileContentSplit[i] + "\n";
            console.log("saveButtonClickEventHandler addition " + addition);
            //add the addition to the filecontent variable
            fileContent += addition;
        }
        //post the file data to the backend.
        this.controller.postFileData(this.temp, this.panel, this.endpoint, fileContent)
            .then(data => {
            //logging functions to see the data returned 
            if (data == false) {
                console.log("saveButtonClickEventHandler data false " + data)
            } else {
                console.log("saveButtonClickEventHandler data true " + data)
            }
        });
    }

    //reset the endpoint removing the element from the end and re-initialize the view file list
    backButtonClickEventHandler = () => {
        //make a list of endpoints by splitting by &
        let endpoints = this.endpoint.split('&');
        console.log("backButtonClickEventHandler endpoints " + endpoints);
        //clear the current endpoint variable
        this.endpoint = '';
        //loop through the endpoints array
        for(let i = 0; i< endpoints.length;i++){
            //if i is not set to the index of the last element of the array
            if(i != endpoints.length-1){
                //if the current endpoint element isn't empty 
                if(endpoints[i] != ""){
                    //set a variable with the new endpoint element to add 
                    let addition = "&" + endpoints[i];
                    console.log("backButtonClickEventHandler addition " + addition);
                    //add new endpoint element to the endpoint variable 
                    this.endpoint += addition;

                } else {
                    console.log("backButtonClickEventHandler endpoints[i] is empty" + endpoints[i]);
                   //display no directories msg?
                }
            }
        }
        //update the file list with the new directories based on the updated endpoint variable. 
        this.controller.getListDirectories(this.temp, this.panel, this.endpoint)
        .then(data => {
            console.log("backButtonClickEventHandler .then data " + data);
            //initialize filelist view with new directories
            this.view.initFileList(data, this.fileListButtonHandler);
        })
        .catch(error => {
            console.error(error);
        });
   
    }
    }

//View class holds all functions for setting output to and getting input from the display
class View{

    //initialize files element for holding buttons and master label for displaying the text
    constructor() {
        //get files element by id from document and set it to instance variable
        this.filesElement = document.getElementById("files");
        //create label inside of document and set it to master label variable
        this.masterLabel = document.createElement('label');
        console.log("view constructed!");
    }

    //create save button and append it to filesElement
    appendSaveButton() {
        //create new button in document
        this.saveButton = document.createElement('button');
        //set id to saveButton
        this.saveButton.id = 'saveButton';
        //set inner html to Save Changes
        this.saveButton.innerHTML = 'Save Changes';
        //set button display to block
        this.saveButton.display = "block";
        //append button to files element 
        this.filesElement.appendChild(this.saveButton);
    }

    //create back button and append it to files element 
    appendBackButton() {
        this.backButton = document.createElement('button');
        this.backButton.id = 'backButton';
        this.backButton.innerHTML = 'Back';
        this.backButton.display = 'block';
        this.filesElement.appendChild(this.backButton);
    }

    //initialize files list 
    initFileList(files, handler) {
        //clear display
        this.filesElement.innerHTML = "";
        console.log("initFileList files: " + files);
        //loop through files (i guess were assuming its an array)
        for (let i = 0; i < files.length; i++) {
            //set file name to the element with the whitespace trimmed
            let fileName = files[i].trim();
            //i guess this gets the amt of whitepsaces removed and sets it as the indents
            let indent = files[i].length - fileName.length;
            console.log("initFileList fileName indent" + fileName + " " + indent);
            
            if (fileName != "") {
                
                let button = document.createElement('button');
                button.id = 'dir' + i;
                button.innerHTML = fileName;
                button.style.marginLeft = (indent * 10) + 'px';
                //call handler passed on button click
                button.addEventListener('click', function () {
                    handler(fileName);
                });
                //append the button to the display
                this.filesElement.appendChild(button);
                //create a line break element and append it to display 
                this.filesElement.appendChild(document.createElement('br'));
            } else {
                console.log("initFileList filename is empty => " + fileName);
            }
        }
        //add on back button
        this.appendBackButton();
    }
    //clear the display, construct the html of the file, and display it instead adding a back button and save button at
    //the end
    displayTextEditor(content_parsed){

        console.log("displayTextEditor content_parsed " + content_parsed);
            // clear existing file elements
            this.filesElement.innerHTML = '';

            //masterLabel.setText("<html>")
            this.masterLabel.style.color = "yellow";
            this.masterLabel.contentEditable = "true";

            for (let i = 0; i < content_parsed.length; i++) {
               console.log("displayTextEditor content_parsed[i] " + content_parsed[i]);
               //loop through passed list and set each element inside the html of the master label adding a line
               // break at the end to perserve the original structure of the data
               this.masterLabel.innerHTML += content_parsed[i] + "<br>";
        }
            //add the master label and back and save buttons
            this.filesElement.appendChild(this.masterLabel);
            this.appendSaveButton();
            this.appendBackButton();
    }


    //pass file content into handler for it to make a POST request with the user changes stored in the masterlabel html 
    handleSaveButtonClickEvent(handler) {
        console.log("handleSaveButtonClickEvent handler " + handler);
        //call passed handler when save button is pushed, pass in master label html to handler so it can post the file
        // to the backend 
        let html = this.masterLabel.innerHTML
        this.saveButton.addEventListener('click', function () {
            console.log("handleSaveButtonClickEvent masterLabel.html " + html);
            handler(html);
         });
    }

    //set savebutton display mode to block
    displaySaveButton(){
        this.saveButton.display = "block";
        console.log("displaySaveButton saveButton.display " + this.saveButton.display);
    }

    //set savebutton display mode to none
    hideSaveButton() {
        this.saveButton.display = "none";
        console.log("hideSaveButton saveButton.display " + this.saveButton.display);
    }

    //set backbutton display mode to block
    displayBackButton(){
        this.backButton.display = "block";
        console.log("displayBackButton backbutton.display " + this.backButton.display);
    }

    //call backbutton click event handler from model class
    handleBackButtonClickEvent(handler) {
        console.log("handleBackButtonClickEvent handler " + handler)
        this.backButton.addEventListener('click',function(){
            handler();
        });
    }

    //toggle backbutton display mode to none 
    hideBackButton(){
        this.backButton.display = "none";
        console.log("hideBackButton backButton.display " + this.backButton.display);
    }

    

}

//The controller class holds all the functions for getting and parsing data from the backend to send to the model class
// so that the model class can communicate with the view class. 
class Controller{
    constructor() {
        //set the base fetch url for the endpoints 
        this.fetch_url = "http://www.zinxshosting.com/api/v1/cpcontrol/";
        console.log("controller constructed!");
    }

    //post file content to particular filepath
    postFileData(temp,panel,filepath,fileContent){
       // console.log("postFileData temp " + temp)
       //console.log("postFileData panel " + panel)
        console.log("postFileData filepath " + filepath)
        console.log("postFileData fileContent " + fileContent)
        if (filepath === "") {
            console.log("postFileData filepath is empty " + filepath);
            //thus, this might be a good place to keep "track" of them since they might be doing some shady shit
            return false;
        } else {
            //pass temp token filepath and panel id as path parameters
            fetch(this.fetch_url+'postFtpFile/'+temp+"/"+filepath+"/"+panel,{
                 method: 'POST',
                 headers:{
                      'Access-Control-Allow-Origin':'*',
                      'Access-Control-Allow-Origin':'*',
                      'Content-Type': 'plain/text'
                 },
                   body: fileContent,
                 })
                .then((response) => {
                     //i think the reasponse is boolean on whether the file was saved or not 
                    console.log("postFileData response true " + response)
                    return true;

                 }).catch(error => {
                    console.error(error)
                 });
        }
    }

    //get the directories listed in a particualr filepath from the backend
    getListDirectories(temp, panel, filepath) {
       // console.log("getListDirectories temp " + temp)
       // console.log("getListDirectories panel " + panel)
        console.log("getListDirectories filepath " + filepath)
      return fetch(this.fetch_url+'getConsoleDirectory/'+temp+"/"+filepath+"/"+panel)
             .then(response => response.text())
             .then(data => {
                 if (data != null && !(data === "")) {
                     console.log("getListDirectories data: " + data);
                     //parse the data before returning it as a list
                     return this.parseDirectoryListString(data);
                 } else {
                     console.log("getListDirectories data (is null or empty): " + data);
                     return "";
                 }
             }).catch(error => {
                console.error(error);
             });
    }

    //get the content of a particular file of a particular filepath, in this method
    //the filepath simply needs to include the . extension and the backend
    //will see the file there if its there and reurn its content
    getFileContent(temp, panel, filepath) {
        console.log("getFileContent filepath " + filepath);
       if(filepath!=""){ 
          return fetch(this.fetch_url + 'getFtpFile/'+temp+"/"+filepath+"/"+panel)
            .then(response => response.text())
            .then(data => {
                 if (data != null && !(data === "")) {
                     console.log("getFileContent .then data " + data);
                     //parse content into list of lines
                    return this.parseFileContentData(data);
                 }else{
                    console.log("getFileContent .then data (is null or empty) " + data);
                    return "";
                 }
            }).catch(error => {
                   console.error(error);
            });
       } else {
           console.log("getFileContent filepath (is empty) " + filepath);
       }
    }

    restrictFilepathString(filepath, content) {
        console.log("restrictFilepathString filepath " + filepath)
        console.log("restrictFilepathString content " + content)
        if (filepath.includes(content)) {
            let result = filepath.replaceAll(content, '');
            console.log("restrictFilepathString result " + result);
            return result;
        }else{
            //if the content to strip (the super string/home directory)
            // isn't there then don't let them access the file because its in a
            // completely seperate directory
            console.log("restrictFilepathString filepath.includes (is false) => " + filepath.includes(content))
            return "";
        }
    }
    //remove all [] and , and then split by new line and return the list
    parseFileContentData(data) {
        console.log("parseFileContentData data " + data)
        data = data.replaceAll('[','');
        console.log("parseFileContentData data1 " + data)
        data = data.replaceAll(']', '');
        console.log("parseFileContentData data2 " + data)
        data = data.replaceAll(',', '');
        console.log("parseFileContentData data3 " + data)
        let result = data.split("\n");
        console.log("parseFileContentData result " + result);
        return result
    }
    //remove all [] and then split by commas and return the list
    parseDirectoryListString(data) {
        console.log("parseDirectoryListString data " + data)
        data = data.replaceAll('[', '');
        console.log("parseDirectoryListString data 1: " + data);
        data = data.replaceAll(']', '');
        console.log("parseDirectoryListString data 2: " + data);
        let datasplit = data.split(',');
        console.log("parseDirectoryListString datasplit: " + datasplit);
        return datasplit;
    }

}
const app = new Model(new View(), new Controller())
