class MarkListView {
    constructor(idSelector) {
        this.mark = document.getElementById(idSelector);
    }

    display(correct) {
        const star = document.createElement("img");
        if (correct) {
            star.src = "./assets/images/smileStar.png";
        }
        else{
            star.src = "./assets/images/sad.png";
        }
        if(this.mark.childNodes.length>10){
            this.mark.childNodes[0].remove();
        }
        this.mark.appendChild(star);
    }

    clear() {
        this.mark.innerHTML = '';
    }
}