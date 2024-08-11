
let deck = JSON.parse(sessionStorage.getItem("deck")) || [];
let deckStyle = JSON.parse(sessionStorage.getItem("deckStyle")) || {};
let insertedAttributes = JSON.parse(sessionStorage.getItem("insertedAttributes")) || {}

let cardPreview = new CardStructure();
let cardTemplate = document.querySelector('#template-card');
const initialAttributes = { title: '', subtitle: '', caption: '', description: '', type: '', art: '' }

const deckContainer = document.querySelector('#deck');

const artDisplayStyle = () => {

    // setTimeout to give browser time to compute style
    setTimeout(() => {

        let artIsBackground = (getComputedStyle(document.documentElement).getPropertyValue("--art-is-background") === 'true')
        let deckStyleBackgroundImage = getComputedStyle(document.documentElement).getPropertyValue(document.querySelector('.deck-style-input[id="card-background-art"]').name)
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
            card.style.backgroundImage = deckStyleBackgroundImage
            imgElement.style.visibility = "visible"
        })
    }, 0)
}

const loadDeckStyle = () => {
    if (JSON.parse(sessionStorage.getItem("deckStyle")) == '') { return }

    for (let property in deckStyle) {
        cssRoot.setProperty(property, deckStyle[property])
    }
}

const updateDeckStyle = () => {
    sessionStorage.setItem('deckStyle', JSON.stringify(deckStyle));
    artDisplayStyle()
}

const getAttributeParameters = (input) => {

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

const loadInsertedAttribute = (attribute, card, value) => {

    let label = attribute.inputLabel;
    let name = attribute.inputName;
    let attributeListCategory = attribute.attributeListCategory;

    let newFieldContainer = card.querySelector(`.${attributeListCategory}`);
    newFieldContainer.innerHTML += `
        <li class="card-listed-attribute">
            <label style="margin-right:4px">${label}</label>    
            <p class="card-field" name="${name}">${value}</p>
        </li>`;
}

const updateCard = (card, index) => {
    for (let attribute in card) {

        let attributeInDOM = document.querySelector(`#card${index} [name=\"${attribute}\"]`);
        let cardInDOM = document.querySelector(`#card${index}`);

        let isInInitialAttributes = (attribute in initialAttributes)
        if (!isInInitialAttributes) {
            loadInsertedAttribute(
                insertedAttributes[attribute],
                cardInDOM,
                card[attribute])
            continue
        }
        if (attributeInDOM == null) { continue };
        if (attribute == "art") {
            attributeInDOM.src = card[attribute]
            return
        }
        attributeInDOM.innerHTML = card[attribute];
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

const cardInputs = document.querySelector("#card-creator-inputs");
const insertNewAttribute = (input, card) => {

    let attributeParameters = getAttributeParameters(input)
    let label = attributeParameters.inputLabel;
    let name = attributeParameters.inputName;

    cardPreview.set(name, '')
    insertedAttributes[name] = attributeParameters
    sessionStorage.setItem('insertedAttributes', JSON.stringify(insertedAttributes));

    cardInputs.innerHTML += `
        <li>
        <label>${label}</label>
        <input type="text" class="text-inputs card-attribute-input" name="${name}">
        </li>`;

    loadInsertedAttribute(attributeParameters, card, '')
};

const reloadDeck = () => {
    document.querySelectorAll('.card:not(#template-card)').forEach(card => card.remove())
    updateDeck()
}

const removeCard = (cardId) => {
    console.log(cardId);
    
    let cardIndex = cardId.slice(4)
    deck.splice(cardIndex, 1)
    reloadDeck()
}

