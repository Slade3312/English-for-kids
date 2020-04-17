import './styles/style.css';
import cards from './cards';
import ConstructorCards from './ConstructorCards';
import PlayMode from './PlayMode';
export const APP_CONTAINER = document.querySelector('.app-container');

const playMode = new PlayMode(cards);
const constructorCards = new ConstructorCards(cards);
const menu_toggle = document.querySelector('.menuToggle');
const main_menu = document.querySelector('.main-menu');
const input_play = document.querySelector('#payt4');
const stars = document.querySelector('.stars');
const audio = new Audio();
constructorCards.menuBurger(main_menu);
constructorCards.menuDisplay(APP_CONTAINER);
actionsMenu();
const menu_burger = document.querySelectorAll('.wrapper-menu-burger > a');


input_play.addEventListener('click', () => {
    constructorCards.play = input_play.checked;
    playMode.play = input_play.checked;
    menu_burger.forEach((el_burger) => {
        let data_id = el_burger.getAttribute('data-id');
        if (el_burger.classList.contains('active-burger')) {
            if (data_id === 'Home') {
                APP_CONTAINER.childNodes[5].remove();
                constructorCards.menuDisplay(APP_CONTAINER);
                el_burger.classList.add('active-burger');
                actionsMenu();
            }
            else {
                APP_CONTAINER.childNodes[5].remove();
                playMode.cardDisplay(data_id, APP_CONTAINER);
                activeButton();
                el_burger.classList.add('active-burger');
                if (constructorCards.play) { }
                else actionsCard();
            }
        }
    })
})

menu_toggle.addEventListener('click', () => {
    main_menu.classList.toggle('activ-menu');
    menu_toggle.classList.toggle('active-span');
})

menu_burger.forEach((el_burger) => {
    el_burger.addEventListener('click', () => {
        let data_id = el_burger.getAttribute('data-id');
        if (data_id === 'Home') {
            menu_burger.forEach((el_burger) => el_burger.classList.remove('active-burger'));
            el_burger.classList.add('active-burger');
            APP_CONTAINER.childNodes[5].remove();
            constructorCards.menuDisplay(APP_CONTAINER);
            actionsMenu();
            burgerDeactivate();
        }
        else {
            menu_burger.forEach((el_burger) => el_burger.classList.remove('active-burger'));
            el_burger.classList.add('active-burger');
            APP_CONTAINER.childNodes[5].remove();
            playMode.cardDisplay(data_id, APP_CONTAINER);
            activeButton();
            burgerDeactivate();
            if (constructorCards.play) { }
            else actionsCard();
        }
    })
})



function actionsMenu() {
    const active_menu_card = document.querySelectorAll('.wrapper-menu > a');
    stars.innerHTML = '';
    active_menu_card.forEach((card_menu) => {
        let data_id = card_menu.getAttribute('data-id');
        card_menu.addEventListener('click', () => {
            APP_CONTAINER.childNodes[5].remove();
            playMode.cardDisplay(data_id, APP_CONTAINER);
            activeButton();
            burgerDeactivate();
            if (constructorCards.play) { }
            else actionsCard();
            main_menu.classList.remove('activ-menu');
            menu_burger.forEach((el_burger) => {
                if (el_burger.getAttribute('data-id') === data_id) {
                    el_burger.classList.add('active-burger');
                }
                else el_burger.classList.remove('active-burger');
            })
        })
    })
}
function actionsCard() {
    const active_cards = document.querySelectorAll('.card');
    active_cards.forEach((card) => {
        const card_front = card.querySelector('.card-front');
        const card_back = card.querySelector('.card-back');
        card.addEventListener('click', (event) => {
            burgerDeactivate();
            if (event.target.classList.contains('rotate')) {
                card_front.classList.add('card-front-active');
                card_back.classList.add('card-back-active');
                return;
            }
            const srcAudio = card.getAttribute('data-audio');
            audio.src = `${srcAudio}`;
            audio.autoplay = true;
        })
        card.addEventListener('mouseleave', () => {
            burgerDeactivate();
            card_front.classList.remove('card-front-active');
            card_back.classList.remove('card-back-active');
        })
    })
}

function burgerDeactivate() {
    main_menu.classList.remove('activ-menu');
    menu_toggle.classList.remove('active-span');
}

function activeButton() {
    const button_play = document.querySelector('.button-play');
    const active_cards = document.querySelectorAll('.card');
    stars.innerHTML = '';
    let currentCard = {};
    if (button_play) {

        button_play.addEventListener('click', () => {
            button_play.classList.add('play-active');
            currentCard = playMode.playGame(false);
        });
        active_cards.forEach((card) => {
            const data_word = card.getAttribute('data-word');
            card.addEventListener('click', () => {
                if (data_word === currentCard.word) {
                    audio.src = `assets/audio/correct.mp3`;
                    audio.autoplay = true;
                    const star = document.createElement('div');
                    star.classList.add('star');
                    star.style = 'background-image: url(assets/img/star-win.svg);';
                    stars.append(star);
                    card.classList.add('card-inactive');
                    setTimeout(() => { currentCard = playMode.playGame(true) }, 1000)
                    if (playMode.playCards.length === 1) {
                        finishGame();
                    }

                }
                else {
                    audio.src = `assets/audio/error.mp3`;
                    audio.autoplay = true;
                    playMode.errorCard.push(currentCard);
                    const star = document.createElement('div');
                    star.classList.add('star');
                    star.style = 'background-image: url(assets/img/star.svg);';
                    stars.append(star);
                }
            })
        })
    }
    return
}

function finishGame() {
    const finWindow = document.createElement('div');
    const text = document.createElement('div');
    finWindow.classList.add('finWindow');
    text.classList.add('text-fin');
    const error = playMode.errorCard.length;
    APP_CONTAINER.childNodes[5].remove();
    if (error === 0) {
        text.innerHTML = 'WIN';
        finWindow.append(text);
        finWindow.style = 'background-image: url(assets/img/success.jpg);';
        APP_CONTAINER.append(finWindow);
        audio.src = `assets/audio/success.mp3`;
        audio.autoplay = true;
        setTimeout(() => { gohome() }, 3000);
    }
    else {
        text.innerHTML = `ERROR ${error}`;
        finWindow.append(text);
        finWindow.style = 'background-image: url(assets/img/failure.jpg);';
        APP_CONTAINER.append(finWindow);
        audio.src = `assets/audio/failure.mp3`;
        audio.autoplay = true;
        setTimeout(() => { gohome() }, 3000);
    }


}

function gohome() {
    playMode.errorCard = [];
    input_play.click();
    APP_CONTAINER.childNodes[5].remove();
    constructorCards.menuDisplay(APP_CONTAINER);
    actionsMenu();
}

// if (playMode.errorCard.includes(currentCard) != true) {
//     playMode.errorCard.push(currentCard);
// }









