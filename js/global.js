String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
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
