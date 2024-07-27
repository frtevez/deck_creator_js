
let cardPreview = new CardStructure();

let deck = JSON.parse(sessionStorage.getItem("deck")) || [];

console.log(deck);

const deckContainer = document.querySelector('#deck');

const cardSubmitter = document.querySelector('#card-submitter');
const cardInputs = document.querySelector("#card-creator-inputs");

const newAttributeOptions = document.querySelector('#new-attribute-options');

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

const newAttributeField = document.querySelector('#new-attribute-field');
let checkedOption = parseInt(document.querySelector('input[name=option]:checked').id.slice(6) - 1);

newAttributeField.innerHTML = options[checkedOption];
newAttributeOptions.addEventListener('change', (event) => {

    checkedOption = parseInt(event.target.id.slice(6) - 1);
    newAttributeField.innerHTML = options[checkedOption];
});

const attributeSubmitter = document.querySelector("#attribute-submitter");
attributeSubmitter.addEventListener('submit', event => {

    event.preventDefault()
    event.target.querySelectorAll('div>input').forEach(input => {

        cardInputs.innerHTML += `
        <li>
        <label>${input.value}:</label>
        <input type="text" id="input-card-" class="text-inputs card-attribute-input" name="title">
        </li>
        `
    })
})