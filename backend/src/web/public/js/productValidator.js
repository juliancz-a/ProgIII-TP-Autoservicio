// frontend/validators/productValidator.js
const productValidator = {
  fieldsCfg: {
    "title": {
        fieldName: 'título',
        minLength: 10,
        maxLength: 256
    },
    "description": {
        fieldName: 'descripción',
        minLength: 10,
        maxLength: 256
    },
    "category": {
        fieldName: 'categoría',
        minLength: 5,
        maxLength: 32
    },
    "price": {
        fieldName: "precio",
        minValue: 1
    }
  },

    validateProduct(product) {
    const { title, description, category, price } = product;

    this.validateStringField(title, "title");
    this.validateStringField(description, "description");
    this.validateStringField(category, "category");
    this.validateNumberField(price, "price");
    },

    validateStringField(content, field) {
        console.log(content);
        
        const { fieldName, minLength, maxLength } = this.fieldsCfg[field];

        if (!content) throw new Error(`El campo "${fieldName}" es obligatorio.`);
        
        if (content.trim() === '') throw new Error(`El campo "${fieldName}" es obligatorio.`);

        const length = content.trim().length;

        if (length < minLength || length > maxLength) {
            throw new Error(`El campo "${fieldName}" debe tener entre ${minLength} y ${maxLength} caracteres.`);
        }
    },

    validateNumberField(content, field) {
        const { fieldName, minValue } = this.fieldsCfg[field];

        if (content === undefined || content === null || isNaN(Number(content))) {
            throw new Error(`El campo "${fieldName}" es obligatorio.`);
        }

        if (Number(content) < minValue) {
            throw new Error(`El campo "${fieldName}" debe tener un valor mayor a ${minValue}.`);
            }
    }
};

export default productValidator;
