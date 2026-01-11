"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopValidation = void 0;
const express_validator_1 = require("express-validator");
const ShopValidation = () => {
    return ([
        (0, express_validator_1.check)('NAME').exists().withMessage("Name is required").isLength({ min: 4 }).withMessage('must be at least 5 chars long').isString().withMessage('must be string value'),
        (0, express_validator_1.check)('VALUE').exists().withMessage("Value is required").isNumeric().withMessage('must be number value'),
        (0, express_validator_1.check)('PRICE').exists().withMessage("Price is required").isNumeric().withMessage('must be number value'),
        (0, express_validator_1.check)('TYPE').exists().withMessage("Type is required").isString().withMessage('must be string value'),
    ]);
};
exports.ShopValidation = ShopValidation;
//# sourceMappingURL=shop.validation.js.map