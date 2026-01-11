"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VipCardValidation = void 0;
const express_validator_1 = require("express-validator");
const VipCardValidation = () => {
    return ([
        (0, express_validator_1.check)('TITLE').exists().withMessage("Title is required").isLength({ min: 5 }).withMessage('must be at least 5 chars long').isString().withMessage('must be string value'),
        (0, express_validator_1.check)('VALUE').exists().withMessage("Value is required").isNumeric().withMessage('must be string value'),
        (0, express_validator_1.check)('DAYS').exists().withMessage("Days is required").isString().withMessage('must be string value'),
        (0, express_validator_1.check)('BENEFITS').exists().withMessage("Benefits is required").isJSON().withMessage('must be json value'),
    ]);
};
exports.VipCardValidation = VipCardValidation;
//# sourceMappingURL=vip_card.validation.js.map