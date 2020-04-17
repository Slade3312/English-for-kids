import ConstructorCards from './ConstructorCards';

export default class PlayMode extends ConstructorCards {
    constructor(arr) {
        super(arr);
        super.play;        
        this.playCards = [];
        this.click = 0;
        this.randomCard = {};
        this.errorCard = [];
    }

    cardDisplay(data_id, CONTAINER) {
        this.playCards = [];
        const arr = super._currentCards(data_id);
        const wrapper_card = document.createElement('div');
        wrapper_card.classList.add('wrapper-card');
        arr.forEach((el) => {
            this.playCards.push(el);
            wrapper_card.append(super._constructorCard(el));
        })
        if (this.play) {
            const button_play = document.createElement('button');
            button_play.classList.add('button-play');
            wrapper_card.append(button_play);
            this.click = 0;
        }
        CONTAINER.append(wrapper_card);


    }

    playGame(know) {
        
        if (this.click === 0) {
            this._audioPlay();
        }
        if (this.click > 0 && know === false) {
            const srcAudio = this.randomCard.audioSrc;
            this._replay(srcAudio);
        }
        if (know === true) {
            const word = this.randomCard.word;
            const new_playCards = this.playCards.filter(card => card.word != word);
            this.playCards = new_playCards;
            if (this.playCards.length === 0) {                
                return;
            }
            this._audioPlay();
        }
        return this.randomCard;
    }

    _audioPlay() {
        this.randomCard = this._random_card();
        const srcAudio = this.randomCard.audioSrc;
        this._replay(srcAudio);
        this.click++;
    }

    _random_card() {
        const num = Math.floor(Math.random() * Math.floor(this.playCards.length));
        return this.playCards[num];
    }
    _replay(srcAudio) {
        const audio = new Audio();
        audio.src = `${srcAudio}`;
        audio.autoplay = true;
    }






}