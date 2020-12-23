class Controller {
    constructor() {
        this.status = "Train";
        this.model = new Model();
        this.picturesBlock = document.getElementById("pictures");
        this.cardsView = new CardsListView(this.picturesBlock);
        this.cardsView.display(this.model.getMain(), this.status);
        this.pictures = document.querySelectorAll(".pictures__item");
        this.switchButton = document.querySelector(".header__switch-button");
        this.menuMtn = document.querySelector(".header__menu");
        this.swicthBlock = document.querySelector(".header__switch");
        this.shortLines = document.querySelectorAll(".header__menu-line-short");
        this.longLines = document.querySelectorAll(".header__menu-line-long");
        this.aside = document.querySelector(".aside");
        this.currentPage = "Main";
        this.asideView = new AsideView(this.aside);
        this.asideView.display(this.model.getMain(), this.currentPage, this.status);
        this.switchText = document.querySelector(".header__switch-button-text");
        this.indicators = document.querySelectorAll(".pictures__item-subtitle-indicator");
        this.menuToggle = false;
        this.event = new Event("click");
        this.header = document.getElementById("header");
        this.main = document.getElementById("main");
        this.headerInner = document.querySelector(".header-inner");
        this.gameField = [0, 1, 2, 3, 4, 5, 6, 7];
        this.guesstedCard = [];
        this.currentCardInGame = null;
        this.markView = new MarkListView("mark");
        this.end = false;
        this.mistake = false;
        this.startButton = document.querySelector(".start__switch-button");
        this.startButtonText = document.querySelector(".start__switch-button-text");
        this.startSwitch = document.querySelector(".start__switch");
        this.startFlag = false;
        this.switchButtonText = document.querySelector(".header__switch-button-text");
        this.resultView = new ResultView();
        this.mistakesCount = 0;

    }

    start() {
        this.startButton.addEventListener("click", (e) => {
            if (!this.startFlag && this.currentPage !== "Main" && this.currentPage !== "Total") {
                this.startButtonText.innerText = "";
                this.startSwitch.classList.add("start__switch_action");
                this.startButton.innerHTML = `<img class="repeat" style="width: 25px" src="./assets/images/replay.jpg"/>`;
                this.startGame(this.model.getCards(this.currentPage));
                this.status = "Play";
                this.startFlag = true;
            } else {
                this.mistakesCount = 0;
                this.makeSound(this.currentAudio);
            }
        });
        this.headerInner.addEventListener('click', (e) => {
            if (this.menuToggle && e.target.classList[0] === "header-inner") {
                this.menuMtn.dispatchEvent(this.event);
            }
        });
        this.main.addEventListener("click", () => {
            if (this.menuToggle) {
                this.menuMtn.dispatchEvent(this.event);
            }
        });
        this.header.addEventListener("click", (elem) => {
            if (this.menuToggle && elem.target.id === "header") {
                this.menuMtn.dispatchEvent(this.event);
            }
        });
        this.switchButton.addEventListener("click", () => {
            if (this.menuToggle) {
                this.menuMtn.dispatchEvent(this.event);
            }
            this.icons = document.querySelectorAll(".pictures__item-subtitle-text");
            this.switchButton.classList.toggle("header__switch-button-active");
            this.swicthBlock.classList.toggle("yellow");
            this.aside.classList.toggle("yellow");
            const pictures = document.querySelectorAll(".pictures__item");
            [...pictures].map(item => item.classList.toggle("pictures__item_yellow"));
            const indicators = document.querySelectorAll(".pictures__item-subtitle-indicator");
            [...indicators].map(item => item.classList.toggle("yellow"));
            const matirealIcons = document.querySelectorAll(".material-icons");
            [...matirealIcons].map(item => item.classList.toggle("hide"));
            if (this.currentPage !== "Main") {
                const titles = document.querySelectorAll(".pictures__item-title");
                [...titles].map(item => item.classList.toggle("hide"));
            }
            this.aside = document.querySelector(".aside");
            [...this.aside.childNodes].map(item => {
                if (item.innerText === this.currentPage) {
                    if (item.classList[1] === "green-text") {
                        item.classList.remove("green-text");
                        item.classList.add("yellow-text");
                    } else {
                        item.classList.add("green-text");
                        item.classList.remove("yellow-text");
                    }
                }
                return item
            });
            if (this.switchText.innerText === "Train") {
                this.switchText.innerText = "Play";
                this.gameField = [0, 1, 2, 3, 4, 5, 6, 7];
                if (this.currentPage !== "Main" && this.currentPage !== "Total") {
                    this.startSwitch.classList.remove("hide");
                }

            } else {
                this.switchText.innerText = "Train";
                this.startFlag = false;
                this.status = "Train";
                this.startButtonText.innerText = "Play";
                this.startSwitch.classList.add("hide");
                this.startSwitch.classList.remove("start__switch_action");
                this.startButton.innerHTML = ``;
                [...document.querySelectorAll(".pictures__item")].map(item => item.classList.remove("selected-card"));
                this.markView.clear();
            }
        });
        this.menuMtn.addEventListener("click", () => {
            this.menuToggle = !this.menuToggle;
            [...this.shortLines].map((item, ind) => {
                item.classList.toggle("white");
                if (ind === 1) {
                    item.classList.toggle("header__menu-line-short_right");
                } else {
                    item.classList.toggle("header__menu-line-short_left");
                }
            });
            this.aside.classList.toggle("aside_left");
            [...this.longLines].map((item, ind) => {
                item.classList.toggle("white");
                if (ind === 1) {
                    item.classList.toggle("header__menu-line-long_left")
                }
            });
        });
        this.picturesBlock.addEventListener("click", (e) => {
            if (this.menuToggle) {
                this.menuMtn.dispatchEvent(this.event);
            }
            if (this.status === "Train") {
                if (e.target.classList[0] === "material-icons") {
                    const cards = document.querySelectorAll(".pictures__item");
                    const elem = [...cards].find(elem => elem.getAttribute("count") === e.target.getAttribute("count"));
                    elem.classList.add("pictures__item_active");
                    elem.nextSibling.classList.add("pictures__item-back_active");

                    function remover() {
                        elem.nextSibling.classList.remove("pictures__item-back_active");
                        elem.classList.remove("pictures__item_active");
                        elem.nextSibling.removeEventListener(remover);
                    }

                    elem.nextSibling.addEventListener("mouseout", remover);
                }
            } else if (this.status === "Play" && !e.target.getAttribute("main")) {
                if (e.target.src && ![...e.target.parentNode.classList].includes("selected-card")) {
                    if (e.target.nextSibling.innerText === this.currentCardInGame) {
                        e.target.parentNode.classList.add("selected-card");
                        this.makeSound("./assets/audio/correct.mp3");
                        this.saveCorrect(this.currentCardInGame);
                        this.markView.display(true);
                        if (this.end) {
                            this.resultView.display(this.mistake, this.mistakesCount);
                            const audio = new Audio();
                            if (this.mistake) {
                                audio.src = "./assets/audio/sad.mp3";
                            } else {
                                audio.src = "./assets/audio/hlop.mp3";
                            }
                            audio.autoplay = true;
                            this.switchButton.dispatchEvent(this.event);
                            [...document.querySelectorAll(".pictures__item")].map(item => item.classList.remove("selected-card"));
                            this.markView.clear();
                            this.mistake = false;
                            this.end = false;
                            this.currentPage = "Main";
                            this.mistakesCount = 0;
                            this.cardsView.display(this.model.getMain(), this.status);
                        } else {
                            this.startGame(this.model.getCards(this.currentPage));
                        }

                    } else {
                        this.markView.display(false);
                        this.makeSound("./assets/audio/error.mp3");
                        this.mistakesCount++;
                        this.saveMistake(this.currentCardInGame);
                        this.mistake = true;
                    }
                }

            }

            if (e.target.getAttribute("main")) {
                if (this.switchButtonText.innerText === "Play") {
                    this.switchButton.dispatchEvent(this.event);
                }
                this.cardsView.display(this.model.getCards(e.target.getAttribute("main")), this.status);
                this.currentPage = e.target.getAttribute("main");
                this.asideView.display(this.model.getMain(), this.currentPage, this.status);
            } else if (this.status === "Train") {
                this.saveClicks(e.target.getAttribute("title"));
                this.makeSound(e.target.getAttribute("audio"));
            }
        });
        this.aside.addEventListener("click", (e) => {
            this.menuMtn.dispatchEvent(this.event);
            if (e.target.classList[0] === "aside_item") {
                if (this.switchButtonText.innerText === "Play") {
                    this.switchButton.dispatchEvent(this.event);
                }
                if (e.target.innerText === "Main") {
                    this.cardsView.display(this.model.getMain(), this.status);
                    [...this.aside.childNodes].map(item => item.classList.remove("yellow-text", "green-text"));
                    if (this.status === "Train") {
                        e.target.classList.add("yellow-text");
                    } else {
                        e.target.classList.add("green-text");
                    }
                    this.currentPage = "Main";
                } else if (e.target.innerText === "Total") {
                    this.cardsView.displayTotal();
                } else {
                    this.cardsView.display(this.model.getCards(e.target.innerText), this.status);
                    this.currentPage = e.target.innerText;
                    [...this.aside.childNodes].map(item => item.classList.remove("yellow-text", "green-text"));
                    if (this.status === "Train") {
                        e.target.classList.add("yellow-text");
                    } else {
                        e.target.classList.add("green-text");
                    }
                }

            }
        });
    }

    makeSound(patch) {
        if (this.gameField.length) {
            const audio = new Audio();
            audio.src = patch;
            audio.autoplay = true;
        }

    }

    startGame(list) {
        if (!this.end) {
            const randomNumber = this.getRandomNum();
            this.makeSound(list[randomNumber].audio);
            this.currentAudio = list[randomNumber].audio;
            this.currentCardInGame = list[randomNumber].title;
            this.gameField = this.gameField.filter(item => item !== randomNumber);
            if (this.gameField.length) {
                this.end = false;
            } else {
                this.end = true;
            }
        }


    }

    getRandomNum() {
        const randomNum = Math.floor(Math.random() * this.gameField.length);
        return this.gameField[randomNum];
    }

    saveCorrect(name) {
        const score = JSON.parse(localStorage.getItem("score"));
        console.log(this.currentPage);
        const newScore = score.map(item => {
                if (item.title === this.currentPage) {
                    item.cards.map(item => {
                            if (item.title === name) {
                                item.correct = item.correct + 1;
                            }
                            return item;
                        }
                    )

                }
                return item;
            }
        );
        localStorage.setItem("score", JSON.stringify(newScore));

    }

    saveMistake(name) {
        const score = JSON.parse(localStorage.getItem("score"));
        const newScore = score.map(item => {
                if (item.title === this.currentPage) {
                    item.cards.map(item => {
                            if (item.title === name) {
                                item.mistakes = item.mistakes + 1;
                            }
                            return item;
                        }
                    )

                }
                return item;
            }
            )
        ;
        localStorage.setItem("score", JSON.stringify(newScore));
    }
    saveClicks(name) {
        const score = JSON.parse(localStorage.getItem("score"));
        const newScore = score.map(item => {
                if (item.title === this.currentPage) {
                    item.cards.map(item => {
                            if (item.title === name) {
                                item.training = item.training + 1;
                            }
                            return item;
                        }
                    )

                }
                return item;
            }
            )
        ;
        localStorage.setItem("score", JSON.stringify(newScore));
    }

}