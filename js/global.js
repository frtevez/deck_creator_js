String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

function cleanFileInput(input) {

    return input.files[0].name;
};

function validateWord(word) {
    const allowedChars = 'abcdefghijklmnñopqrstuvwxyz ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    if (word == '') {
        return false;
    }
    if (word.charAt(word.length - 1) == ' ') {
        return false;
    }
    for (let i = 0; i < word.length; i++) {
        if (!allowedChars.includes(word[i])) {
            return false;
        }
    }
    return true;
};

function addPropertyToConstructor(newProperty, constructorClass) {
    constructorClass.prototype[newProperty] = null;
};

function showErrorToast(error) {

    Toastify({
        text: error,
        duration: 2000,
        style: {
            background: "#EE4444",
            opacity: 0.9,
            borderRadius: '15px'
        },
    }).showToast();
};
