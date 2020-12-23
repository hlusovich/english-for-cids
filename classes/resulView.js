class ResultView {
    constructor(){

    }
    display(mistakes,count){
        const modal = document.createElement("div");
        modal.classList.add("modal");
        const img = document.createElement("img");
        if(mistakes){
            img.src="./assets/images/bad.svg";
            const mistakesCount = document.createElement("div");
            mistakesCount.innerText = count;
            mistakesCount.classList.add("mistakes-count");
            modal.appendChild(mistakesCount);
        }
        else{
            img.src="./assets/images/exellent.svg";
        }
        modal.appendChild(img);
        document.body.appendChild(modal);
        setTimeout(()=>{modal.remove()},5000);
    }


}