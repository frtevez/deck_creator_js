class CardStructure {
    constructor(title, subtitle, caption, description, type, art, sideIconAttributes, midIconAttributes, listAttributes, listIconAttributes) {
        this.title = title;
        this.subtitle = subtitle;
        this.caption = caption;
        this.description = description;
        this.type = type;
        this.art = art;
        this.sideIconAttributes = sideIconAttributes;
        this.midIconAttributes = midIconAttributes;
        this.listAttributes = listAttributes;
        this.listIconAttributes = listIconAttributes;
    };

    set(property, value) {
        this[property] = value;
    };
};
