// Creador de mazo


let userStats = [];
let cards = [];

class CardStructure {
    constructor(id, name, description) {
        this.Id = id;
        this.Name = name;
        this.Description = description;
    };

    readCard() {
        const cardLine = '______________________________________________________________________\n';
        let cardData = cardLine;
        for (let property in this) {
            if (property == 'Id') {
                continue;
            };
            if (property == 'Name') {
                cardData += `${this[property]}\n`;
                cardData += cardLine;
                continue;
            };
            cardData += `${property}: ${this[property]}\n`;
        }
        return cardData + cardLine;
    }

};

function createStat() {
    let newStat = prompt('Enter a stat name:');
    if (newStat == '' || newStat == null) {
        return false;
    };
    CardStructure.prototype[newStat] = 'User Stat';
    userStats.push(newStat);
    return true;
};

function createCard(i) {
    let cardName = prompt('Enter a card\'s name:');
    if (cardName == '' || cardName == null) {
        return false;
    };
    let cardDescription = prompt('Enter the card\'s description:');
    let card = new CardStructure(i, cardName, cardDescription);
    userStats.forEach((stat) => {
        card[stat] = prompt('Insert this card\'s ' + stat + ' value:');
    });
    cards.push(card);
    return true;
};

function createDeck() {
    for (let i = 0; Infinity; i++) {

        if (!createStat()) {
            break;
        };
    };

    for (let i = 0; Infinity; i++) {

        if (!createCard(i)) {
            break;
        };
    };
};

function sortCards() {
    cards.sort((a, b) => {
        if (a.Name > b.Name) {
            return 1;
        };
        if (a.Name < b.Name) {
            return -1;
        }
        return 0;
    });
}

function displayDeck() {
    let deck = '';
    for (let card in cards) {
        deck += `${cards[card].readCard()}\n`;
    };
    return deck;
};



alert('Welcome to the deck creator.');
alert('You will first be asked to name your custom cards\' stats.\nThen you will be asked to fill in all the individual cards\' details.');
alert('If you wish to stop creating new stats or cards, do not fill in the next stat name or card name.');

createDeck();
sortCards();
alert('Here\'s your custom deck of cards:\n' + displayDeck());