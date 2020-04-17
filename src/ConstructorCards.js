export default class ConstructorCards {
    constructor(arr) {
        this.menu = arr[0];
        this.cards = arr.slice(0, arr.length);
        this.play = false;        
    }


    menuDisplay(CONTAINER) {
        const wrapper_menu = document.createElement('div');
        wrapper_menu.classList.add('wrapper-menu');
        this.menu.forEach((el) => {
            wrapper_menu.append(this._constructorMenuDisplay(el));
        })
        CONTAINER.append(wrapper_menu);
        const menu_burger_home = document.querySelector('.wrapper-menu-burger > a');
        menu_burger_home.classList.add('active-burger');
        if (this.play) {
            const menu_cards = document.querySelectorAll('.menu-card');
            menu_cards.forEach((card) => {
                card.classList.add('active-menu-card');
            })
        }
    }

    menuBurger(CONTAINER) {
        const wrapper_menu_burger = document.createElement('ul');
        const home_menu = document.createElement('a');
        home_menu.classList.add('menu-card-burger');
        home_menu.setAttribute('data-id', 'Home');
        home_menu.append('Home');
        wrapper_menu_burger.append(home_menu);
        wrapper_menu_burger.classList.add('wrapper-menu-burger');
        this.menu.forEach((el) => {
            wrapper_menu_burger.append(this._constructorMenuBurger(el));
        })
        CONTAINER.append(wrapper_menu_burger);
    }

    cardDisplay(data_id, CONTAINER) {
        const arr = this._currentCards(data_id);
        const wrapper_card = document.createElement('div');
        wrapper_card.classList.add('wrapper-card');
        arr.forEach((el) => {
            wrapper_card.append(this._constructorCard(el));
        })
        if (this.play) {
            const button_play = document.createElement('div');
            button_play.classList.add('button-play');
            button_play.innerHTML = 'Start Play';
            wrapper_card.append(button_play);
        }
        CONTAINER.append(wrapper_card);


    }

    _constructorCard({ word, translation, image, audioSrc }) {
        const card = document.createElement('div');
        const card_front = document.createElement('div');
        const footer_card_front = document.createElement('div');
        if (this.play == false) {
            const span_front = document.createElement('span');
            const rotate = document.createElement('div');
            const card_back = document.createElement('div');
            const footer_card_back = document.createElement('div');
            const span_back = document.createElement('span');
            footer_card_front.classList.add('footer-card');
            span_front.classList.add('text-card');
            rotate.classList.add('rotate');
            card_back.classList.add('card-back');
            footer_card_back.classList.add('footer-card');
            span_back.classList.add('text-card');
            span_front.innerHTML = word;
            footer_card_front.append(span_front);
            footer_card_front.append(rotate);
            card_front.append(footer_card_front);
            span_back.innerHTML = translation;
            footer_card_back.append(span_back);
            card_back.append(footer_card_back);
            card_back.style = `background-image: url(${image});`;
            card.append(card_back);
        }
        card.classList.add('card');
        card.setAttribute('data-audio', `${audioSrc}`);
        card.setAttribute('data-word', `${word}`);
        card_front.classList.add('card-front');
        card_front.style = `background-image: url(${image});`;
        card.append(card_front);
        return card;
    }

    _constructorMenuDisplay(el) {
        const link = document.createElement('a');
        const img = document.createElement('img');

        link.classList.add('menu-card');
        link.setAttribute('data-id', `${el}`);
        img.setAttribute('src', 'assets/img/dive.jpg');
        img.setAttribute('alt', `${el}`);

        link.append(img);
        link.append(`${el}`);

        return link;
    }

    _constructorMenuBurger(el) {
        const link = document.createElement('a');
        link.classList.add('menu-card-burger');
        link.setAttribute('data-id', `${el}`);
        link.append(`${el}`);

        return link;
    }

    _currentCards(nameMenu) {
        let index = this.menu.findIndex((el) => {
            if (el === nameMenu) return true
        });
        return this.cards[index + 1];
    }
}