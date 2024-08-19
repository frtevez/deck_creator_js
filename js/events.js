const cardSubmitter = document.querySelector('#card-submitter');
cardSubmitter.addEventListener('submit', (e) => {
    e.preventDefault();

    deck.push({ ...cardPreview });
    updateDeck(false);
});

fetch('./res/json/attributeOptions.json')
    .then(response => response.json())
    .then(options => {

        const newAttributeField = document.querySelector('#new-attribute-field');
        let checkedOption = parseInt(document.querySelector('input[name=\'option\']:checked').id.slice(6) - 1);
        const newAttributeOptions = document.querySelector('#new-attribute-options');

        newAttributeField.innerHTML = options[checkedOption];
        newAttributeOptions.addEventListener('change', (event) => {

            checkedOption = parseInt(event.target.id.slice(6) - 1);
            newAttributeField.innerHTML = options[checkedOption];
        });
    })

const attributeSubmitter = document.querySelector("#attribute-submitter");
attributeSubmitter.addEventListener('submit', event => {

    event.preventDefault();
    event.target.querySelectorAll('#new-attribute-field>input').forEach(input => {

        input.type != 'text' || (input.value = input.value.toLowerCase());

        if (input.value in CardStructure.prototype) {
            showErrorToast('This attribute already exists!');
            return;
        };

        if (input.value == "") {
            showErrorToast('Invalid! You cannot submit empty attributes!');
            return;
        };

        if (!validateWord(input.value) && input.type == 'text') {
            showErrorToast('Invalid characters. Only letters allowed!');
            return;
        };
        insertNewAttribute(input, cardTemplate);
    });
    updateCardAttributeInputs();
});


document.querySelectorAll('.deck-style-input').forEach(input => {

    if (input.name == "--art-is-background") {

        input.addEventListener('click', (event) => {

            deckStyle[input.name] = event.target.value;
            updateDeckStyle();
            artDisplayStyle();
        })
        return
    }
    if (input.type == "button") {
        input.addEventListener("click", event => {

            let propertyValue = event.target.value;

            deckStyle[input.name] = propertyValue;

            cssRoot.setProperty(input.name, propertyValue);

            artDisplayStyle();
            updateDeckStyle();
        })
        return
    }

    input.addEventListener('input', (event) => {

        let propertyValue = event.target.value;

        event.target.type != 'file' || (propertyValue = `url(${URL.createObjectURL(event.target.files[0])})`);

        deckStyle[input.name] = propertyValue;

        cssRoot.setProperty(input.name, propertyValue);
        artDisplayStyle();
        updateDeckStyle();
    })
})

deckContainer.addEventListener('click', event => {

    element = event.target

    while (element && !element.classList.contains('card')) {
        element = element.parentElement
    }

    if (element) {
        removeCard(element.id);
        event.stopPropagation()
    }

})

document.querySelector('#reset-to-default').addEventListener('click', event => {
    sessionStorage.clear();
    window.location.reload();
})