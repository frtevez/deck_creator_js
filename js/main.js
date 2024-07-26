class CardStructure {
    constructor(title, subtitle, caption, description, type, art, sideAttributes, midAttributes, listAttributes, listIconAttributes) {
        this.title = title;
        this.subtitle = subtitle;
        this.caption = caption;
        this.description = description;
        this.type = type;
        this.art = art;
        this.sideAttributes = sideAttributes;
        this.midAttributes = midAttributes;
        this.listAttributes = listAttributes;
        this.listIconAttributes = listIconAttributes;
    };

    set(property, value) {
        this[property] = value;
    };
};


let cardPreview = new CardStructure();

let deck = JSON.parse(sessionStorage.getItem("deck")) || [];

console.log(deck);

const deckContainer = document.querySelector('#deck');

const cardSubmitter = document.querySelector('#card-submitter');

const newAttributeOptions = document.querySelector('#new-attribute-options');

newAttributeOptions.addEventListener('change', (e) => {

    let checkedOption = document.querySelector('input[name=option]:checked').id;

});

const updateCardAttributeInputs = () => {
    let cardAttributeInputs = document.querySelectorAll('.card-attribute-input');
    cardAttributeInputs.forEach(attributeInput => {

        
        let cardField = document.querySelector(`.card-field[name=${attributeInput.name}]`);
        attributeInput.addEventListener('input', (event) => {

            cardPreview.set(attributeInput.name, event.target.value);
            
            cardField.innerHTML = event.target.value;
        });

    });
};
updateCardAttributeInputs();

const updateDeck = () =>{
    deck.forEach(card => {
        
        let cardTemplate = document.querySelector('#template-card');
        // console.log(cardTemplate);
        for (let property in card) {
            // console.log(property);
        
        };
    });
    sessionStorage.setItem('deck', JSON.stringify(deck))
};

cardSubmitter.addEventListener('submit', (e) => {
    e.preventDefault();
    
    deck.push({...cardPreview});
    
    updateDeck()
});


