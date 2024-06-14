// idea calculadora de krunkyrpg

alert('¡Le damos la bienvenida al creador de personajes de KrunkyRpg!');

let charName = getMandatoryPrompt('Por favor, introduzca el nombre de su personaje:', false);

let charPoints = getMandatoryPrompt('Introduzca la cantidad de puntos de la campaña:', true);

let strength = getMandatoryPrompt('Introduzca los puntos a invertir en fuerza:', true);

let agility = getMandatoryPrompt('Introduzca los puntos a invertir en agilidad:', true);

let wisdom = getMandatoryPrompt('Introduzca los puntos a invertir en sabiduría:', true);

let influence = getMandatoryPrompt('Introduzca los puntos a invertir en influencia:', true);

let fortune = getMandatoryPrompt('Introduzca los puntos a invertir en fortuna:', true);

let charDescription = prompt('Describa a su personaje:');

function convertPointsToModifier(points) {

    if (isNaN(points)) { return "+" + 0; };

    let level = parseInt(points / 6);
    let sublevel = points - level * 6;

    if (sublevel == 0) { return "+" + level };

    return "+" + level + "." + sublevel;
};

function getMandatoryPrompt(message, isNumber) {

    let mandatoryPrompt = null;

    if (isNumber) {
        do {
            mandatoryPrompt = parseInt(prompt(message));
        } while (isNaN(mandatoryPrompt));
        return mandatoryPrompt;
    };

    do {
        mandatoryPrompt = prompt(message);
    } while (mandatoryPrompt == null);

    return mandatoryPrompt;
};

let stats = strength + agility + wisdom + influence + fortune;
let isWithinCharPoints = true;
if (charPoints < stats) {
    alert('¡Gastó más puntos de los que tenía!')
    isWithinCharPoints = false;
};

if (isWithinCharPoints) {
    let charSheet = "Este es su personaje: \n\n" +
        charName + "\n" +
        "Puntos de la Campaña: " + charPoints + "\n" +
        "FUE: " + convertPointsToModifier(strength) + "\n" +
        "AGI: " + convertPointsToModifier(agility) + "\n" +
        "SAB: " + convertPointsToModifier(wisdom) + "\n" +
        "INF: " + convertPointsToModifier(influence) + "\n" +
        "FOR: " + convertPointsToModifier(fortune) + "\n" +
        "\nDescription:\n" + charDescription + "\n\n" +
        "¿Desearía guardarlo?";
    if (confirm(charSheet)) {
        alert('ERROR:\nNo tenemos dónde guardarlo.');
    }
};

if (confirm('¿Desea volver al inicio?')) {
    window.location.reload()
};
