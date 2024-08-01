
let cardPreview = new CardStructure();

let deck = JSON.parse(sessionStorage.getItem("deck")) || [];

console.log(deck);

const deckContainer = document.querySelector('#deck');

const updateCardAttributeInputs = () => {
    let cardAttributeInputs = document.querySelectorAll('.card-attribute-input');
    cardAttributeInputs.forEach(attributeInput => {

        // console.log(attributeInput.name);
        let cardField = document.querySelector(`.card-field[name=\"${attributeInput.name}\"]`);
        // console.log(cardField);
        attributeInput.addEventListener('input', (event) => {

            cardPreview.set(attributeInput.name, event.target.value);
            cardField.innerHTML = event.target.value;
        });

    });
};
updateCardAttributeInputs();

const updateDeck = () => {
    deck.forEach(card => {

        let cardTemplate = document.querySelector('#template-card');
        // console.log(cardTemplate);
        for (let property in card) {
            // console.log(property);
        };
    });
    sessionStorage.setItem('deck', JSON.stringify(deck))
};

const cardSubmitter = document.querySelector('#card-submitter');
cardSubmitter.addEventListener('submit', (e) => {
    e.preventDefault();

    deck.push({ ...cardPreview });
    updateDeck();
});

const newAttributeField = document.querySelector('#new-attribute-field');
let checkedOption = parseInt(document.querySelector('input[name=\'option\']:checked').id.slice(6) - 1);

const newAttributeOptions = document.querySelector('#new-attribute-options');
newAttributeField.innerHTML = options[checkedOption];
newAttributeOptions.addEventListener('change', (event) => {

    checkedOption = parseInt(event.target.id.slice(6) - 1);
    newAttributeField.innerHTML = options[checkedOption];
});


const cardInputs = document.querySelector("#card-creator-inputs");
const insertNewAttribute = input => {

    addPropertyToConstructor(input.value, CardStructure);

    let inputLabel = input.value;
    let inputName = input.value;

    if (input.type == 'file') {
        inputName = cleanFileInput(input)
        inputLabel = `<img src="${URL.createObjectURL(input.files[0])}" style="height: 30px; width:30px; object-fit: cover"></img>`
    }
    else {
        inputLabel = `${input.value.capitalizeFirstLetter()}:`;
    }

    cardInputs.innerHTML += `
        <li>
        <label>${inputLabel}</label>
        <input type="text" class="text-inputs card-attribute-input" name="${inputName}">
        </li>`;

    let newFieldContainer = document.querySelector(`.${input.name}`);
    newFieldContainer.innerHTML += `
        <li class="card-listed-attribute">
            <label style="margin-right:4px">${inputLabel}</label>    
            <p class="card-field" name="${inputName}"></p>
        </li>`;
};

const attributeSubmitter = document.querySelector("#attribute-submitter");
attributeSubmitter.addEventListener('submit', event => {

    event.preventDefault();
    event.target.querySelectorAll('#new-attribute-field>input').forEach(input => {

        input.type != 'text' || (input.value = input.value.toLowerCase());

        if (input.value in CardStructure.prototype) {
            showErrorToast('This attribute already exists!');
            return;
        };

        if (!validateWord(input.value) && input.type == 'text') {
            showErrorToast('Invalid characters. Only letters allowed!');
            return;
        };
        insertNewAttribute(input);
    });
    updateCardAttributeInputs();
});