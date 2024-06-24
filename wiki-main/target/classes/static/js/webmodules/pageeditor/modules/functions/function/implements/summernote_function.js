import Function from '../function.js'
import '../summernote.js'

export default class SummernoteFunction extends Function{



    handleEditText(element, deconstructToolbar, constructToolbar){
        console.log(element)
        console.log(element.firstChild)
      //  deconstructToolbar()


        //element.classList.add("summernote")
        this.element = element
        this.dupeElement = element.cloneNode()
        this.dupeElement.innerHTML = this.element.innerHTML
        document.getElementById("page").appendChild(this.dupeElement)
        this.dupeElement.classList.add("summernote")

        this.deconstructToolbar = deconstructToolbar
        this.constructToolbar = constructToolbar

        $(document).ready(() => {
            this.initTextEditor(constructToolbar)
        })

    }

    initTextEditor = (constructToolbar) => {
        let top = this.element.style.top
        let left = this.element.style.left
        let width = this.element.style.width
        let height = this.element.style.height

        this.createSummernoteEditor(top, left, width, height)
       
        document.getElementById("toolbar").appendChild(document.querySelector(".note-editor"))

        //this.attachDisableEditButton(constructToolbar, this.element)

        let parList = document.querySelector('.note-editable')

        this.preventSummernoteParagraphDeletion(parList)
        this.preventSummernotePasteWithFormatting(parList)
        this.preventSummernoteSelectAll(parList)
        this.moveSummernoteEditorToLayer(parList)
        parList.addEventListener("keydown", this.setSummernoteTextToElementText)
      

    }

    moveSummernoteEditorToLayer = (editorElement) => {
        editorElement.style.zIndex = this.element.getAttribute("layer")
        document.querySelector(".note-editor").style.zIndex = this.element.getAttribute("layer")
    }


    createSummernoteEditor = (top, left ,width, height) => {
        $('.summernote').summernote({ 
            fontSizeUnits: ['px', 'pt'],
            fontColor: '#000000',
            toolbar: [
                // [groupName, [list of button]]
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['font', ['strikethrough', 'superscript', 'subscript']],
                ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['view', ['fullscreen']]
            ],
            keyMap: {
                pc: {
                    'ENTER': ''
                },
                mac: {
                    'ENTER': ''
                }
            }
        });
        $('.note-editor').css({
            color: "black",
            width: "90%",
            backgroundColor: "white",
            psition: "fixed"
        })
        
    }

    attachDisableEditButton = (constructToolbar, element) => {
        let disableEditBtn = $('<btn class="disable-edit-button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-feather="x" class="feather feather-x" style="color: #BAA21F;"></svg></btn>');
        
        // Add an event listener to the button


        $('.note-editor').append(disableEditBtn)
       

       

       // $('.disable-edit-button').on("click", () => this.handleDisableEditText(constructToolbar, element));

        document.feather.replace()
       
    }

    setSummernoteTextToElementText = () => {
        console.log("copy")
        this.element.querySelector("p").innerHTML = document.querySelector(".note-editable").querySelector("p").innerHTML
    }

    preventSummernoteParagraphDeletion = (parList) => {
        parList.addEventListener("keydown", () => {
            if (event.keyCode === 8 || event.keyCode === 46) {
                if (parList.querySelector(".main").querySelectorAll("p")[0].textContent == "") {
                    event.preventDefault();
                    console.log("no backspace on : " + parList.outerHTML)
                } else {
                    console.log("backspace on : " + parList.outerHTML)
                }
            } else {
                console.log("backspace not detected")
            }
        });
    }

    preventSummernoteSelectAll = (parList) => {
        parList.addEventListener('keydown', event => {
            if (event.ctrlKey && 'a'.indexOf(event.key) !== -1) {
                event.preventDefault()
            }
        })
    } 

    preventSummernotePasteWithFormatting = (parList) => {
        parList.addEventListener("paste", function (e) {
            e.preventDefault();
            var text = e.clipboardData.getData("text/plain");
            var temp = document.createElement("div");
            temp.innerHTML = text;
            document.execCommand("insertHTML", false, temp.textContent);
        });

    }

   

    handleDisableEditText (constructToolbar, element){
        var markup = $('.summernote').summernote('code');

        //  this.element.innerHTML = markup

        $('.summernote').summernote('destroy');

        $('.summernote').removeClass('summernote')

     //   constructToolbar()

        element.style.height = (parseInt(element.querySelector(".textParagraph").style.height) + 50) + "px"

        this.element.innerHTML = this.dupeElement.innerHTML
        this.dupeElement.remove()
    }
}