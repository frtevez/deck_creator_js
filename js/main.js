class CardStructure {
    constructor(id, name, description, type, art, sideAttributes, midAttributes, listAttributes, listIconAttributes) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.art = art;
        this.sideAttributes = sideAttributes;
        this.midAttributes = midAttributes;
        this.listAttributes = listAttributes;
        this.listIconAttributes = listIconAttributes;
    };

    set(property, value){
        this[property] = value;
    };
}

let cardPreview = new CardStructure()


