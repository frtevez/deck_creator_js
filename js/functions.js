
let deck = JSON.parse(sessionStorage.getItem("deck")) || [];
let deckStyle = JSON.parse(sessionStorage.getItem("deckStyle")) || {};

let cardPreview = new CardStructure();
let cardTemplate = document.querySelector('#template-card');

const deckContainer = document.querySelector('#deck');

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

const updateCard = (card, index) => {
    for (let property in card) {

        propertyInDOM = document.querySelector(`#card${index} [name=\"${property}\"]`);
        cardInDOM = document.querySelector(`#card${index}`);

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