import validator from 'validator';

const productValidator = {

    fieldsCfg : {
        "title" : {
            fieldName : 'titulo',
            minLength : 10,
            maxLength : 256
        },

        "description" : {
            fieldName : 'descripción',
            minLength : 10,
            maxLength : 256
        },
        "category" : {
            fieldName : 'categoría',
            minLength : 5,
            maxLength : 32
        },
        "img" : {
            fieldName : "imagen",
            minLength : 10,
            maxLength : 256
        },
        "price" : {
            fieldName : "precio",
            minValue : 1
        }
    },

    validateProduct(product) {
        const {title, description, category, price, img} = product;

        this.validateStringField(title, "title");
        this.validateStringField(description, "description");
        this.validateStringField(category, "category");
        this.validateStringField(img, "img");

        this.validateNumberField(price, "price");
    },

    validateStringField(content, field) {
        const {fieldName, minLength, maxLength} = this.fieldsCfg[field];
        

        if (!content || validator.isEmpty(content.trim())) {
            throw new Error(`El campo "${fieldName}" es obligatorio.`);
        } 

        if (!validator.isLength(content.trim(), { min: minLength, max: maxLength })) {
            throw new Error(`El campo "${fieldName}" debe tener entre ${minLength} y ${maxLength} caracteres.`);
        }
    },

    validateNumberField(content, field) {
        const {fieldName, minValue} = this.fieldsCfg[field];

        if (!content || !validator.isNumeric(String(content))) {
            throw new Error(`El campo ${fieldName} es obligatorio.`);
        }

        if (content < minValue) { // parseamos para asegurarnos de que es un datatype float/number
            throw new Error(`El campo ${fieldName} debe tener un valor mayor a ${minValue}.`);
        };
    }
};

export default productValidator;