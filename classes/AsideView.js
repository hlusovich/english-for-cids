class AsideView {
    constructor(element) {
        this.aside = element;
    }

    display(list, current,regime) {
        this.aside.innerHTML = "";
        const fragment = document.createDocumentFragment();
        const category = document.createElement("h2");
        category.innerText = "Main";
        category.classList.add("aside_item");
        const categoryTotal = document.createElement("h2");
        categoryTotal.innerText = "Total";
        categoryTotal.classList.add("aside_item","text-purple");

        if(current==="Main"){
            category.classList.add(regime!=="Play"?"yellow-text":"green-text");
        }
        fragment.appendChild(category);
        list.map(item => {
            const category = document.createElement("h2");
            category.innerText = item.title;
            category.classList.add("aside_item");
            if(current===item.title){
                category.classList.add(regime!=="Play"?"yellow-text":"green-text");
            }
            fragment.appendChild(category);
            fragment.appendChild(categoryTotal);
        });
        this.aside.appendChild(fragment);
    }
}
