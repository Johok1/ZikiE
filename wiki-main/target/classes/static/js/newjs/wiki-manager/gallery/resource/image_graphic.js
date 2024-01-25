export default class Image{
    constructor() {
        this.master = document.createElement("div")
        
        this.img = document.createElement("img")
        this.img.style.height = "10vh";
        this.master.appendChild(this.img)
    }

    setImgSrc(src) {
        this.img.src = src
    }
}