
let deck = JSON.parse(sessionStorage.getItem("deck")) || [];
let deckStyle = JSON.parse(sessionStorage.getItem("deckStyle")) || {};
let insertedAttributes = JSON.parse(sessionStorage.getItem("insertedAttributes")) || {}

let cardPreview = new CardStructure();
let cardTemplate = document.querySelector('#template-card');
const initialAttributes = { title: '', subtitle: '', caption: '', description: '', type: '', art: '' }



const deckContainer = document.querySelector('#deck');

const getFromAttributeInput = (input) => {

    let inputLabel = input.value;
    let inputName = input.value;
    let inputValue = input.value
    let attributeListCategory = input.name

    if (input.type == 'file') {
        inputName = cleanFileInput(input)
        inputLabel = `<img src="${URL.createObjectURL(input.files[0])}" style="height: 30px; width:30px; object-fit: cover"></img>`
    }
    else {
        inputLabel = `${input.value.capitalizeFirstLetter()}:`;
    }

    return { inputLabel, inputName, inputValue, attributeListCategory }
}

const artDisplayStyle = () => {

    // setTimeout to give browser time to compute style
    setTimeout(() => {

        let artIsBackground = (getComputedStyle(document.documentElement).getPropertyValue("--art-is-background") === 'true')
        if (artIsBackground) {
            document.querySelectorAll("article.card").forEach(card => {

                let imgElement = card.querySelector(`#card-art-container img`)
                card.style.backgroundImage = `url(${imgElement.src})`
                imgElement.style.visibility = "hidden"
            })
            return
        }
        document.querySelectorAll("article.card").forEach(card => {
            let imgElement = card.querySelector(`#card-art-container img`)
            card.style.backgroundImage = "none"
            imgElement.style.visibility = "visible"
        })
    }, 0)
}

const updateCardAttributeInputs = () => {

    let cardAttributeInputs = document.querySelectorAll('.card-attribute-input');
    cardAttributeInputs.forEach(attributeInput => {

        let cardField = document.querySelector(`#template-card .card-field[name=\"${attributeInput.name}\"]`);
        attributeInput.addEventListener('input', (event) => {

            let input = event.target;

            if (input.type == 'file') {
                let file = URL.createObjectURL(input.files[0]);
                cardPreview.set(attributeInput.name, file);
                cardField.src = file;
                artDisplayStyle()
                return;
            }

            cardPreview.set(attributeInput.name, input.value);
            cardField.innerHTML = input.value;
        });
    });
};

const loadAttribute = (attribute, card, value) => {

    let inputLabel = attribute.inputLabel;
    let inputName = attribute.inputName;
    let attributeListCategory = attribute.attributeListCategory;

    let newFieldContainer = card.querySelector(`.${attributeListCategory}`);
    newFieldContainer.innerHTML += `
        <li class="card-listed-attribute">
            <label style="margin-right:4px">${inputLabel}</label>    
            <p class="card-field" name="${inputName}">${value}</p>
        </li>`;
}

const updateCard = (card, index) => {
    for (let property in card) {

        propertyInDOM = document.querySelector(`#card${index} [name=\"${property}\"]`);
        cardInDOM = document.querySelector(`#card${index}`);

        let isInInitialAttributes = (property in initialAttributes)
        if (!isInInitialAttributes) {
            loadAttribute(
                insertedAttributes[property],
                cardInDOM,
                card[property])
            continue
        }
        if (propertyInDOM == null) { continue };
        if (property == "art") {
            propertyInDOM.src = card[property]
            return
        }
        propertyInDOM.innerHTML = card[property];
    };
}

const updateDeck = () => {
    deck.forEach((card, index) => {

        if (document.querySelector(`#card${index}`) != null) { return };

        let newCard = cardTemplate.cloneNode(true)
        newCard.id = `card${index}`

        deckContainer.appendChild(newCard)
        updateCard(card, index)
    });
    sessionStorage.setItem('deck', JSON.stringify(deck))
    updateCardAttributeInputs()
};

const loadDeckStyle = () => {
    if (JSON.parse(sessionStorage.getItem("deckStyle")) == '') { return }

    for (let property in deckStyle) {
        cssRoot.setProperty(property, deckStyle[property])
    }
}

const updateDeckStyle = () => {
    sessionStorage.setItem('deckStyle', JSON.stringify(deckStyle));
}

const cardInputs = document.querySelector("#card-creator-inputs");
const insertNewAttribute = (input, card) => {

    let inputParameters = getFromAttributeInput(input)
    let inputLabel = inputParameters.inputLabel;
    let inputName = inputParameters.inputName;

    cardPreview.set(inputName, '')
    insertedAttributes[inputName] = inputParameters

    sessionStorage.setItem('insertedAttributes', JSON.stringify(insertedAttributes));


    cardInputs.innerHTML += `
        <li>
        <label>${inputLabel}</label>
        <input type="text" class="text-inputs card-attribute-input" name="${inputName}">
        </li>`;

    loadAttribute(inputParameters, card, '')
};