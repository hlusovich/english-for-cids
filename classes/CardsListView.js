class CardsListView {
    constructor(pictures) {
        this.pictures = pictures;
    }

    display(cards, status) {
        const fragment = document.createDocumentFragment();
        this.pictures.innerHTML = '';
        let count = 0;
        const createPicture = (item) => {
            const pictureFragment = document.createDocumentFragment();
            const picture = document.createElement("div");
            const pictureImg = document.createElement("img");
            const pictureTitle = document.createElement("div");
            const pictureSubtitle = document.createElement("div");
            const pictureSubtitleText = document.createElement("div");
            const pictureSubtitleIndicator = document.createElement("div");
            const container = document.createElement("div");
            const flipper = document.createElement("div");
            flipper.classList.add("flipper");
            container.classList.add("picture-container");
            const pictureBack = document.createElement("div");
            pictureBack.classList.add("pictures__item-back");
            picture.classList.add("pictures__item");
            pictureTitle.classList.add("pictures__item-title");
            pictureSubtitle.classList.add("pictures__item-subtitle");
            pictureSubtitleIndicator.classList.add("pictures__item-subtitle-indicator");
            pictureSubtitleText.classList.add("pictures__item-subtitle-text");
            pictureImg.src = item.picture;
            pictureTitle.innerText = item.title;
            pictureBack.innerText = item.translate;
            pictureBack.setAttribute("count", count);
            picture.setAttribute("count", count);
            if (status === "Play") {
                picture.classList.add("pictures__item_yellow");
                pictureSubtitleIndicator.classList.add("yellow");
            }
            if (item.cards) {
                pictureImg.setAttribute("main", item.title);
                pictureSubtitleText.innerText = "8 Cards";
            }
            if (item.audio) {
                pictureImg.setAttribute("audio", item.audio);
                pictureImg.setAttribute("title", item.title);
                pictureSubtitleText.innerHTML = `<i count=${count} class="material-icons">visibility</i>`;
                count++
            }
            pictureSubtitle.appendChild(pictureSubtitleText);
            pictureSubtitle.appendChild(pictureSubtitleIndicator);
            pictureFragment.appendChild(pictureImg);
            pictureFragment.appendChild(pictureTitle);
            pictureFragment.appendChild(pictureSubtitle);
            picture.appendChild(pictureFragment);
            container.appendChild(picture);
            container.appendChild(pictureBack);
            fragment.appendChild(container);
        };
        cards.map(item => createPicture(item));
        this.pictures.appendChild(fragment);
    }

    displayTotal() {
        const words = JSON.parse(localStorage.getItem("score"));
        console.log(words)
        const fragment = document.createDocumentFragment();
        this.pictures.innerHTML = '';
        const table = document.createElement("div");
        table.classList.add("table");
        const tableNmae = document.createElement("div");
        tableNmae.classList.add("table-name");
        tableNmae.innerText = "Score";
        const subName = document.createElement("div");
        subName.innerHTML = `<div class="table__subname"><div>Word</div><div>Translation</div><div>Category</div><div>Training Clicks</div><div>Correct</div><div>Mistakes</div><div>Mistakes%</div></div>`;
        const tableBody = document.createElement("div");
        const tableBodyFragment = document.createDocumentFragment();
        words.map(item => {
            item.cards.map(item => {
                const tr = document.createElement("div");
                tr.innerHTML = `<div class="table__tr"><div>${item.title}</div><div>${item.translate}</div>
                <div>${item.category}</div><div>${item.training}
                </div><div>${item.correct}</div><div>${item.mistakes}</div>
                <div>${+item.mistakes / ((+item.correct) + (+item.mistakes))
                    ? +item.mistakes / ((+item.correct) + (+item.mistakes)) * 100 : 0}</div></div>`
                tableBodyFragment.appendChild(tr);
            })
        });
        tableBody.classList.add("table-body");
        fragment.appendChild(tableNmae);
        fragment.appendChild(subName);
        tableBody.appendChild(tableBodyFragment);
        fragment.appendChild(tableBody);
        table.appendChild(fragment);
        this.pictures.appendChild(table);
    }

}