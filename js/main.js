// Creador de mazo


let userStats = [];
let cards = [];

class CardStructure {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    };

};

function createStat() {
    let newStat = prompt('Enter a stat name:');
    if (newStat == '' || newStat == null) {
        return false;
    }
    CardStructure.prototype[newStat] = 'User Stat';
    userStats.push(newStat);
    return true;
};

function createCard(i) {
    let cardName = prompt('Enter a card\'s name:');
    if (cardName == '' || cardName == null) {
        return false;
    }
    let cardDescription = prompt('Enter the card\'s description:')
    let card = new CardStructure(i, cardName, cardDescription);
    userStats.forEach((stat) => {
        card[stat] = prompt('Insert this card\'s ' + stat + ' value:')
    })
    cards.push(card);
    return true;
};

function createDeck() {
    for (let i = 0; Infinity; i++) {

        if (!createStat()) {
            break
        }
    }

    for (let i = 0; Infinity; i++) {

        if (!createCard(i)) {
            break
        }
    }
    console.log(cards);
};

function displayCard() {
    
};

alert('Welcome to the deck creator.');
alert('You will first be asked to name your custom cards\' stats.\nThen you will be asked to fill in all the individual cards\' details.');
alert('If you wish to stop creating new stats or cards, do not fill in the next stat name or card name.');

createDeck();